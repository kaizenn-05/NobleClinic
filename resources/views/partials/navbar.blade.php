<header class="clinic-navbar">
    <div class="d-flex align-items-center gap-3">
        <button type="button"
                class="sidebar-toggle"
                aria-label="Toggle navigation"
                aria-controls="clinic-sidebar"
                aria-expanded="false">
            ☰
        </button>

        <span class="navbar-title">@yield('title', 'Dashboard')</span>
    </div>

    <div class="d-flex align-items-center gap-3">
        <span class="preview-badge">UI Preview</span>

        <div class="dropdown">
            <button type="button"
                    class="account-menu-button"
                    id="account-menu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="Open account menu">
                <span class="account-avatar">
                    {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
                </span>
            </button>

            <ul class="dropdown-menu dropdown-menu-end shadow-sm"
                aria-labelledby="account-menu">
                <li class="px-3 py-2">
                    <div class="fw-semibold">
                        {{ auth()->user()->name }}
                    </div>
                    <small class="text-secondary">
                        {{ ucfirst(auth()->user()->role?->name ?? '') }}
                    </small>
                </li>

                <li><hr class="dropdown-divider"></li>

                <li>
                    <a href="{{ route('profile.edit') }}"
                       class="dropdown-item">
                        My Profile
                    </a>
                </li>

                <li>
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf

                        <button type="submit"
                                class="dropdown-item text-danger">
                            Logout
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</header>
