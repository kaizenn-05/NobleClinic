<!DOCTYPE html>
<html lang="en" class=" layout-wide  customizer-hide" dir="ltr" data-skin="default"
    data-assets-path="{{ asset('assets/') }}/" data-template="vertical-menu-template" data-bs-theme="light">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow" />
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Login | PAC-AIMS</title>

    <!-- SEO for PAC-AIMS Enrollment System -->
    <meta name="description"
        content="PAC-AIMS is a modern and responsive academic enrollment system designed to simplify and streamline student registration and information management." />

    <meta name="keywords"
        content="PAC-AIMS, student enrollment system, academic management, school system, PAC AIMS portal, responsive enrollment platform, education tech" />

    <!-- Open Graph for Social Media -->
    <meta property="og:title" content="PAC-AIMS | Academic Enrollment & Information Management System" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://pac-aims.com/" />
    <meta property="og:image" content="https://pac-aims.com/assets/images/pac-aims-og-image.png" />
    <meta property="og:description"
        content="PAC-AIMS is a smart academic enrollment system that helps schools manage student registration, records, and academic processes efficiently." />
    <meta property="og:site_name" content="PAC-AIMS" />

    <!-- Canonical URL -->
    <link rel="canonical" href="https://pac-aims.com/" />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('assets/img/favicon/favicon.ico') }}" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet" />

    <link rel="stylesheet" href="{{ asset('assets/vendor/fonts/iconify-icons.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/pickr/pickr-themes.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/css/core.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/demo.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/@form-validation/form-validation.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/notyf/notyf.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/css/pages/page-auth.css') }}" />
    <script src="{{ asset('assets/vendor/js/helpers.js') }}"></script>
    <script src="{{ asset('assets/vendor/js/template-customizer.js') }}"></script>
    <script src="{{ asset('assets/js/config.js') }}"></script>

    {{-- @vite(['resources/css/app.css', 'resources/js/app.js']) --}}
</head>

<body>

    <div class="authentication-wrapper authentication-cover">
        {{ $slot }}
    </div>

    <script src="{{ asset('assets/vendor/libs/jquery/jquery.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/popper/popper.js') }}"></script>
    <script src="{{ asset('assets/vendor/js/bootstrap.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/@algolia/autocomplete-js.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/pickr/pickr.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/hammer/hammer.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/notyf/notyf.js') }}"></script>
    <script src="{{ asset('assets/vendor/js/menu.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/@form-validation/popular.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/@form-validation/bootstrap5.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/@form-validation/auto-focus.js') }}"></script>
    <script src="{{ asset('assets/js/main.js') }}"></script>
    <script src="{{ asset('assets/js/pages-auth.js') }}"></script>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            class CustomNotyf extends Notyf {
                _renderNotification(n) {
                    const el = super._renderNotification(n);
                    if (n.message) el.message.innerHTML = n.message;
                    return el;
                }
            }

            const notyf = new CustomNotyf({
                dismissible: true,
                ripple: true,
                duration: 6000,
                position: {
                    x: 'right',
                    y: 'top'
                },
                types: [{
                        type: 'success',
                        background: 'var(--bs-success)',
                        className: 'notyf__success',
                        icon: {
                            className: 'custom-success-icon',
                            tagName: 'span'
                        }
                    },
                    {
                        type: 'error',
                        background: 'var(--bs-danger)',
                        className: 'notyf__error',
                        icon: {
                            className: 'custom-error-icon',
                            tagName: 'span'
                        }
                    }
                ]
            });

            @if (session('toast'))
                notyf.open({
                    type: '{{ session('toast.type') }}',
                    message: `{!! session('toast.message') !!}`,
                    duration: {{ session('toast.duration') ?? 6000 }},
                    dismissible: {{ session('toast.dismissible') ? 'true' : 'false' }},
                    ripple: {{ session('toast.ripple') ? 'true' : 'false' }},
                    position: {
                        x: '{{ session('toast.position.x') ?? 'right' }}',
                        y: '{{ session('toast.position.y') ?? 'top' }}'
                    }
                });
            @endif
        });
    </script>

    @stack('scripts')

</body>

</html>
