<aside class="clinic-sidebar" id="clinic-sidebar">
    <a href="{{ route('pharmacist.dashboard') }}" class="clinic-brand">
        <span class="brand-symbol">+</span>
        <span>Noble Clinic</span>
    </a>

    <div class="sidebar-label">PHARMACIST WORKSPACE</div>

    <nav class="sidebar-menu" aria-label="Pharmacist navigation">
        <a href="{{ route('pharmacist.dashboard') }}"
           class="menu-link active"
           aria-current="page">
            <span class="menu-icon" aria-hidden="true">▦</span>
            Dashboard
        </a>

        @foreach ([
            'Medicines',
            'Medicine Batches',
            'Prescriptions',
            'Dispensing',
            'Stock Movements',
            'Expiry Monitoring',
            'Inventory Reports',
        ] as $menu)
            <button type="button" class="menu-link" disabled>
                <span class="menu-icon" aria-hidden="true">▤</span>
                {{ $menu }}
            </button>
        @endforeach
    </nav>
</aside>
