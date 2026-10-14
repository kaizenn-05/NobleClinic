<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title', 'Dashboard') | Noble Clinic</title>

    {{-- CDN muna: kailangan ng internet para ma-load ang Bootstrap --}}
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">

    <link rel="stylesheet"
          href="{{ asset('assets/noble/css/noble-clinic.css') }}">

    @stack('styles')

    <script src="{{ asset('assets/noble/js/noble-clinic.js') }}"></script>
</head>
<body>
    {{-- @include('partials.sidebars.admin') --}}

    @hasSection('sidebar')
    @yield('sidebar')
    @else
        @include('partials.sidebars.admin')
    @endif

    <button type="button"
            class="sidebar-overlay"
            aria-label="Close navigation"
            data-sidebar-close></button>

    <div class="main-wrapper">
        @include('partials.navbar')

        <main class="page-content">
            @yield('content')
        </main>

        <footer class="page-footer">
            © {{ date('Y') }} Noble Clinic · UI Preview
        </footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>


    @stack('scripts')
</body>
</html>
