@extends('layouts.staff')

@section('title', 'My Patient Queue')

@section('sidebar')
    @include('partials.sidebars.doctor')
@endsection

@section('content')
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
            <h1 class="page-heading mb-1">My Patient Queue</h1>
            <p class="text-secondary mb-0">
                Patients assigned to your account.
            </p>
        </div>

        <button type="button"
                class="btn btn-outline-primary"
                onclick="window.location.reload()">
            Refresh Queue
        </button>
    </div>

    @if(session('error'))
        <div class="alert alert-danger timed-alert"
             role="alert"
             data-auto-dismiss>
            {{ session('error') }}
            <span class="alert-countdown" aria-hidden="true"></span>
        </div>
    @endif

    <section class="clinic-card">
        <h2 class="h5 mb-4">Active Visits</h2>

        <div class="table-responsive">
            <table class="table clinic-table align-middle mb-0">
                <thead>
                    <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Checked In</th>
                        <th scope="col" class="text-center">Status</th>
                        <th scope="col" class="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    @forelse($visits as $visit)
                        <tr>
                            <td>
                                <div class="fw-semibold">
                                    {{ $visit->patient->last_name }},
                                    {{ $visit->patient->first_name }}
                                </div>

                                <small class="text-secondary">
                                    {{ $visit->patient->patient_number }}
                                </small>
                            </td>

                            <td>
                                {{ $visit->checked_in_at->copy()->timezone('Asia/Manila')->format('M d, Y h:i A') }}
                            </td>

                            <td class="text-center">
                                <span class="badge {{ $visit->status === 'waiting' ? 'text-bg-warning' : 'text-bg-info' }}">
                                    {{ $visit->status === 'waiting' ? 'Waiting' : 'In Consultation' }}
                                </span>
                            </td>

                            <td class="text-center">
                                @if($visit->status === 'waiting')
                                    <form method="POST"
                                          action="{{ route('doctor.visits.start', $visit) }}">
                                        @csrf

                                        <button type="submit"
                                                class="btn btn-sm btn-clinic">
                                            Start Consultation
                                        </button>
                                    </form>
                                @else
                                    <button type="button"
                                            class="btn btn-sm btn-outline-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#consultation-modal-{{ $visit->id }}">
                                        Continue
                                    </button>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="text-center py-5 text-secondary">
                                No active patients assigned to you.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="mt-4">
            {{ $visits->links() }}
        </div>
    </section>
@endsection

@push('modals')
    @foreach($visits as $visit)
        @if($visit->status === 'in_consultation')
            <x-modal
                :id="'consultation-modal-'.$visit->id"
                title="Patient Consultation"
                size="modal-xl">

                @include('doctor.consultations.form', ['visit' => $visit])

                <x-slot:footer>
                    <button type="button"
                            class="btn btn-light"
                            data-bs-dismiss="modal">
                        Close
                    </button>

                    <button type="submit"
                            form="consultation-form-{{ $visit->id }}"
                            name="action"
                            value="draft"
                            class="btn btn-outline-primary">
                        Save Draft
                    </button>

                    <button type="submit"
                            form="consultation-form-{{ $visit->id }}"
                            name="action"
                            value="complete"
                            class="btn btn-clinic">
                        Complete Consultation
                    </button>
                </x-slot:footer>
            </x-modal>
        @endif
    @endforeach

    @if(session('success'))
        <x-modal id="doctor-success-modal" title="Success" size="modal-sm">
            <p role="status" class="mb-0">{{ session('success') }}</p>
        </x-modal>
    @endif
@endpush

@push('scripts')
    <script>
        @if(session('open_visit'))
            const consultationElement = document.getElementById(
                'consultation-modal-' + @json(session('open_visit'))
            );

            if (consultationElement) {
                bootstrap.Modal.getOrCreateInstance(consultationElement).show();
            }
        @endif

        document.querySelectorAll('[data-consultation-form]')
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.dataset.submitting === 'true') {
                        event.preventDefault();
                        return;
                    }

                    if (
                        event.submitter?.value === 'complete' &&
                        !window.confirm('Complete this consultation? Review your entries before continuing.')
                    ) {
                        event.preventDefault();
                        return;
                    }

                    form.dataset.submitting = 'true';

                    // Keep submit buttons enabled so action=draft/complete is sent.
                    const button = event.submitter;

                    if (button) {
                        button.textContent = 'Saving…';
                    }
                });
            });

        @if(session('success'))
            const successElement = document.getElementById('doctor-success-modal');
            const successModal = bootstrap.Modal.getOrCreateInstance(successElement);

            let successTimer;

            successElement.addEventListener('shown.bs.modal', function () {
                successTimer = setTimeout(() => successModal.hide(), 2500);
            });

            successElement.addEventListener('hidden.bs.modal', function () {
                clearTimeout(successTimer);
            });

            successModal.show();
        @endif
    </script>
@endpush
