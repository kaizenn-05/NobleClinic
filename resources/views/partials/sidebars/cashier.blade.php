<aside class="clinic-sidebar" id="clinic-sidebar">
    <a href="{{ route('cashier.dashboard') }}" class="clinic-brand">
        <span class="brand-symbol">+</span>
        <span>Noble Clinic</span>
    </a>

    <div class="sidebar-label">CASHIER WORKSPACE</div>

    <nav class="sidebar-menu" aria-label="Cashier navigation">
        <a href="{{ route('cashier.dashboard') }}"
           class="menu-link active"
           aria-current="page">
            <span class="menu-icon" aria-hidden="true">▦</span>
            Dashboard
        </a>
        <a href="{{ route('cashier.patients.index') }}"
            class="menu-link {{ request()->routeIs('cashier.patients.*') ? 'active' : '' }}"
            @if(request()->routeIs('cashier.patients.*')) aria-current="page" @endif>
                <span class="menu-icon" aria-hidden="true">▤</span>
                All Patient Records
        </a>
        <a href="{{ route('cashier.queue.index') }}"
            class="menu-link {{ request()->routeIs('cashier.queue.*') ? 'active' : '' }}"
            @if(request()->routeIs('cashier.queue.*')) aria-current="page" @endif>
                <span class="menu-icon" aria-hidden="true">▤</span>
                Patient Queue
        </a>
        <a href="{{ route('cashier.appointments.index') }}"
            class="menu-link {{ request()->routeIs('cashier.appointments.*') ? 'active' : '' }}"
            @if(request()->routeIs('cashier.appointments.*')) aria-current="page" @endif>
                <span class="menu-icon" aria-hidden="true">▤</span>
                Appointments
        </a>

        @foreach ([
            'Invoices',
            'Payments',
            'Daily Collections',
        ] as $menu)
            <button type="button" class="menu-link" disabled>
                <span class="menu-icon" aria-hidden="true">▤</span>
                {{ $menu }}
            </button>
        @endforeach
    </nav>
</aside>
