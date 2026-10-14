@extends('layouts.auth')

@section('title', 'Login')

@section('content')
    <h1>Welcome to Noble Clinic!</h1>
    <p class="auth-description">Sign in to your account.</p>

    @if (session('status'))
        <div class="alert alert-success" role="status">
            {{ session('status') }}
        </div>
    @endif

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                class="form-control @error('email') is-invalid @enderror"
                value="{{ old('email') }}"
                autocomplete="username"
                required
                autofocus
            >

            @error('email')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                class="form-control @error('password') is-invalid @enderror"
                autocomplete="current-password"
                required
            >

            @error('password')
                <div class="invalid-feedback">{{ $message }}</div>
            @enderror
        </div>

        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="form-check">
                <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    class="form-check-input"
                    @checked(old('remember'))
                >
                <label for="remember" class="form-check-label">
                    Remember me
                </label>
            </div>

            <a href="{{ route('password.request') }}">Forgot password?</a>
        </div>

        <button type="submit" class="btn btn-clinic w-100">
            Sign in
        </button>

        <p class="text-center mt-4 mb-0">
            New here?
            <a href="{{ route('register') }}">Create an account</a>
        </p>
    </form>
@endsection
