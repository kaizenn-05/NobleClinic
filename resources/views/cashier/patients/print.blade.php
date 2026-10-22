<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Patient Record — {{ $patient->patient_number }}</title>

 @php
    $recordCss = $printCss
        ?? file_get_contents(
            public_path('assets/noble/css/patient-print.css')
        );
@endphp
    @php
    $recordCss = $printCss
        ?? file_get_contents(
            public_path('assets/noble/css/patient-print.css')
        );
@endphp

<style>
    {!! $recordCss !!}

    /* Final page settings, after the shared stylesheet */
    @page {
        size: A4 portrait;
        margin-top: 12mm;
        margin-right: 15mm;
        margin-bottom: 12mm;
        margin-left: 15mm;
    }

    @media print {
        html,
        body {
            margin: 0;
            padding: 0;
            background: white;
        }

        .record-sheet {
            width: auto;
            max-width: none;
            margin: 0;
            padding: 0;
        }

        .print-toolbar {
            display: none;
        }
    }

    @if($pdfMode ?? false)
        body {
            font-family: "DejaVu Sans", sans-serif;
        }

        .record-sheet {
            width: auto;
            max-width: none;
            margin: 0;
            padding: 0;
        }

        .print-toolbar {
            display: none;
        }
    @endif
</style>

</head>
<body>
    @if(!($pdfMode ?? false))
    <div class="print-toolbar">
        <button type="button" onclick="window.print()">
            Print
        </button>

            <a href="{{ route('cashier.patients.pdf', [
                    'patient' => $patient,
                    'visit' => $patient->visits->first()->id,
                ]) }}"
            class="pdf-download-button">
                Save as PDF
            </a>
        </div>
    @endif

    @forelse($patient->visits as $visit)
        @php
            $consultation = $visit->consultation;

            $ageAtVisit = $visit->checked_in_at
                ? (int) floor(
                    $patient->birth_date->diffInYears($visit->checked_in_at)
                )
                : null;

            $vitals = [
                ['Systolic BP (mmHg)', $consultation?->blood_pressure_systolic],
                ['Diastolic BP (mmHg)', $consultation?->blood_pressure_diastolic],
                ['Temperature (°C)', $consultation?->temperature_c],
                ['Heart Rate (bpm)', $consultation?->heart_rate],
                ['Respiratory Rate (/min)', $consultation?->respiratory_rate],
                ['Oxygen Saturation (%)', $consultation?->oxygen_saturation],
                ['Weight (kg)', $consultation?->weight_kg],
                ['Height (cm)', $consultation?->height_cm],
            ];
        @endphp

        <article class="record-sheet">
            <header class="clinic-print-header">
                <img src="{{ $logoSrc ?? asset('assets/noble/images/clinic-logo.png') }}"
                alt="Clinic logo"
                class="clinic-print-logo">

                <h1>Dr. HEALTH &amp; WELLNES CLINIC</h1>
                <p>Poblacion, Alicia, Zamboanga Sibugay</p>

                <h2>PATIENT HISTORY &amp; CONSULTATION RECORD</h2>
            </header>

            <section class="record-section">
                <h3 class="section-heading">01 PATIENT INFORMATION</h3>

                <table class="record-table">
                    <tbody>
                        <tr>
                            <td colspan="3">
                                <span class="field-label">Last Name</span>
                                <div>{{ $patient->last_name }}</div>
                            </td>
                            <td colspan="3">
                                <span class="field-label">First Name</span>
                                <div>{{ $patient->first_name }}</div>
                            </td>
                            <td colspan="3">
                                <span class="field-label">Middle Name</span>
                                <div>{{ $patient->middle_name ?: '—' }}</div>
                            </td>
                            <td colspan="3">
                                <span class="field-label">Suffix</span>
                                <div>{{ $patient->suffix ?: '—' }}</div>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="4">
                                <span class="field-label">Patient Unique Number</span>
                                <div>{{ $patient->patient_number }}</div>
                            </td>
                            <td colspan="4">
                                <span class="field-label">Date of Birth</span>
                                <div>{{ $patient->birth_date->format('m/d/Y') }}</div>
                            </td>
                            <td colspan="2">
                                <span class="field-label">Age at Visit</span>
                                <div>{{ $ageAtVisit ?? '—' }}</div>
                            </td>
                            <td colspan="2">
                                <span class="field-label">Sex</span>
                                <div>{{ ucfirst($patient->sex) }}</div>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="8">
                                <span class="field-label">Address</span>
                                <div>{{ $patient->address ?: 'Not recorded' }}</div>
                            </td>
                            <td colspan="4">
                                <span class="field-label">Contact Number</span>
                                <div>{{ $patient->phone ?: 'Not recorded' }}</div>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="4">
                                <span class="field-label">Visit Date</span>
                                <div>
                                    {{ $visit->checked_in_at?->copy()->timezone('Asia/Manila')->format('m/d/Y') ?? 'Not recorded' }}
                                </div>
                            </td>
                            <td colspan="4">
                                <span class="field-label">Time</span>
                                <div>
                                    {{ $visit->checked_in_at?->copy()->timezone('Asia/Manila')->format('h:i A') ?? 'Not recorded' }}
                                </div>
                            </td>
                            <td colspan="4">
                                <span class="field-label">Visit Reference</span>
                                <div>#{{ $visit->id }}</div>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="12">
                                <span class="field-label">
                                    Chief Complaint / Reason for Visit
                                </span>
                                <div class="preserve-lines">{{ $visit->chief_complaint ?: 'Not recorded' }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section class="record-section">
                <h3 class="section-heading">02 VITAL SIGNS</h3>

                <table class="record-table">
                    <tbody>
                        @foreach(array_chunk($vitals, 4) as $row)
                            <tr>
                                @foreach($row as [$label, $value])
                                    <td>
                                        <span class="field-label">{{ $label }}</span>
                                        <div>{{ $value ?? 'Not recorded' }}</div>
                                    </td>
                                @endforeach
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </section>

            <section class="record-section">
                <h3 class="section-heading">
                    03 CLINICAL ASSESSMENT &amp; MANAGEMENT
                </h3>

                @foreach([
                    'History Notes' => $consultation?->history_notes,
                    'Examination Notes' => $consultation?->examination_notes,
                    'Diagnosis' => $consultation?->diagnosis_notes,
                    'Treatment Plan' => $consultation?->treatment_plan,
                ] as $label => $notes)
                    <div class="clinical-note">
                        <h4>{{ $label }}</h4>
                        <div class="preserve-lines">{{ $notes ?: 'Not recorded' }}</div>
                    </div>
                @endforeach
            </section>

            <table class="record-table signature-table">
                <tbody>
                    <tr>
                        <td>
                            <span class="field-label">Recommended Follow-up Date</span>
                            <div>
                                {{ $consultation?->follow_up_date?->format('M d, Y') ?? 'Not recorded' }}
                            </div>
                        </td>
                        <td>
                            <span class="field-label">Attending Physician / Signature</span>
                            <div>{{ $visit->doctor?->name ?? 'Not recorded' }}</div>
                            <div class="signature-space"></div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <footer class="record-print-footer">
                CONFIDENTIAL PATIENT RECORD
            </footer>
        </article>
    @empty
        <article class="record-sheet">
            <h1>Patient Consultation Record</h1>
            <p>Patient Number: {{ $patient->patient_number }}</p>
            <p>No completed visits recorded for this patient.</p>
        </article>
    @endforelse
</body>
</html>
