<aside class="clinic-sidebar" id="clinic-sidebar">
    <a href="{{ route('admin.dashboard') }}" class="clinic-brand">
        <span class="brand-symbol">+</span>
        <span>Noble Clinic</span>
    </a>

    <div class="sidebar-label">ADMIN WORKSPACE</div>

    <nav class="sidebar-menu" aria-label="Admin navigation">
        <a href="{{ route('admin.dashboard') }}"
        class="menu-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}"
        @if(request()->routeIs('admin.dashboard')) aria-current="page" @endif>
            <span class="menu-icon" aria-hidden="true">▦</span>
            Dashboard
        </a>

        <a href="{{ route('admin.users.index') }}"
            class="menu-link {{ request()->routeIs('admin.users.*') ? 'active' : '' }}"
            @if(request()->routeIs('admin.users.*')) aria-current="page" @endif>
                <span class="menu-icon" aria-hidden="true">▤</span>
                User Management
        </a>

        @foreach ([
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
    </nav>
</aside>
