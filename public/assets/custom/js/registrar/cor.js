document.addEventListener('DOMContentLoaded', () => {
    const table = new DataTable('#corTableId');

    function filterTable() {
        const filters = {
            school_year: $('#school_year').val(),
            semester: $('#semester').val()
        };

        let visibleCount = 0;

        $('#corTableId tbody tr').each(function () {
            let show = true;
            const row = $(this);

            if (filters.school_year && row.data('school-year') != filters.school_year) {
                show = false;
            }

            if (filters.semester && row.data('semester') != filters.semester) {
                show = false;
            }

            if (show) {
                visibleCount++;
            }

            row.toggle(show);
        });

        // Update record count if you have a counter
        if ($('#recordCount').length) {
            $('#recordCount').text(visibleCount);
        }
    }

    if (typeof $.fn.select2 !== 'undefined') {
        $('.select2').select2({
            placeholder: function () {
                return $(this).find('option:first-child').text();
            },
            allowClear: true,
            width: '100%'
        });
    }

    $('#school_year, #semester')
        .on('change', function () {
            setTimeout(function () {
                filterTable();
            }, 100);
        });

    $('#resetFilter').on('click', function () {
        $('#school_year').val(defaultValues.school_year);
        $('#semester').val(defaultValues.semester);

        if (typeof $.fn.select2 !== 'undefined') {
            $('.select2').trigger('change');
        }

        $('.badge-status').css({
            'color': '#007bff',
            'font-weight': 'bold'
        });

        setTimeout(function () {
            filterTable();
        }, 100);
    });

    function applyInitialFiltering() {
        // Check if any filters have pre-selected values
        const hasPreselectedFilters =
            $('#school_year').val() ||
            $('#semester').val();

        if (hasPreselectedFilters) {
            setTimeout(function () {
                filterTable();
            }, 200);
        }
    }

    applyInitialFiltering();
})