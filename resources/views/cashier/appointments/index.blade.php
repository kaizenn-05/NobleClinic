@extends('layouts.staff')

@section('title', 'Appointments')

@section('sidebar')
    @include('partials.sidebars.cashier')
@endsection

@section('content')

    @if(session('error'))
        <div class="alert alert-danger timed-alert"
            role="alert"
            data-auto-dismiss>
            {{ session('error') }}

            <span class="alert-countdown" aria-hidden="true"></span>
        </div>
    @endif
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
            <h1 class="page-heading mb-1">Appointments</h1>
            <p class="text-secondary mb-0">
                Schedule patient visits with a doctor.
            </p>
        </div>

        <button type="button"
                class="btn btn-clinic"
                data-bs-toggle="modal"
                data-bs-target="#add-appointment-modal">
            + Add Appointment
        </button>
    </div>

    <section class="clinic-card">
        <h2 class="h5 mb-4">Patient Appointments</h2>

        <form method="GET"
              action="{{ route('cashier.appointments.index') }}"
              class="row g-3 align-items-end mb-4">
            <div class="col-12 col-lg-4">
                <label for="appointment-search" class="form-label">Search</label>
                <input type="search"
                       id="appointment-search"
                       name="search"
                       class="form-control"
                       placeholder="Patient name, number, or doctor"
                       value="{{ request('search') }}"
                       maxlength="100">
            </div>

            <div class="col-12 col-sm-6 col-lg-3">
                <label for="appointment-date" class="form-label">Date</label>
                <input type="date"
                       id="appointment-date"
                       name="date"
                       class="form-control"
                       value="{{ request('date') }}">
            </div>

            <div class="col-12 col-sm-6 col-lg-3">
                <label for="appointment-status" class="form-label">Status</label>
                <select id="appointment-status"
                        name="status"
                        class="form-select">
                    <option value="">All statuses</option>

                    @foreach([
                        'scheduled' => 'Scheduled',
                        'checked_in' => 'Checked In',
                        'cancelled' => 'Cancelled',
                        'completed' => 'Completed',
                    ] as $value => $label)
                        <option value="{{ $value }}"
                                @selected(request('status') === $value)>
                            {{ $label }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="col-12 col-lg-2 d-flex gap-2">
                <button type="submit" class="btn btn-clinic">Filter</button>
                <a href="{{ route('cashier.appointments.index') }}"
                   class="btn btn-light">
                    Clear
                </a>
            </div>
        </form>

        @if($errors->getBag('default')->any())
            <div class="alert alert-danger">
                <ul class="mb-0">
                    @foreach($errors->getBag('default')->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="table-responsive">
            <table class="table clinic-table align-middle mb-0">
                <thead>
                    <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Schedule</th>
                        <th scope="col" class="text-center">Status</th>
                        <th scope="col" class="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    @forelse($appointments as $appointment)
                        <tr>
                            <td>
                                <div class="fw-semibold">
                                    {{ $appointment->patient->last_name }},
                                    {{ $appointment->patient->first_name }}
                                </div>
                                <small class="text-secondary">
                                    {{ $appointment->patient->patient_number }}
                                </small>
                            </td>

                            <td>{{ $appointment->doctor->name }}</td>

                            <td>
                                <div>
                                    {{ $appointment->scheduled_at->format('M d, Y') }}
                                </div>
                                <small class="text-secondary">
                                    {{ $appointment->scheduled_at->format('h:i A') }}
                                </small>
                            </td>

                            <td class="text-center">
                                <span class="role-badge">
                                    {{ ucwords(str_replace('_', ' ', $appointment->status)) }}
                                </span>
                            </td>
                            <td class="text-center">
                            @if($appointment->status === 'scheduled')
                                <div class="d-flex justify-content-center gap-2">
                                    <button type="button"
                                            class="btn btn-sm btn-outline-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#edit-appointment-modal"
                                            data-update-url="{{ route('cashier.appointments.update', $appointment) }}"
                                            data-patient-label="{{ $appointment->patient->patient_number }} — {{ $appointment->patient->first_name }} {{ $appointment->patient->last_name }}"
                                            data-doctor-id="{{ $appointment->doctor_id }}"
                                            data-scheduled-at="{{ $appointment->scheduled_at->format('Y-m-d\TH:i') }}"
                                            data-reason="{{ $appointment->reason }}">
                                        Edit
                                    </button>
                                    <button type="button"
                                            class="btn btn-sm btn-clinic"
                                            data-bs-toggle="modal"
                                            data-bs-target="#appointment-action-modal"
                                            data-action-type="check-in"
                                            data-action-url="{{ route('cashier.appointments.check-in', $appointment) }}"
                                            data-patient-name="{{ $appointment->patient->first_name }} {{ $appointment->patient->last_name }}"
                                            data-schedule="{{ $appointment->scheduled_at->format('M d, Y h:i A') }}">
                                        Check-in
                                    </button>

                                    <button type="button"
                                            class="btn btn-sm btn-outline-danger"
                                            data-bs-toggle="modal"
                                            data-bs-target="#appointment-action-modal"
                                            data-action-type="cancel"
                                            data-action-url="{{ route('cashier.appointments.cancel', $appointment) }}"
                                            data-patient-name="{{ $appointment->patient->first_name }} {{ $appointment->patient->last_name }}"
                                            data-schedule="{{ $appointment->scheduled_at->format('M d, Y h:i A') }}">
                                        Cancel
                                    </button>
                                </div>
                            @else
                                <small class="text-secondary">No available actions</small>
                            @endif
                        </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="text-center py-5 text-secondary">
                                No appointments found.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="mt-4">
            {{ $appointments->links() }}
        </div>
    </section>
@endsection

@push('modals')

    <x-modal id="edit-appointment-modal" title="Edit Appointment">
            <div class="alert alert-light border">
                <strong id="edit-appointment-patient">
                    {{ session('edit_appointment_patient') }}
                </strong>
            </div>

            @if($errors->editAppointment->any())
                <div class="alert alert-danger" role="alert">
                    <ul class="mb-0">
                        @foreach($errors->editAppointment->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form id="edit-appointment-form"
                method="POST"
                @if(session('edit_appointment_url'))
                    action="{{ session('edit_appointment_url') }}"
                @endif>
                @csrf
                @method('PATCH')

                <div class="mb-3">
                    <label for="edit-booking-doctor" class="form-label">
                        Doctor *
                    </label>

                    <select id="edit-booking-doctor"
                            name="doctor_id"
                            class="form-select"
                            required>
                        <option value="">Select doctor</option>

                        @foreach($doctors as $doctor)
                            <option value="{{ $doctor->id }}"
                                    @selected((string) old('doctor_id') === (string) $doctor->id)>
                                {{ $doctor->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label for="edit-booking-schedule" class="form-label">
                        Date and Time *
                    </label>

                    <input type="datetime-local"
                        id="edit-booking-schedule"
                        name="scheduled_at"
                        class="form-control"
                        value="{{ old('scheduled_at') }}"
                        required>

                    <small class="text-secondary">
                        Time zone: {{ config('app.timezone') }}
                    </small>
                </div>

                <div class="mb-3">
                    <label for="edit-booking-reason" class="form-label">
                        Reason for Appointment
                    </label>

                    <textarea id="edit-booking-reason"
                            name="reason"
                            class="form-control"
                            rows="3"
                            maxlength="2000">{{ old('reason') }}</textarea>
                </div>
            </form>

            <x-slot:footer>
                <button type="button"
                        class="btn btn-light"
                        data-bs-dismiss="modal">
                    Cancel
                </button>

                <button type="submit"
                        form="edit-appointment-form"
                        class="btn btn-clinic"
                        @disabled($doctors->isEmpty())>
                    Save Changes
                </button>
            </x-slot:footer>
        </x-modal>

    <x-modal id="add-appointment-modal" title="Schedule Appointment">
        @if($errors->appointment->any())
            <div class="alert alert-danger" role="alert">
                <ul class="mb-0">
                    @foreach($errors->appointment->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form id="add-appointment-form"
              method="POST"
              action="{{ route('cashier.appointments.store') }}">
            @csrf

            <div class="mb-3">
                <label for="booking-patient" class="form-label">
                    Patient Number *
                </label>
                <input type="text"
                       id="booking-patient"
                       name="patient_number"
                       class="form-control"
                       placeholder="00-00-00-01"
                       value="{{ old('patient_number') }}"
                       pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
                       maxlength="11"
                       required>

                <small class="text-secondary">
                    Use an existing patient number from All Patient Records.
                </small>
            </div>

            <div class="mb-3">
                <label for="booking-doctor" class="form-label">Doctor *</label>
                <select id="booking-doctor"
                        name="doctor_id"
                        class="form-select"
                        required>
                    <option value="">Select doctor</option>

                    @foreach($doctors as $doctor)
                        <option value="{{ $doctor->id }}"
                                @selected((string) old('doctor_id') === (string) $doctor->id)>
                            {{ $doctor->name }}
                        </option>
                    @endforeach
                </select>

                @if($doctors->isEmpty())
                    <small class="text-danger">No active doctor accounts available.</small>
                @endif
            </div>

            <div class="mb-3">
                <label for="booking-schedule" class="form-label">
                    Date and Time *
                </label>
                <input type="datetime-local"
                       id="booking-schedule"
                       name="scheduled_at"
                       class="form-control"
                       value="{{ old('scheduled_at') }}"
                       required>

                <small class="text-secondary">
                    Time zone: {{ config('app.timezone') }}.
                    Doctor availability must be confirmed by clinic staff.
                </small>
            </div>

            <div class="mb-3">
                <label for="booking-reason" class="form-label">
                    Reason for Appointment
                </label>
                <textarea id="booking-reason"
                          name="reason"
                          class="form-control"
                          rows="3"
                          maxlength="2000">{{ old('reason') }}</textarea>
            </div>
        </form>

        <x-slot:footer>
            <button type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal">
                Cancel
            </button>

            <button type="submit"
                    form="add-appointment-form"
                    class="btn btn-clinic"
                    @disabled($doctors->isEmpty())>
                Save Appointment
            </button>
        </x-slot:footer>
    </x-modal>

    <x-modal id="appointment-action-modal"
            title="Confirm Appointment Action"
            size="modal-sm">
        <p id="appointment-action-message"></p>

        <div class="border rounded p-3">
            <div id="appointment-action-patient" class="fw-semibold"></div>
            <small id="appointment-action-schedule"
                class="text-secondary"></small>
        </div>

        <p id="appointment-action-note"
        class="small text-secondary mt-3 mb-0"></p>

        <form id="appointment-action-form" method="POST">
            @csrf
        </form>

        <x-slot:footer>
            <button type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal">
                Close
            </button>

            <button type="submit"
                    id="appointment-action-submit"
                    form="appointment-action-form"
                    class="btn btn-clinic"
                    disabled>
                Confirm
            </button>
        </x-slot:footer>
    </x-modal>

    @if(session('success'))
        <x-modal id="appointment-success-modal" title="Success" size="modal-sm">
            <p class="mb-0" role="status">{{ session('success') }}</p>
        </x-modal>
    @endif
@endpush

@push('scripts')
    <script>
        const actionModal = document.getElementById('appointment-action-modal');
        const actionForm = document.getElementById('appointment-action-form');
        const actionSubmit = document.getElementById('appointment-action-submit');

        actionModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            if (!button) return;

            const isCancel = button.dataset.actionType === 'cancel';

            actionForm.action = button.dataset.actionUrl;

            document.getElementById('appointment-action-patient').textContent =
                button.dataset.patientName;

            document.getElementById('appointment-action-schedule').textContent =
                button.dataset.schedule;

            document.getElementById('appointment-action-message').textContent =
                isCancel
                    ? 'Cancel this appointment?'
                    : 'Confirm that the patient has arrived for this appointment?';

            document.getElementById('appointment-action-note').textContent =
                isCancel
                    ? 'The appointment will remain in the records as Cancelled.'
                    : 'This creates a visit and adds the patient to the assigned doctor’s queue. Check the schedule before confirming.';

            actionSubmit.className = isCancel
                ? 'btn btn-danger'
                : 'btn btn-clinic';

            actionSubmit.textContent = isCancel
                ? 'Cancel Appointment'
                : 'Confirm Check-in';

            actionSubmit.disabled = false;
        });

        actionForm.addEventListener('submit', function () {
            actionSubmit.disabled = true;
            actionSubmit.textContent = 'Processing…';
        });
    </script>
    <script>
        document.getElementById('add-appointment-form')
            .addEventListener('submit', function () {
                const button = document.querySelector(
                    'button[form="add-appointment-form"][type="submit"]'
                );

                button.disabled = true;
                button.textContent = 'Saving…';
            });

        @if(session('modal') === 'add-appointment-modal')
            bootstrap.Modal.getOrCreateInstance(
                document.getElementById('add-appointment-modal')
            ).show();
        @endif

        @if(session('success'))
            const successElement = document.getElementById('appointment-success-modal');
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
    <script>
        const editAppointmentModal =
            document.getElementById('edit-appointment-modal');

        const editAppointmentForm =
            document.getElementById('edit-appointment-form');

        editAppointmentModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;

            // Preserve old input when reopening after validation errors.
            if (!button) return;

            editAppointmentForm.action = button.dataset.updateUrl;

            document.getElementById('edit-appointment-patient').textContent =
                button.dataset.patientLabel;

            document.getElementById('edit-booking-doctor').value =
                button.dataset.doctorId;

            document.getElementById('edit-booking-schedule').value =
                button.dataset.scheduledAt;

            document.getElementById('edit-booking-reason').value =
                button.dataset.reason;
        });

        editAppointmentForm.addEventListener('submit', function () {
            const button = document.querySelector(
                'button[form="edit-appointment-form"][type="submit"]'
            );

            button.disabled = true;
            button.textContent = 'Saving…';
        });

        @if(session('modal') === 'edit-appointment-modal')
            bootstrap.Modal.getOrCreateInstance(editAppointmentModal).show();
        @endif
    </script>
@endpush
