const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebarClose = document.querySelector('[data-sidebar-close]');

function setSidebarOpen(open) {
    document.body.classList.toggle('sidebar-open', open);
    sidebarToggle?.setAttribute('aria-expanded', String(open));
}

sidebarToggle?.addEventListener('click', () => {
    setSidebarOpen(!document.body.classList.contains('sidebar-open'));
});

sidebarClose?.addEventListener('click', () => {
    setSidebarOpen(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        setSidebarOpen(false);
    }
});

function initializeSidebar() {
    const toggle = document.querySelector('.sidebar-toggle');
    const overlay = document.querySelector('[data-sidebar-close]');

    if (!toggle) return;

    function setOpen(open) {
        document.body.classList.toggle('sidebar-open', open);
        toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', () => {
        setOpen(!document.body.classList.contains('sidebar-open'));
    });

    overlay?.addEventListener('click', () => setOpen(false));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setOpen(false);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSidebar);
} else {
    initializeSidebar();
}

// warning allert auto-dismiss
function initializeTimedAlerts() {
    document.querySelectorAll('[data-auto-dismiss]').forEach((alert) => {
        if (alert.dataset.dismissInitialized) return;

        alert.dataset.dismissInitialized = 'true';

        setTimeout(() => {
            alert.classList.add('is-closing');

            setTimeout(() => {
                alert.remove();
            }, 250);
        }, 2500);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTimedAlerts);
} else {
    initializeTimedAlerts();
}
