@extends('layouts.staff')

@section('title', 'My Profile')

@section('sidebar')
    @switch(auth()->user()->role?->name)
        @case('admin')
            @include('partials.sidebars.admin')
            @break

        @case('doctor')
            @include('partials.sidebars.doctor')
            @break

        @case('cashier')
            @include('partials.sidebars.cashier')
            @break

        @case('pharmacist')
            @include('partials.sidebars.pharmacist')
            @break

        @case('patient')
            @include('partials.sidebars.patient')
            @break
    @endswitch
@endsection

@section('content')
    <h1 class="page-heading">My Profile</h1>

    <div class="row g-4">
        <div class="col-12">
            <section class="clinic-card">
                <div class="d-flex align-items-center gap-3">
                    <span class="account-avatar profile-avatar">
                        {{ strtoupper(substr($user->name, 0, 1)) }}
                    </span>

                    <div>
                        <h2 class="h5 mb-1">{{ $user->name }}</h2>
                        <p class="text-secondary mb-0">
                            {{ ucfirst($user->role?->name ?? '') }}
                        </p>
                    </div>
                </div>
            </section>
        </div>

        <div class="col-12 col-lg-7">
            <section class="clinic-card">
                <h2 class="h5 mb-1">Account Details</h2>
                <p class="small text-secondary mb-4">
                    Update your name and email address.
                </p>

                @if (session('status') === 'profile-updated')
                    <div class="alert alert-success" role="status">
                        Account details updated successfully.
                    </div>
                @endif

                <form method="POST" action="{{ route('profile.update') }}">
                    @csrf
                    @method('PATCH')

                    <div class="row g-3">
                        <div class="col-12 col-md-6">
                            <label for="name" class="form-label">
                                Full Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                value="{{ old('name', $user->name) }}"
                                class="form-control @error('name') is-invalid @enderror"
                                autocomplete="name"
                                required
                            >

                            @error('name')
                                <div class="invalid-feedback">
                                    {{ $message }}
                                </div>
                            @enderror
                        </div>

                        <div class="col-12 col-md-6">
                            <label for="email" class="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value="{{ old('email', $user->email) }}"
                                class="form-control @error('email') is-invalid @enderror"
                                autocomplete="username"
                                required
                            >

                            @error('email')
                                <div class="invalid-feedback">
                                    {{ $message }}
                                </div>
                            @enderror
                        </div>
                    </div>

                    <div class="mt-4">
                        <button type="submit" class="btn btn-clinic">
                            Save Changes
                        </button>
                    </div>
                </form>
            </section>
        </div>

        <div class="col-12 col-lg-5">
            <section class="clinic-card">
                <h2 class="h5 mb-1">Change Password</h2>
                <p class="small text-secondary mb-4">
                    Enter your current password to choose a new one.
                </p>

                @if (session('status') === 'password-updated')
                    <div class="alert alert-success" role="status">
                        Password updated successfully.
                    </div>
                @endif

                <form method="POST" action="{{ route('password.update') }}">
                    @csrf
                    @method('PUT')

                    <div class="mb-3">
                        <label for="current_password" class="form-label">
                            Current Password
                        </label>

                        <input
                            type="password"
                            id="current_password"
                            name="current_password"
                            class="form-control @error('current_password', 'updatePassword') is-invalid @enderror"
                            autocomplete="current-password"
                            required
                        >

                        @error('current_password', 'updatePassword')
                            <div class="invalid-feedback">
                                {{ $message }}
                            </div>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">
                            New Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="form-control @error('password', 'updatePassword') is-invalid @enderror"
                            autocomplete="new-password"
                            required
                        >

                        @error('password', 'updatePassword')
                            <div class="invalid-feedback">
                                {{ $message }}
                            </div>
                        @enderror
                    </div>

                    <div class="mb-4">
                        <label for="password_confirmation" class="form-label">
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            class="form-control"
                            autocomplete="new-password"
                            required
                        >
                    </div>

                    <button type="submit" class="btn btn-clinic">
                        Update Password
                    </button>
                </form>
            </section>
        </div>
    </div>
@endsection
