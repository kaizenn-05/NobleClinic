@extends('layouts.staff')

@section('title', 'All Patient Records')

@section('sidebar')
    @include('partials.sidebars.cashier')
@endsection

@push('styles')
    <link rel="stylesheet"
          href="{{ asset('assets/noble/css/patient-record.css') }}">
@endpush

@section('content')
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
            <h1 class="page-heading mb-1">All Patient Records</h1>
            <p class="text-secondary mb-0">
                Search existing records before registering a patient.
            </p>
        </div>

        <button type="button"
                class="btn btn-clinic"
                data-bs-toggle="modal"
                data-bs-target="#add-patient-modal">
            + Add Patient
        </button>
    </div>

    <section class="clinic-card">
        <div class="users-toolbar mb-4">
            <h2 class="h5 mb-0">Patients</h2>

            <form method="GET"
                  action="{{ route('cashier.patients.index') }}"
                  class="users-search"
                  role="search">
                <label for="patient-search" class="visually-hidden">
                    Search patients
                </label>

                <input type="search"
                       id="patient-search"
                       name="search"
                       class="form-control"
                       placeholder="Search name or patient number…"
                       value="{{ request('search') }}"
                       maxlength="100">

                <button type="submit" class="btn btn-clinic">
                    Search
                </button>

                @if(request()->filled('search'))
                    <a href="{{ route('cashier.patients.index') }}"
                       class="btn btn-light">
                        Clear
                    </a>
                @endif
            </form>
        </div>

        @error('search')
            <div class="alert alert-danger">{{ $message }}</div>
        @enderror

        <div class="table-responsive">
            <table class="table clinic-table align-middle mb-0">
                <thead>
                    <tr>
                        <th scope="col">Patient</th>
                        <th scope="col" class="text-center">Patient Number</th>
                        <th scope="col" class="text-center">Age / Sex</th>
                        <th scope="col" class="text-center">Phone</th>
                        <th scope="col" class="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    @forelse($patients as $patient)
                        <tr>
                            <td>
                                <div class="fw-semibold">
                                    {{ $patient->last_name }},
                                    {{ $patient->first_name }}
                                    {{ $patient->middle_name }}
                                    {{ $patient->suffix }}
                                </div>

                                <small class="text-secondary">
                                    Registered {{ $patient->created_at->format('M d, Y') }}
                                </small>
                            </td>

                            <td class="text-center">
                                <span class="role-badge">
                                    {{ $patient->patient_number }}
                                </span>
                            </td>

                            <td class="text-center">
                                {{ $patient->birth_date->age }}
                                / {{ ucfirst($patient->sex) }}
                            </td>

                            <td>{{ $patient->phone ?: '—' }}</td>

                            <td class="text-center">
                                <div class="d-flex justify-content-center gap-2">
                                    <button type="button"
                                            class="btn btn-sm btn-outline-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#patient-record-modal"
                                            data-record-url="{{ route('cashier.patients.show', $patient) }}"
                                            data-print-url="{{ route('cashier.patients.print', $patient) }}">
                                        View Record
                                    </button>

                                    <button type="button"
                                            class="btn btn-sm btn-clinic"
                                            data-bs-toggle="modal"
                                            data-bs-target="#check-in-modal"
                                            data-check-in-url="{{ route('cashier.patients.check-in', $patient) }}"
                                            data-patient-label="{{ $patient->patient_number }} — {{ $patient->first_name }} {{ $patient->last_name }}">
                                        Check-in
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="text-center py-5">
                                No patients found.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="mt-4">
            {{ $patients->links() }}
        </div>
    </section>
@endsection

