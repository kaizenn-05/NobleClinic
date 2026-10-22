@php
    $consultation = $visit->consultation;

    $hasOldInput = $errors->consultation->any()
        && (int) session('open_visit') === (int) $visit->id;

    $fieldValue = function ($field) use ($consultation, $hasOldInput) {
        if ($hasOldInput) {
            return old($field);
        }

        if ($field === 'follow_up_date') {
            return $consultation?->follow_up_date?->format('Y-m-d');
        }

        return $consultation?->{$field};
    };

    $vitals = [
        'blood_pressure_systolic' => ['Systolic BP (mmHg)', '1'],
        'blood_pressure_diastolic' => ['Diastolic BP (mmHg)', '1'],
        'temperature_c' => ['Temperature (°C)', '0.1'],
        'heart_rate' => ['Heart Rate (bpm)', '1'],
        'respiratory_rate' => ['Respiratory Rate (/min)', '1'],
        'oxygen_saturation' => ['Oxygen Saturation (%)', '0.01'],
        'weight_kg' => ['Weight (kg)', '0.01'],
        'height_cm' => ['Height (cm)', '0.01'],
    ];
@endphp

<div class="border rounded p-3 mb-4">
    <div class="fw-semibold">
        {{ $visit->patient->last_name }},
        {{ $visit->patient->first_name }}
        {{ $visit->patient->middle_name }}
        {{ $visit->patient->suffix }}
    </div>

    <small class="text-secondary">
        {{ $visit->patient->patient_number }}
        · {{ $visit->patient->birth_date->age }} years
        · {{ ucfirst($visit->patient->sex) }}
    </small>

    <p class="mb-0 mt-2">
        <strong>Chief Complaint:</strong>
        {{ $visit->chief_complaint ?: 'Not recorded' }}
    </p>
</div>

@if($hasOldInput)
    <div class="alert alert-danger" role="alert">
        <ul class="mb-0">
            @foreach($errors->consultation->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form id="consultation-form-{{ $visit->id }}"
      method="POST"
      action="{{ route('doctor.visits.consultation.save', $visit) }}"
      data-consultation-form>
    @csrf
    @method('PATCH')

    <h3 class="h6 mb-3">Vital Signs</h3>

    <div class="row g-3">
        @foreach($vitals as $field => [$label, $step])
            <div class="col-12 col-sm-6 col-lg-3">
                <label for="{{ $field }}-{{ $visit->id }}"
                       class="form-label">
                    {{ $label }}
                </label>

                <input type="number"
                       id="{{ $field }}-{{ $visit->id }}"
                       name="{{ $field }}"
                       class="form-control"
                       min="0"
                       step="{{ $step }}"
                       value="{{ $fieldValue($field) }}">
            </div>
        @endforeach
    </div>

    <hr class="my-4">

    @foreach([
        'history_notes' => 'History Notes',
        'examination_notes' => 'Examination Notes',
        'diagnosis_notes' => 'Diagnosis',
        'treatment_plan' => 'Treatment Plan',
    ] as $field => $label)
        <div class="mb-3">
            <label for="{{ $field }}-{{ $visit->id }}"
                   class="form-label">
                {{ $label }}
                @if($field === 'diagnosis_notes')
                    <small class="text-secondary">(required to complete)</small>
                @endif
            </label>

            <textarea id="{{ $field }}-{{ $visit->id }}"
                      name="{{ $field }}"
                      class="form-control"
                      rows="3"
                      maxlength="10000">{{ $fieldValue($field) }}</textarea>
        </div>
    @endforeach

    <div class="mb-3">
        <label for="follow-up-{{ $visit->id }}" class="form-label">
            Recommended Follow-up Date
        </label>

        <input type="date"
               id="follow-up-{{ $visit->id }}"
               name="follow_up_date"
               class="form-control"
               value="{{ $fieldValue('follow_up_date') }}"
               min="{{ now()->toDateString() }}">
    </div>

    <p class="small text-secondary mb-0">
        Complete Consultation finalizes this visit.
        Review the patient and diagnosis before confirming.
    </p>
</form>
