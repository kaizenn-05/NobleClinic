<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title') | Noble Clinic</title>

    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">

    <link rel="stylesheet"
          href="{{ asset('assets/noble/css/noble-clinic.css') }}">
</head>
<body>
    <main class="auth-wrapper">
        <section class="auth-brand-panel">
            <a href="{{ url('/') }}" class="clinic-brand">
                <span class="brand-symbol">+</span>
                <span>Noble Clinic</span>
            </a>

            <div class="auth-introduction">
                <div class="auth-symbol" aria-hidden="true">+</div>
                <h1>Care starts here.</h1>
                <p>Your clinic services in one convenient place.</p>
            </div>
        </section>

        <section class="auth-form-panel">
            <div class="auth-form-container">
                @yield('content')
            </div>
        </section>
    </main>

    <script src="{{ asset('assets/noble/js/noble-clinic.js') }}"></script>
</body>
</html>
