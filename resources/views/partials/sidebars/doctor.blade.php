<aside class="clinic-sidebar" id="clinic-sidebar">
    <a href="{{ route('doctor.dashboard') }}" class="clinic-brand">
        <span class="brand-symbol">+</span>
        <span>Noble Clinic</span>
    </a>

    <div class="sidebar-label">DOCTOR WORKSPACE</div>

    <nav class="sidebar-menu" aria-label="Doctor navigation">
        <a href="{{ route('doctor.dashboard') }}"
           class="menu-link active"
           aria-current="page">
            <span class="menu-icon" aria-hidden="true">▦</span>
            Dashboard
        </a>

        <button type="button" class="menu-link" disabled>
            <span class="menu-icon" aria-hidden="true">▤</span>
            Appointments
        </button>

        <button type="button" class="menu-link" disabled>
            <span class="menu-icon" aria-hidden="true">○</span>
            Patient Records
        </button>

        <a href="{{ route('doctor.queue.index') }}"
            class="menu-link {{ request()->routeIs('doctor.queue.*') ? 'active' : '' }}"
            @if(request()->routeIs('doctor.queue.*')) aria-current="page" @endif>
                <span class="menu-icon" aria-hidden="true">▤</span>
                My Patient Queue
        </a>

        <button type="button" class="menu-link" disabled>
            <span class="menu-icon" aria-hidden="true">✚</span>
            Consultations
        </button>

        <button type="button" class="menu-link" disabled>
            <span class="menu-icon" aria-hidden="true">▤</span>
            Prescriptions
        </button>
    </nav>
</aside>
