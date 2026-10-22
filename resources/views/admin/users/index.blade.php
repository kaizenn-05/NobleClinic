@extends('layouts.staff')

@section('title', 'User Management')

@section('sidebar')
    @include('partials.sidebars.admin')
@endsection

@section('content')
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
            <h1 class="page-heading mb-1">User Management</h1>
            <p class="text-secondary mb-0">
                Manage clinic accounts and staff access.
            </p>
        </div>

        <button type="button"
                class="btn btn-clinic"
                data-bs-toggle="modal"
                data-bs-target="#add-staff-modal">
            + Add Staff
        </button>
    </div>

    @if (session('error'))
        <div class="alert alert-danger" role="alert">
            {{ session('error') }}
        </div>
    @endif

    <section class="clinic-card">
        <div class="users-toolbar mb-4">
            <h2 class="h5 mb-0">Clinic Users</h2>

            <form method="GET"
                action="{{ route('admin.users.index') }}"
                class="users-search"
                role="search">
                <label for="user-search" class="visually-hidden">
                    Search users by name, email, or role
                </label>

                <input type="search"
                    id="user-search"
                    name="search"
                    class="form-control"
                    placeholder="Search name, email, or role…"
                    value="{{ request('search') }}"
                    maxlength="100">

                <button type="submit" class="btn btn-clinic">
                    Search
                </button>

                @if(request()->filled('search'))
                    <a href="{{ route('admin.users.index') }}"
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
                        <th scope="col">User</th>
                        <th scope="col" class="text-center">Role</th>
                        <th scope="col" class="text-center">Status</th>
                        <th scope="col" class="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    @forelse ($users as $account)
                        <tr>
                            <td>
                                <div class="d-flex align-items-center gap-3">
                                    <span class="account-avatar flex-shrink-0">
                                        {{ strtoupper(substr($account->name, 0, 1)) }}
                                    </span>

                                    <div>
                                        <div class="fw-semibold">
                                            {{ $account->name }}
                                        </div>

                                        <small class="text-secondary">
                                            {{ $account->email }}
                                        </small>
                                    </div>
                                </div>
                            </td>

                            <td class="text-center">
                                <span class="role-badge">
                                    {{ ucfirst($account->role?->name ?? 'Unassigned') }}
                                </span>
                            </td>

                            <td class="text-center">
                                <span class="status-badge {{ $account->is_active ? 'status-active' : 'status-inactive' }}">
                                    {{ $account->is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>

                            <td class="text-center">
                                @if (
                                    $account->id === auth()->id() ||
                                    $account->role?->name === 'admin'
                                )
                                    <small class="text-secondary">Protected</small>
                                @else
                                    <div class="d-flex justify-content-center gap-2">
                                        <button type="button"
                                                class="btn btn-sm btn-outline-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit-user-modal"
                                                data-user-name="{{ $account->name }}"
                                                data-user-email="{{ $account->email }}"
                                                data-user-role="{{ $account->role?->name }}"
                                                data-update-url="{{ route('admin.users.update', $account) }}">
                                            Edit
                                        </button>

                                        <button type="button"
                                                class="btn btn-sm btn-outline-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete-user-modal"
                                                data-user-name="{{ $account->name }}"
                                                data-delete-url="{{ route('admin.users.destroy', $account) }}">
                                            Delete
                                        </button>
                                    </div>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="text-center py-4">
                                No users found.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="mt-4">
            {{ $users->links() }}
        </div>
    </section>
@endsection

@push('modals')
    <x-modal id="add-staff-modal" title="Create Staff Account">
        @if (session('modal') === 'add-staff-modal' && $errors->any())
            <div class="alert alert-danger" role="alert">
                <ul class="mb-0">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form id="add-staff-form"
              method="POST"
              action="{{ route('admin.users.store') }}">
            @csrf

            <div class="row g-3">
                <div class="col-12">
                    <label for="staff-name" class="form-label">Full Name</label>
                    <input type="text"
                           id="staff-name"
                           name="name"
                           class="form-control"
                           value="{{ old('name') }}"
                           maxlength="255"
                           required>
                </div>

                <div class="col-12 col-md-6">
                    <label for="staff-email" class="form-label">Email</label>
                    <input type="email"
                           id="staff-email"
                           name="email"
                           class="form-control"
                           value="{{ old('email') }}"
                           required>
                </div>

                <div class="col-12 col-md-6">
                    <label for="staff-role" class="form-label">Role</label>
                    <select id="staff-role"
                            name="role"
                            class="form-select"
                            required>
                        <option value="">Select staff role</option>

                        @foreach (['doctor', 'cashier', 'pharmacist'] as $role)
                            <option value="{{ $role }}"
                                    @selected(old('role') === $role)>
                                {{ ucfirst($role) }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="col-12 col-md-6">
                    <label for="staff-password" class="form-label">
                        Password
                    </label>
                    <input type="password"
                           id="staff-password"
                           name="password"
                           class="form-control"
                           autocomplete="new-password"
                           required>
                </div>

                <div class="col-12 col-md-6">
                    <label for="staff-password-confirmation" class="form-label">
                        Confirm Password
                    </label>
                    <input type="password"
                           id="staff-password-confirmation"
                           name="password_confirmation"
                           class="form-control"
                           autocomplete="new-password"
                           required>
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
                    form="add-staff-form"
                    class="btn btn-clinic">
                Create Account
            </button>
        </x-slot:footer>
    </x-modal>

    <x-modal id="edit-user-modal" title="Edit User">
        @if (session('modal') === 'edit-user-modal' && $errors->any())
            <div class="alert alert-danger" role="alert">
                <ul class="mb-0">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form id="edit-user-form"
              method="POST"
              @if(session('edit_url'))
                  action="{{ session('edit_url') }}"
              @endif>
            @csrf
            @method('PATCH')

            <div class="mb-3">
                <label for="edit-user-name" class="form-label">Full Name</label>
                <input type="text"
                       id="edit-user-name"
                       name="name"
                       class="form-control"
                       value="{{ old('name') }}"
                       maxlength="255"
                       required>
            </div>

            <div class="mb-3">
                <label for="edit-user-email" class="form-label">Email</label>
                <input type="email"
                       id="edit-user-email"
                       name="email"
                       class="form-control"
                       value="{{ old('email') }}"
                       required>
            </div>

            <div class="mb-3">
                <label for="edit-user-role" class="form-label">Role</label>
                <select id="edit-user-role"
                        name="role"
                        class="form-select"
                        required>
                    <option value="">Select role</option>

                    @foreach (['doctor', 'cashier', 'pharmacist', 'patient'] as $role)
                        <option value="{{ $role }}"
                                @selected(old('role') === $role)>
                            {{ ucfirst($role) }}
                        </option>
                    @endforeach
                </select>
            </div>
        </form>

        <x-slot:footer>
            <button type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal">
                Cancel
            </button>

            <button type="submit"
                    form="edit-user-form"
                    class="btn btn-clinic">
                Save Changes
            </button>
        </x-slot:footer>
    </x-modal>

    <x-modal id="delete-user-modal" title="Delete User" size="modal-sm">
        <p>
            Delete the account of
            <strong id="delete-user-name"></strong>?
        </p>

        <p class="small text-danger mb-0">
            This permanently deletes the account.
            Accounts with linked records cannot be deleted.
        </p>

        <form id="delete-user-form" method="POST">
            @csrf
            @method('DELETE')
        </form>

        <x-slot:footer>
            <button type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal">
                Cancel
            </button>

            <button type="submit"
                    form="delete-user-form"
                    class="btn btn-danger">
                Delete User
            </button>
        </x-slot:footer>
    </x-modal>
        @if(session('success'))
        <div class="modal fade"
            id="user-success-modal"
            tabindex="-1"
            aria-labelledby="user-success-title"
            aria-describedby="user-success-description"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content clinic-modal">
                    <div class="modal-body text-center p-4">
                        <button type="button"
                                class="btn-close position-absolute top-0 end-0 m-3"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>

                        <div class="success-symbol mx-auto mb-3"
                            aria-hidden="true">
                            ✓
                        </div>

                        <h2 id="user-success-title" class="h5">
                            Success!
                        </h2>

                        <p id="user-success-description"
                        class="text-secondary mb-0"
                        role="status">
                            {{ session('success') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    @endif

    @endpush

@push('scripts')
    <script>
        const editModal = document.getElementById('edit-user-modal');
        const deleteModal = document.getElementById('delete-user-modal');

        editModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;

            // Preserve old input when reopening after validation errors.
            if (!button) return;

            document.getElementById('edit-user-form').action =
                button.dataset.updateUrl;

            document.getElementById('edit-user-name').value =
                button.dataset.userName;

            document.getElementById('edit-user-email').value =
                button.dataset.userEmail;

            document.getElementById('edit-user-role').value =
                button.dataset.userRole;
        });

        deleteModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            if (!button) return;

            document.getElementById('delete-user-name').textContent =
                button.dataset.userName;

            document.getElementById('delete-user-form').action =
                button.dataset.deleteUrl;
        });

        // Prevent repeated clicks while submitting.
        [
            'add-staff-form',
            'edit-user-form',
            'delete-user-form'
        ].forEach(function (id) {
            document.getElementById(id).addEventListener('submit', function () {
                const button = document.querySelector(
                    'button[type="submit"][form="' + id + '"]'
                );

                button.disabled = true;
                button.textContent = 'Processing…';
            });
        });

        @if (in_array(session('modal'), ['add-staff-modal', 'edit-user-modal'], true))
            bootstrap.Modal.getOrCreateInstance(
                document.getElementById(@json(session('modal')))
            ).show();
        @endif
    </script>
    @if(session('success'))
        <script>
            const successElement = document.getElementById('user-success-modal');
            const successModal = bootstrap.Modal.getOrCreateInstance(successElement);

            let successTimer;

            successElement.addEventListener('shown.bs.modal', function () {
                successTimer = setTimeout(function () {
                    successModal.hide();
                }, 2500);
            });

            successElement.addEventListener('hidden.bs.modal', function () {
                clearTimeout(successTimer);
            });

            successModal.show();
        </script>
    @endif
@endpush
