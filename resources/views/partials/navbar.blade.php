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

        <span class="account-avatar">
            {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
        </span>

        <span class="account-avatar">DA</span>
    </div>
</header>
