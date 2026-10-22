<div class="mb-4">
    <h2 class="h5">
        {{ $patient->last_name }},
        {{ $patient->first_name }}
        {{ $patient->middle_name }}
        {{ $patient->suffix }}
    </h2>

    <p class="text-secondary mb-0">
        Patient Number: {{ $patient->patient_number }}
    </p>
</div>

<div class="table-responsive">
    <table class="table clinic-table align-middle mb-0">
        <thead>
            <tr>
                <th scope="col">Visit Date</th>
                <th scope="col">Doctor</th>
                <th scope="col" class="text-center">Action</th>
            </tr>
        </thead>

        <tbody>
            @forelse($patient->visits as $visit)
                <tr>
                    <td>
                        <div>{{ $visit->checked_in_at?->copy()->timezone('Asia/Manila')->format('M d, Y') }}</div>
                        <small class="text-secondary">
                            {{ $visit->checked_in_at?->copy()->timezone('Asia/Manila')->format('h:i A') }}
                            · Visit #{{ $visit->id }}
                        </small>
                    </td>

                    <td>{{ $visit->doctor?->name ?? 'Not recorded' }}</td>

                    <td class="text-center">
                        <button type="button"
                                class="btn btn-sm btn-outline-primary"
                                data-record-navigation
                                data-record-url="{{ route('cashier.patients.show', [
                                    'patient' => $patient,
                                    'visit' => $visit->id,
                                ]) }}"
                                data-print-url="{{ route('cashier.patients.print', [
                                    'patient' => $patient,
                                    'visit' => $visit->id,
                                ]) }}">
                            View
                        </button>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="3" class="text-center py-4">
                        No completed visits recorded.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>
