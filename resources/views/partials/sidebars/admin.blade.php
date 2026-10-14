<aside class="clinic-sidebar" id="clinic-sidebar">
    <a href="{{ route('admin.dashboard') }}" class="clinic-brand">
        <span class="brand-symbol">+</span>
        <span>Noble Clinic</span>
    </a>

    <div class="sidebar-label">ADMIN WORKSPACE</div>

    <nav class="sidebar-menu" aria-label="Admin navigation">
        <a href="{{ route('admin.dashboard') }}"
           class="menu-link active"
           aria-current="page">
            <span class="menu-icon" aria-hidden="true">▦</span>
            Dashboard
        </a>

        @foreach ([
            'User Management',
            'All Patient Records',
            'Appointments',
            'Consultations',
            'Medicines',
            'Billing',
            'Reports',
            'Audit Logs',
        ] as $menu)
            <button type="button" class="menu-link" disabled>
                <span class="menu-icon" aria-hidden="true">▤</span>
                {{ $menu }}
            </button>
        @endforeach

        <div class="sidebar-label">ACCOUNT</div>

        <a href="{{ route('profile.edit') }}" class="menu-link">
            <span class="menu-icon" aria-hidden="true">○</span>
            My Profile
        </a>

        <form method="POST" action="{{ route('logout') }}">
            @csrf

            <button type="submit" class="menu-link">
                <span class="menu-icon" aria-hidden="true">↪</span>
                Logout
            </button>
        </form>
    </nav>
</aside>
