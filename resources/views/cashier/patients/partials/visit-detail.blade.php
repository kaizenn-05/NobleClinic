<button type="button"
        class="btn btn-sm btn-outline-secondary mb-4"
        data-record-navigation
        data-record-url="{{ route('cashier.patients.show', $patient) }}">
    ← Back to Visits
</button>

@include('cashier.patients.partials.record')
