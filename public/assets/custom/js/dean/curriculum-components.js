(() => {
    document.addEventListener('change', function (e) {
        const input = e.target;
        if (!input.classList.contains('is_active')) return;

        const componentId = input.dataset.isactiveId;

        document.querySelector('#page-block-spinner').style.display = 'flex';

        fetch(`/dean/curriculum-setup/${componentId}/toggle-status`, {
            method: 'PATCH',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute(
                    'content'),
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({})
        })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) throw data;
                return data;
            })
            .then(data => {
                const badge = document.getElementById(`status-badge-${componentId}`);
                if (badge) {
                    const isActive = input.checked;
                    badge.textContent = isActive ? 'ACTIVE' : 'INACTIVE';
                    badge.classList.remove('bg-label-success', 'bg-label-danger');
                    badge.classList.add(isActive ? 'bg-label-success' : 'bg-label-danger');
                }

                SwalHelper.success(`Component ${data.message}`, data.message);
            })
            .catch(error => {
                console.error('Error:', error);

                // Revert checkbox state on error
                input.checked = !input.checked;

                SwalHelper.error(error.message || 'Something went wrong!', "500");
            })
            .finally(() => {
                document.querySelector('#page-block-spinner').style.display = 'none';
            });
    });

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.needs-delete-confirmation').forEach(btn => {
            btn.onclick = () => {
                let curriculumComponentName = btn.dataset.componentName;
                SwalHelper.confirm(`Are you sure you want to delete ${curriculumComponentName}?`, 'Delete Component').then((result) => {
                    if (!result.isConfirmed) return;
                    let form = document.getElementById(`delete-curriculum-component-${btn.dataset.deleteConfirmationId}`);

                    form.submit();
                });
            }
        });
    });
})();