<?php

namespace App\Http\Controllers\Cashier;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Services\PatientRegistrationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
        ]);

        $search = trim((string) $request->input('search', ''));

        $patients = Patient::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('patient_number', 'like', "%{$search}%")
                        ->orWhere('first_name', 'like', "%{$search}%")
                        ->orWhere('middle_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhereRaw(
                            "CONCAT(first_name, ' ', last_name) LIKE ?",
                            ["%{$search}%"]
                        );
                });
            })
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

            $doctors = User::where('is_active', true)
                    ->whereHas('role', function ($query) {
                        $query->where('name', 'doctor');
                    })
                    ->orderBy('name')
                    ->get(['id', 'name']);

        return view('cashier.patients.index', compact('patients', 'doctors'));
    }

    public function store(
        Request $request,
        PatientRegistrationService $registration
    ) {
        $validator = Validator::make($request->all(), [
            'first_name' => ['required', 'string', 'max:100'],
            'middle_name' => ['nullable', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'suffix' => ['nullable', 'string', 'max:10'],
            'birth_date' => ['required', 'date', 'before_or_equal:today'],
            'sex' => ['required', Rule::in(['male', 'female'])],
            'phone' => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'string', 'max:2000'],
            'emergency_contact_name' => ['nullable', 'string', 'max:150'],
            'emergency_contact_phone' => ['nullable', 'string', 'max:30'],
        ]);

        if ($validator->fails()) {
            return to_route('cashier.patients.index')
                ->withErrors($validator)
                ->withInput($request->only([
                    'first_name',
                    'middle_name',
                    'last_name',
                    'suffix',
                    'birth_date',
                    'sex',
                    'phone',
                    'address',
                    'emergency_contact_name',
                    'emergency_contact_phone',
                ]))
                ->with('modal', 'add-patient-modal');
        }

        $patient = $registration->register(
            $validator->validated(),
            $request->user()->id
        );

        return to_route('cashier.patients.index')
            ->with(
                'success',
                "Patient registered successfully. Number: {$patient->patient_number}"
            );
    }

    public function checkIn(Request $request, Patient $patient)
        {
            $validator = Validator::make($request->all(), [
                'doctor_id' => ['required', 'integer'],
                'chief_complaint' => [
                    'required',
                    'string',
                    'max:2000',
                ],
            ]);

            $returnWithErrors = function ($errors) use ($request, $patient) {
                return to_route('cashier.patients.index')
                    ->withErrors($errors, 'checkIn')
                    ->withInput($request->only('doctor_id', 'chief_complaint'))
                    ->with('modal', 'check-in-modal')
                    ->with('check_in_url', route('cashier.patients.check-in', $patient))
                    ->with(
                        'check_in_patient',
                        "{$patient->patient_number} — {$patient->first_name} {$patient->last_name}"
                    );
            };

            if ($validator->fails()) {
                return $returnWithErrors($validator);
            }

            $data = $validator->validated();

            $result = DB::transaction(function () use ($request, $patient, $data) {
                // Serialize check-ins for the same patient.
                $lockedPatient = Patient::whereKey($patient->id)
                    ->lockForUpdate()
                    ->firstOrFail();

                $hasActiveVisit = Visit::where('patient_id', $lockedPatient->id)
                    ->whereIn('status', ['waiting', 'in_consultation'])
                    ->exists();

                if ($hasActiveVisit) {
                    return 'active_visit';
                }

                // Validate the doctor again on the server.
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

                $visit = new Visit();
                $visit->patient_id = $lockedPatient->id;
                $visit->doctor_id = $doctor->id;
                $visit->checked_in_by = $request->user()->id;
                $visit->checked_in_at = now();
                $visit->chief_complaint = $data['chief_complaint'];
                $visit->status = 'waiting';
                $visit->save();

                return 'created';
            }, 5);

            if ($result === 'active_visit') {
                return $returnWithErrors([
                    'visit' => 'This patient already has an active visit. Check the queue first.',
                ]);
            }

            if ($result === 'invalid_doctor') {
                return $returnWithErrors([
                    'doctor_id' => 'Please select an active doctor.',
                ]);
            }

            return to_route('cashier.patients.index')
                ->with('success', "Patient {$patient->patient_number} checked in successfully.");
        }

        // patient patient record view
        private function loadPatientRecords(Patient $patient): Patient
            {
                $patient->load([
                    'visits' => function ($query) {
                        $query->where('status', 'completed')
                            ->whereNotNull('completed_at')
                            ->with(['doctor', 'consultation'])
                            ->orderByDesc('checked_in_at');
                    },
                ]);

                return $patient;
            }

          private function selectPatientVisit(
                Request $request,
                Patient $patient
            ): Patient {
                $data = $request->validate([
                    'visit' => ['required', 'integer', 'min:1'],
                ]);

                // Search through this patient's visits only.
                $visit = $patient->visits()
                    ->whereKey($data['visit'])
                    ->where('status', 'completed')
                    ->whereNotNull('completed_at')
                    ->with(['doctor', 'consultation'])
                    ->firstOrFail();

                // Existing record/print views will loop over this ONE visit only.
                $patient->setRelation('visits', collect([$visit]));

                return $patient;
            }

            public function show(Request $request, Patient $patient)
            {
                if ($request->filled('visit')) {
                    return response()
                        ->view('cashier.patients.partials.visit-detail', [
                            'patient' => $this->selectPatientVisit($request, $patient),
                        ])
                        ->header('Cache-Control', 'private, no-store');
                }

                return response()
                    ->view('cashier.patients.partials.visit-list', [
                        'patient' => $this->loadPatientRecords($patient),
                    ])
                    ->header('Cache-Control', 'private, no-store');
            }

            public function printRecord(Request $request, Patient $patient)
            {
                return response()
                    ->view('cashier.patients.print', [
                        'patient' => $this->selectPatientVisit($request, $patient),
                    ])
                    ->header('Cache-Control', 'private, no-store');
            }
    public function downloadPdf(Request $request, Patient $patient)
    {
        $patient = $this->selectPatientVisit($request, $patient);
        $selectedVisit = $patient->visits->first();
        $logoPath = public_path('assets/noble/images/clinic-logo.png');
        $cssPath = public_path('assets/noble/css/patient-print.css');

        abort_unless(is_file($logoPath), 500, 'Clinic logo file is missing.');
        abort_unless(is_file($cssPath), 500, 'Print stylesheet is missing.');

        $logoSrc = 'data:image/png;base64,' .
            base64_encode(file_get_contents($logoPath));

        $pdf = Pdf::loadView('cashier.patients.print', [
            'patient' => $patient,
            'pdfMode' => true,
            'logoSrc' => $logoSrc,
            'printCss' => file_get_contents($cssPath),
        ])
            ->setPaper('a4', 'portrait')
            ->setOption([
                'defaultMediaType' => 'print',
                'isRemoteEnabled' => false,
                'isJavascriptEnabled' => false,
            ]);

       $response = $pdf->download(
            "patient-{$patient->id}-visit-{$selectedVisit->id}.pdf"
        );
        $response->headers->set('Cache-Control', 'private, no-store');

        return $response;
    }
}
