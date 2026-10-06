(() => {
    document.addEventListener('DOMContentLoaded', () => {
        new DataTable('#studentRequirementTable', {
            "pageLength": 25,
            "responsive": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "paging": true,
            "language": {
                "emptyTable": "No subject records",
                "zeroRecords": "No matching records found"
            }
        });

        document.querySelectorAll('.file-upload-input').forEach(input => {
            input.onchange = () => {
                const id = input.dataset.id;
                const reader = new FileReader();
                reader.onload = function (event) {
                    document.getElementById(`fileUploadMessage${id}`).classList.add('d-none');
                    document.getElementById(`fileUploadPreview${id}`).classList.remove('d-none');
                    document.getElementById(`fileUploadPreview${id}`).src = event.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            };
        })

        document.querySelectorAll('.preview-uploaded-document-btn').forEach(btn => {
            btn.onclick = () => {
                const id = btn.dataset.id;

                const previewModal = new bootstrap.Modal(document.getElementById(
                    `previewUploadedModal${id}`), {
                    backdrop: false,
                    keyboard: false
                });

                const currentModal = btn.closest(".modal");
                if (currentModal) {
                    currentModal.style.zIndex = "1040";
                    previewModal.show();

                    const previewModalEl = document.getElementById(`previewUploadedModal${id}`);
                    previewModalEl.addEventListener("hidden.bs.modal", function () {
                        currentModal.style.zIndex = "";
                    }, {
                        once: true
                    });
                }
            };
        })

        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.onclick = () => {
                const id = btn.dataset.uploadedId;

                const rejectionMessageModal = new bootstrap.Modal(document.getElementById(
                    `rejectionMessageModal${id}`), {
                    backdrop: false,
                    keyboard: false
                });

                const currentModal = btn.closest(".modal");
                if (currentModal) {
                    currentModal.style.zIndex = "1040";
                    rejectionMessageModal.show();


                    const rejectionMessageModalEl = document.getElementById(`rejectionMessageModal${id}`);
                    rejectionMessageModalEl.addEventListener("hidden.bs.modal", function () {
                        currentModal.style.zIndex = "";
                    }, {
                        once: true
                    });
                }
            }
        });

        if (document.getElementById('searchStudentId').value) {
            setTimeout(() => {
                searchStudent();
            }, 100);
        }

        $('#collegeGradeLevel')
            .on('change', function () {
                setTimeout(function () {
                    filterTable();
                }, 100);
            });
    });

    function searchStudent() {
        const studentId = $('#searchStudentId').val();

        let visibleCount = 0;

        $('#studentRequirementTable tbody tr').each(function () {
            let show = true;
            const row = $(this);

            if (studentId && row.data('student-id') != studentId) {
                show = false;
            }

            if (show) {
                visibleCount++;
            }

            document.getElementById('dt-search-0').value = studentId;
            document.getElementById('dt-search-0').focus();
            window.location.hash = '#dt-search-0';

            row.toggle(show);
        });

        document.getElementById('dt-search-0').oninput = () => {
            $('#studentRequirementTable tbody tr').each(function () {
                $(this).toggle(true);
            });
        };

        // Update record count if you have a counter
        if ($('#recordCount').length) {
            $('#recordCount').text(visibleCount);
        }
    }

    function filterTable() {
        const college_grade_level_id = $('#collegeGradeLevel').val();

        let visibleCount = 0;

        $('#studentRequirementTable tbody tr').each(function () {
            let show = true;
            const row = $(this);

            if (college_grade_level_id && row.data('college-grade-level-id') != college_grade_level_id) {
                show = false;
            }

            if (show) {
                visibleCount++;
            }

            row.toggle(show);
        });

        if ($('#recordCount').length) {
            $('#recordCount').text(visibleCount);
        }
    }

    document.querySelectorAll('.btn-processing').forEach(btn => {
        btn.onclick = () => {
            setTimeout(() => {
                const spinner = document.createElement('span');
                spinner.className = "spinner-border ms-2";
                spinner.ariaHidden = "true";
                btn.disabled = true;
                btn.append(spinner);
            }, 100);
        }
    })
})();