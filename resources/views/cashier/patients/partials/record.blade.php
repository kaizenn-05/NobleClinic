<div class="patient-record">
    <header class="record-heading">
        <h2>Noble Clinic</h2>
        <p>Patient Consultation History</p>
    </header>

    <section class="record-patient">
        <h3>
            {{ $patient->last_name }},
            {{ $patient->first_name }}
            {{ $patient->middle_name }}
            {{ $patient->suffix }}
        </h3>

        <p>
            <strong>Patient Number:</strong>
            {{ $patient->patient_number }}
        </p>

        <p>
            <strong>Birth Date:</strong>
            {{ $patient->birth_date->format('M d, Y') }}
        </p>

        <p>
            <strong>Sex:</strong>
            {{ ucfirst($patient->sex) }}
        </p>
    </section>

    @forelse($patient->visits as $visit)
        <section class="record-visit">
            <h3>
                Visit:
                {{ $visit->checked_in_at?->copy()->timezone('Asia/Manila')->format('M d, Y · h:i A') ?? 'Not recorded' }}
            </h3>

            <p>
                <strong>Attending Doctor:</strong>
                {{ $visit->doctor?->name ?? 'Not recorded' }}
            </p>

            @if($visit->consultation)
                <h4>Diagnosis</h4>
                <p class="record-notes">{{ $visit->consultation->diagnosis_notes ?: 'No diagnosis recorded.' }}</p>

                <h4>Treatment Plan</h4>
                <p class="record-notes">{{ $visit->consultation->treatment_plan ?: 'No treatment plan recorded.' }}</p>

                <p>
                    <strong>Recommended Follow-up:</strong>
                    {{ $visit->consultation->follow_up_date?->format('M d, Y') ?? 'Not recorded' }}
                </p>
            @else
                <p>No consultation details recorded for this visit.</p>
            @endif
        </section>
    @empty
        <p>No completed visits recorded for this patient.</p>
    @endforelse

    <p class="record-generated">
        Generated {{ now()->format('M d, Y h:i A') }}
        by {{ auth()->user()->name }}.
    </p>
</div>
