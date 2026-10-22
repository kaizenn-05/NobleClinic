<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Consultations;
use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ConsultationController extends Controller
{
    public function index(Request $request)
    {
        $visits = Visit::with(['patient', 'consultation'])
            ->where('doctor_id', $request->user()->id)
            ->whereIn('status', ['waiting', 'in_consultation'])
            ->orderBy('checked_in_at')
            ->orderBy('id')
            ->paginate(10);

        return response()
            ->view('doctor.queue.index', compact('visits'))
            ->header('Cache-Control', 'private, no-store');
    }

    public function start(Request $request, Visit $visit)
    {
        $result = DB::transaction(function () use ($request, $visit) {
            $record = Visit::whereKey($visit->id)
                ->lockForUpdate()
                ->firstOrFail();

            abort_unless(
                (int) $record->doctor_id === (int) $request->user()->id,
                403
            );

            if (!in_array(
                $record->status,
                ['waiting', 'in_consultation'],
                true
            )) {
                return false;
            }

            $record->status = 'in_consultation';
            $record->save();

            return true;
        }, 5);

        if (!$result) {
            return back()->with(
                'error',
                'This visit is no longer available for consultation.'
            );
        }

        return back()->with('open_visit', $visit->id);
    }

    public function save(Request $request, Visit $visit)
    {
        abort_unless(
            (int) $visit->doctor_id === (int) $request->user()->id,
            403
        );

        $validator = Validator::make($request->all(), [
            'action' => ['required', Rule::in(['draft', 'complete'])],

            'blood_pressure_systolic' => [
                'nullable', 'integer', 'between:0,65535',
            ],
            'blood_pressure_diastolic' => [
                'nullable', 'integer', 'between:0,65535',
            ],
            'temperature_c' => [
                'nullable', 'numeric', 'between:0,999.9',
            ],
            'heart_rate' => [
                'nullable', 'integer', 'between:0,65535',
            ],
            'respiratory_rate' => [
                'nullable', 'integer', 'between:0,65535',
            ],
            'oxygen_saturation' => [
                'nullable', 'numeric', 'between:0,100',
            ],
            'weight_kg' => [
                'nullable', 'numeric', 'between:0,9999.99',
            ],
            'height_cm' => [
                'nullable', 'numeric', 'between:0,999.99',
            ],

            'history_notes' => ['nullable', 'string', 'max:10000'],
            'examination_notes' => ['nullable', 'string', 'max:10000'],
            'diagnosis_notes' => [
                'required_if:action,complete',
                'nullable',
                'string',
                'max:10000',
            ],
            'treatment_plan' => ['nullable', 'string', 'max:10000'],
            'follow_up_date' => [
                'nullable', 'date_format:Y-m-d', 'after_or_equal:today',
            ],
        ]);

        if ($validator->fails()) {
            return back()
                ->withErrors($validator, 'consultation')
                ->withInput($request->except('_token', '_method'))
                ->with('open_visit', $visit->id);
        }

        $data = $validator->validated();

        $saved = DB::transaction(function () use ($request, $visit, $data) {
            $record = Visit::whereKey($visit->id)
                ->lockForUpdate()
                ->firstOrFail();

            // Recheck ownership inside the transaction.
            abort_unless(
                (int) $record->doctor_id === (int) $request->user()->id,
                403
            );

            if (
                $record->status !== 'in_consultation' ||
                $record->completed_at !== null
            ) {
                return false;
            }

            $consultation = Consultations::where('visit_id', $record->id)
                ->first();

            if (!$consultation) {
                $consultation = new Consultations();
                $consultation->visit_id = $record->id;
            }

            $consultation->fill(Arr::except($data, ['action']));
            $consultation->recorded_by = $request->user()->id;
            $consultation->save();

            if ($data['action'] === 'complete') {
                $record->status = 'completed';
                $record->completed_at = now();
                $record->save();

                if ($record->appointment_id) {
                    Appointment::whereKey($record->appointment_id)
                        ->where('status', 'checked_in')
                        ->update([
                            'status' => 'completed',
                            'updated_at' => now(),
                        ]);
                }
            }

            return true;
        }, 5);

        if (!$saved) {
            return back()->with(
                'error',
                'This consultation is no longer editable. Refresh the queue.'
            );
        }

        return back()->with(
            'success',
            $data['action'] === 'complete'
                ? 'Consultation completed successfully.'
                : 'Consultation draft saved successfully.'
        );
    }
}
