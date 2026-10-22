<aside class="clinic-sidebar" id="clinic-sidebar">
    <a href="{{ route('patient.dashboard') }}" class="clinic-brand">
        <span class="brand-symbol">+</span>
        <span>Noble Clinic</span>
    </a>

    <div class="sidebar-label">PATIENT WORKSPACE</div>

    <nav class="sidebar-menu" aria-label="Patient navigation">
        <a href="{{ route('patient.dashboard') }}"
           class="menu-link active"
           aria-current="page">
            <span class="menu-icon" aria-hidden="true">▦</span>
            Dashboard
        </a>

        @foreach ([
            'My Appointments',
            'My Visit History',
            'My Prescriptions',
            'My Bills',
        ] as $menu)
            <button type="button" class="menu-link" disabled>
                <span class="menu-icon" aria-hidden="true">▤</span>
                {{ $menu }}
            </button>
        @endforeach
    </nav>
</aside>
