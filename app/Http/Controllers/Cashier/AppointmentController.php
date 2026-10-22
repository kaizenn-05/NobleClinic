<?php

namespace App\Http\Controllers\Cashier;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\Visit;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'date' => ['nullable', 'date_format:Y-m-d'],
            'status' => [
                'nullable',
                Rule::in(['scheduled', 'checked_in', 'cancelled', 'completed']),
            ],
        ]);

        $search = trim((string) $request->input('search', ''));

        $appointments = Appointment::with(['patient', 'doctor'])
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->whereHas('patient', function ($patientQuery) use ($search) {
                        $patientQuery
                            ->where('patient_number', 'like', "%{$search}%")
                            ->orWhere('first_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('doctor', function ($doctorQuery) use ($search) {
                        $doctorQuery->where('name', 'like', "%{$search}%");
                    });
                });
            })
            ->when($request->filled('date'), function ($query) use ($request) {
                $query->whereDate('scheduled_at', $request->input('date'));
            })
            ->when($request->filled('status'), function ($query) use ($request) {
                $query->where('status', $request->input('status'));
            })
            ->orderByDesc('scheduled_at')
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        $doctors = User::where('is_active', true)
            ->whereHas('role', function ($query) {
                $query->where('name', 'doctor');
            })
            ->orderBy('name')
            ->get(['id', 'name']);

        return view(
            'cashier.appointments.index',
            compact('appointments', 'doctors')
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_number' => [
                'required',
                'string',
                'regex:/^\d{2}-\d{2}-\d{2}-\d{2}$/',
                Rule::exists('patients', 'patient_number'),
            ],
            'doctor_id' => ['required', 'integer'],
            'scheduled_at' => [
                'required',
                'date_format:Y-m-d\TH:i',
                'after:now',
            ],
            'reason' => ['nullable', 'string', 'max:2000'],
        ]);

        $returnWithErrors = function ($errors) use ($request) {
            return to_route('cashier.appointments.index')
                ->withErrors($errors, 'appointment')
                ->withInput($request->only([
                    'patient_number',
                    'doctor_id',
                    'scheduled_at',
                    'reason',
                ]))
                ->with('modal', 'add-appointment-modal');
        };

        if ($validator->fails()) {
            return $returnWithErrors($validator);
        }

        $data = $validator->validated();

        $result = DB::transaction(function () use ($request, $data) {
            $patient = Patient::where('patient_number', $data['patient_number'])
                ->lockForUpdate()
                ->first();

            if (!$patient) {
                return 'invalid_patient';
            }

            $doctor = User::whereKey($data['doctor_id'])
                ->where('is_active', true)
                ->whereHas('role', function ($query) {
                    $query->where('name', 'doctor');
                })
                ->lockForUpdate()
                ->first();

            if (!$doctor) {
                return 'invalid_doctor';
            }

            $scheduledAt = Carbon::createFromFormat(
                'Y-m-d\TH:i',
                $data['scheduled_at'],
                config('app.timezone')
            )->startOfMinute();

            $conflict = Appointment::where('scheduled_at', $scheduledAt)
                ->whereIn('status', ['scheduled', 'checked_in'])
                ->where(function ($query) use ($patient, $doctor) {
                    $query->where('doctor_id', $doctor->id)
                        ->orWhere('patient_id', $patient->id);
                })
                ->exists();

            if ($conflict) {
                return 'conflict';
            }

            $appointment = new Appointment();
            $appointment->patient_id = $patient->id;
            $appointment->doctor_id = $doctor->id;
            $appointment->scheduled_at = $scheduledAt;
            $appointment->reason = $data['reason'] ?? null;
            $appointment->status = 'scheduled';
            $appointment->created_by = $request->user()->id;
            $appointment->save();

            return 'created';
        }, 5);

        if ($result === 'invalid_patient') {
            return $returnWithErrors([
                'patient_number' => 'Patient record no longer exists.',
            ]);
        }

        if ($result === 'invalid_doctor') {
            return $returnWithErrors([
                'doctor_id' => 'Please select an active doctor.',
            ]);
        }

        if ($result === 'conflict') {
            return $returnWithErrors([
                'scheduled_at' =>
                    'The doctor or patient already has an appointment at this exact time.',
            ]);
        }

        return to_route('cashier.appointments.index')
            ->with('success', 'Appointment created successfully.');
    }
    public function cancel(Appointment $appointment)
        {
            $result = DB::transaction(function () use ($appointment) {
                Patient::whereKey($appointment->patient_id)
                    ->lockForUpdate()
                    ->firstOrFail();

                $booking = Appointment::whereKey($appointment->id)
                    ->lockForUpdate()
                    ->firstOrFail();

                if (
                    $booking->status !== 'scheduled' ||
                    $booking->visit()->exists()
                ) {
                    return false;
                }

                $booking->status = 'cancelled';
                $booking->save();

                return true;
            }, 5);

            return to_route('cashier.appointments.index')->with(
                $result ? 'success' : 'error',
                $result
                    ? 'Appointment cancelled successfully.'
                    : 'Only scheduled appointments without a visit can be cancelled.'
            );
        }
        public function checkIn(Request $request, Appointment $appointment)
        {
            $result = DB::transaction(function () use ($request, $appointment) {
                // Same patient-lock order as walk-in check-in.
                $patient = Patient::whereKey($appointment->patient_id)
                    ->lockForUpdate()
                    ->firstOrFail();

                $booking = Appointment::whereKey($appointment->id)
                    ->lockForUpdate()
                    ->firstOrFail();

                if (
                    $booking->status !== 'scheduled' ||
                    $booking->visit()->exists()
                ) {
                    return 'invalid_status';
                }

                $hasActiveVisit = Visit::where('patient_id', $patient->id)
                    ->whereIn('status', ['waiting', 'in_consultation'])
                    ->exists();

                if ($hasActiveVisit) {
                    return 'active_visit';
                }

                $doctor = User::whereKey($booking->doctor_id)
                    ->where('is_active', true)
                    ->whereHas('role', function ($query) {
                        $query->where('name', 'doctor');
                    })
                    ->lockForUpdate()
                    ->first();

                if (!$doctor) {
                    return 'invalid_doctor';
                }

                $visit = new Visit();
                $visit->patient_id = $patient->id;
                $visit->appointment_id = $booking->id;
                $visit->doctor_id = $doctor->id;
                $visit->checked_in_by = $request->user()->id;
                $visit->checked_in_at = now();
                $visit->chief_complaint = $booking->reason;
                $visit->status = 'waiting';
                $visit->save();

                $booking->status = 'checked_in';
                $booking->save();

                return 'created';
            }, 5);

            $errors = [
                'invalid_status' => 'This appointment is no longer available for check-in.',
                'active_visit' => 'This patient already has an active visit. Check the Patient Queue.',
                'invalid_doctor' => 'The assigned doctor is no longer active. Update the appointment first.',
            ];

            if ($result !== 'created') {
                return to_route('cashier.appointments.index')
                    ->with('error', $errors[$result]);
            }

            return to_route('cashier.appointments.index')
                ->with('success', 'Appointment checked in. Patient added to the queue.');
        }
        public function update(Request $request, Appointment $appointment)
        {
            $validator = Validator::make($request->all(), [
                'doctor_id' => ['required', 'integer'],
                'scheduled_at' => [
                    'required',
                    'date_format:Y-m-d\TH:i',
                    'after:now',
                ],
                'reason' => ['nullable', 'string', 'max:2000'],
            ]);

            $returnWithErrors = function ($errors) use ($request, $appointment) {
                return to_route('cashier.appointments.index')
                    ->withErrors($errors, 'editAppointment')
                    ->withInput($request->only([
                        'doctor_id',
                        'scheduled_at',
                        'reason',
                    ]))
                    ->with('modal', 'edit-appointment-modal')
                    ->with(
                        'edit_appointment_url',
                        route('cashier.appointments.update', $appointment)
                    )
                    ->with(
                        'edit_appointment_patient',
                        $appointment->patient->patient_number . ' — ' .
                        $appointment->patient->first_name . ' ' .
                        $appointment->patient->last_name
                    );
            };

            if ($validator->fails()) {
                return $returnWithErrors($validator);
            }

            $data = $validator->validated();

            $result = DB::transaction(function () use ($appointment, $data) {
                Patient::whereKey($appointment->patient_id)
                    ->lockForUpdate()
                    ->firstOrFail();

                $booking = Appointment::whereKey($appointment->id)
                    ->lockForUpdate()
                    ->firstOrFail();

                if (
                    $booking->status !== 'scheduled' ||
                    $booking->visit()->exists()
                ) {
                    return 'invalid_status';
                }

                $doctor = User::whereKey($data['doctor_id'])
                    ->where('is_active', true)
                    ->whereHas('role', function ($query) {
                        $query->where('name', 'doctor');
                    })
                    ->lockForUpdate()
                    ->first();

                if (!$doctor) {
                    return 'invalid_doctor';
                }

                $scheduledAt = Carbon::createFromFormat(
                    'Y-m-d\TH:i',
                    $data['scheduled_at'],
                    config('app.timezone')
                )->startOfMinute();

                $conflict = Appointment::where('id', '!=', $booking->id)
                    ->where('scheduled_at', $scheduledAt)
                    ->whereIn('status', ['scheduled', 'checked_in'])
                    ->where(function ($query) use ($booking, $doctor) {
                        $query->where('doctor_id', $doctor->id)
                            ->orWhere('patient_id', $booking->patient_id);
                    })
                    ->exists();

                if ($conflict) {
                    return 'conflict';
                }

                $booking->doctor_id = $doctor->id;
                $booking->scheduled_at = $scheduledAt;
                $booking->reason = $data['reason'] ?? null;
                $booking->save();

                return 'updated';
            }, 5);

            if ($result === 'invalid_status') {
                return to_route('cashier.appointments.index')
                    ->with('error', 'This appointment can no longer be edited.');
            }

            if ($result === 'invalid_doctor') {
                return $returnWithErrors([
                    'doctor_id' => 'Please select an active doctor.',
                ]);
            }

            if ($result === 'conflict') {
                return $returnWithErrors([
                    'scheduled_at' =>
                        'The doctor or patient already has an appointment at this exact time.',
                ]);
            }

            return to_route('cashier.appointments.index')
                ->with('success', 'Appointment updated successfully.');
        }
}