@push('modals')

    <x-modal id="patient-record-modal"
         title="Patient Record"
            size="modal-xl">
        <div id="patient-record-content" aria-live="polite">
            Loading patient records…
        </div>

        <x-slot:footer>
            <button type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal">
                Close
            </button>

            <button type="button"
                    id="print-patient-record"
                    class="btn btn-clinic"
                    disabled>
                Print Record
            </button>
        </x-slot:footer>
    </x-modal>

    <x-modal id="add-patient-modal" title="Register Patient">
        <p class="small text-secondary">
            A permanent patient number will be assigned automatically.
            Search for an existing record first to avoid duplicate registration.
        </p>

        @if(session('modal') === 'add-patient-modal' && $errors->any())
            <div class="alert alert-danger" role="alert">
                <ul class="mb-0">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form id="add-patient-form"
              method="POST"
              action="{{ route('cashier.patients.store') }}">
            @csrf

            <div class="row g-3">
                <div class="col-12 col-md-6">
                    <label for="first-name" class="form-label">
                        First Name *
                    </label>
                    <input type="text"
                           id="first-name"
                           name="first_name"
                           class="form-control"
                           value="{{ old('first_name') }}"
                           maxlength="100"
                           required>
                </div>

                <div class="col-12 col-md-6">
                    <label for="middle-name" class="form-label">
                        Middle Name
                    </label>
                    <input type="text"
                           id="middle-name"
                           name="middle_name"
                           class="form-control"
                           value="{{ old('middle_name') }}"
                           maxlength="100">
                </div>

                <div class="col-12 col-md-8">
                    <label for="last-name" class="form-label">
                        Last Name *
                    </label>
                    <input type="text"
                           id="last-name"
                           name="last_name"
                           class="form-control"
                           value="{{ old('last_name') }}"
                           maxlength="100"
                           required>
                </div>

                <div class="col-12 col-md-4">
                    <label for="suffix" class="form-label">Suffix</label>
                    <input type="text"
                           id="suffix"
                           name="suffix"
                           class="form-control"
                           placeholder="Jr., Sr., III"
                           value="{{ old('suffix') }}"
                           maxlength="10">
                </div>

                <div class="col-12 col-md-6">
                    <label for="birth-date" class="form-label">
                        Birth Date *
                    </label>
                    <input type="date"
                           id="birth-date"
                           name="birth_date"
                           class="form-control"
                           value="{{ old('birth_date') }}"
                           max="{{ now()->toDateString() }}"
                           required>
                </div>

                <div class="col-12 col-md-6">
                    <label for="sex" class="form-label">Sex *</label>
                    <select id="sex"
                            name="sex"
                            class="form-select"
                            required>
                        <option value="">Select sex</option>
                        <option value="male" @selected(old('sex') === 'male')>
                            Male
                        </option>
                        <option value="female" @selected(old('sex') === 'female')>
                            Female
                        </option>
                    </select>
                </div>

                <div class="col-12">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="tel"
                           id="phone"
                           name="phone"
                           class="form-control"
                           value="{{ old('phone') }}"
                           maxlength="30">
                </div>

                <div class="col-12">
                    <label for="address" class="form-label">Address</label>
                    <textarea id="address"
                              name="address"
                              class="form-control"
                              rows="2"
                              maxlength="2000">{{ old('address') }}</textarea>
                </div>

                <div class="col-12">
                    <h3 class="h6 mt-3 mb-0">Emergency Contact</h3>
                </div>

                <div class="col-12 col-md-6">
                    <label for="emergency-name" class="form-label">
                        Contact Name
                    </label>
                    <input type="text"
                           id="emergency-name"
                           name="emergency_contact_name"
                           class="form-control"
                           value="{{ old('emergency_contact_name') }}"
                           maxlength="150">
                </div>

                <div class="col-12 col-md-6">
                    <label for="emergency-phone" class="form-label">
                        Contact Phone
                    </label>
                    <input type="tel"
                           id="emergency-phone"
                           name="emergency_contact_phone"
                           class="form-control"
                           value="{{ old('emergency_contact_phone') }}"
                           maxlength="30">
                </div>
            </div>
        </form>

        <x-slot:footer>
            <button type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal">
                Cancel
            </button>

            <button type="submit"
                    form="add-patient-form"
                    class="btn btn-clinic">
                Register Patient
            </button>
        </x-slot:footer>
    </x-modal>

    @if(session('success'))
        <x-modal id="patient-success-modal" title="Success" size="modal-sm">
            <div role="status">
                {{ session('success') }}
            </div>
        </x-modal>
    @endif
       <x-modal id="check-in-modal" title="Patient Check-in">
        <div class="alert alert-light border">
            <strong id="check-in-patient">
                {{ session('check_in_patient') }}
            </strong>
        </div>

        @if($errors->checkIn->any())
            <div class="alert alert-danger" role="alert">
                <ul class="mb-0">
                    @foreach($errors->checkIn->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @if($doctors->isEmpty())
            <div class="alert alert-warning">
                No active doctor accounts are available.
            </div>
        @endif

        <form id="check-in-form"
            method="POST"
            @if(session('check_in_url'))
                action="{{ session('check_in_url') }}"
            @endif>
            @csrf

            <div class="mb-3">
                <label for="check-in-doctor" class="form-label">
                    Assign Doctor *
                </label>

                <select id="check-in-doctor"
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
                <label for="check-in-complaint" class="form-label">
                    Reason for Visit / Chief Complaint *
                </label>

                <textarea id="check-in-complaint"
                        name="chief_complaint"
                        class="form-control"
                        rows="3"
                        maxlength="2000"
                        placeholder="Enter the patient's reported concern"
                        required>{{ old('chief_complaint') }}</textarea>
            </div>

            <p class="small text-secondary mb-0">
                This creates a new visit under the existing patient record.
                The doctor will record the diagnosis.
            </p>
        </form>

        <x-slot:footer>
            <button type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal">
                Cancel
            </button>

            <button type="submit"
                    form="check-in-form"
                    class="btn btn-clinic"
                    @disabled($doctors->isEmpty())>
                Confirm Check-in
            </button>
        </x-slot:footer>
    </x-modal>

@endpush

@push('scripts')
    <script>
        document.getElementById('add-patient-form')
            .addEventListener('submit', function () {
                const button = document.querySelector(
                    'button[form="add-patient-form"][type="submit"]'
                );

                button.disabled = true;
                button.textContent = 'Saving…';
            });

        @if(session('modal') === 'add-patient-modal')
            bootstrap.Modal.getOrCreateInstance(
                document.getElementById('add-patient-modal')
            ).show();
        @endif

        @if(session('success'))
            const successElement = document.getElementById('patient-success-modal');
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
        const checkInModal = document.getElementById('check-in-modal');
        const checkInForm = document.getElementById('check-in-form');

        checkInModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;

            // Keep previous input when reopening after validation errors.
            if (!button) return;

            checkInForm.reset();

            document.getElementById('check-in-doctor').value = '';
            document.getElementById('check-in-complaint').value = '';

            checkInForm.action = button.dataset.checkInUrl;

            document.getElementById('check-in-patient').textContent =
                button.dataset.patientLabel;
        });

        checkInForm.addEventListener('submit', function () {
            const button = document.querySelector(
                'button[form="check-in-form"][type="submit"]'
            );

            button.disabled = true;
            button.textContent = 'Checking in…';
        });

        @if(session('modal') === 'check-in-modal')
            bootstrap.Modal.getOrCreateInstance(checkInModal).show();
        @endif
    </script>

    <script>
    (() => {
        const modal = document.getElementById('patient-record-modal');
        const content = document.getElementById('patient-record-content');
        const printButton = document.getElementById('print-patient-record');

        let activeRequest = null;
        let printUrl = null;

        async function loadRecord(url, selectedPrintUrl = null) {
            activeRequest?.abort();

            const request = new AbortController();
            activeRequest = request;

            content.textContent = 'Loading patient records…';
            printButton.disabled = true;
            printUrl = null;

            const timeout = setTimeout(() => request.abort(), 15000);

            try {
                const response = await fetch(url, {
                    signal: request.signal,
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'text/html',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                if (response.redirected) {
                    throw new Error('Please refresh and log in again.');
                }

                if (!response.ok) {
                    throw new Error(`Unable to load record (${response.status}).`);
                }

                const html = await response.text();

                if (activeRequest !== request) return;

                content.innerHTML = html;
                printUrl = selectedPrintUrl;
                printButton.disabled = !printUrl;
            } catch (error) {
                if (activeRequest !== request) return;

                content.textContent = error.name === 'AbortError'
                    ? 'Request timed out. Close and try again.'
                    : error.message;
            } finally {
                clearTimeout(timeout);
            }
        }

        modal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            if (!button) return;

            // Initial view is the visit list. No print until a visit is selected.
            loadRecord(button.dataset.recordUrl);
        });

        // Handles View and Back buttons loaded inside the modal.
        content.addEventListener('click', function (event) {
            const button = event.target.closest('[data-record-navigation]');
            if (!button) return;

            loadRecord(
                button.dataset.recordUrl,
                button.dataset.printUrl || null
            );
        });

        modal.addEventListener('hidden.bs.modal', function () {
            activeRequest?.abort();
            activeRequest = null;
            printUrl = null;
            printButton.disabled = true;
            content.textContent = '';
        });

        printButton.addEventListener('click', function () {
            if (printUrl) {
                window.open(printUrl, '_blank', 'noopener,noreferrer');
            }
        });
    })();
</script>
@endpush
