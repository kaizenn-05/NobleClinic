(() => {
    document.addEventListener('DOMContentLoaded', () => {
        new DataTable('#collegeTableId', {
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

        const select = document.querySelector('.doc-description-select');
        select.onclick = () => {
            let lastSearchInput;
            let lastIdInput;
            const element = document.createElement('li');
            element.role = "alert";
            element.ariaLive = "assertive";
            element.className = "select2-results__option select2-results__message";
            element.textContent = "No results found";

            const selectDataId = select.dataset.selectId;
            const selectEl = document.querySelector(`#${selectDataId}`);
            if (select.className.includes('select2-container--focus')) {
                select.classList.remove('select2-container--focus');
            } else {
                select.classList.add('select2-container--focus');
                isFocused = true;
            }
            if (document.querySelector(`.${selectDataId}-select-menu-container`).className.includes("select2-container--open")) {
                document.querySelector(`.${selectDataId}-select-menu-container`).classList.remove('select2-container--open');
            } else {
                document.querySelector(`.${selectDataId}-select-menu-container`).classList.add('select2-container--open');
            }

            document.querySelectorAll(`.select2-search__field`).forEach(input => {
                input.oninput = () => {
                    const id = input.dataset.activedescendant;
                    element.remove();

                    document.querySelectorAll(`#${id}-results .doc-description-select-result_option`).forEach(li => {
                        li.classList.add('d-none');
                    });

                    if (!input.value) {
                        document.querySelectorAll(`#${id}-results .doc-description-select-result_option`).forEach(li => {
                            li.classList.remove('d-none');
                        });
                    };

                    let result = false;

                    document.querySelectorAll(`#${id}-results .doc-description-select-result_option`).forEach(li => {
                        if (li.textContent.trim().toUpperCase().includes(input.value.trim().toUpperCase())) {
                            li.classList.remove('d-none');
                            result = true;
                        }
                    });

                    if (!result) {
                        document.querySelector(`#${id}-results`).append(element);
                    }

                    lastSearchInput = input;
                    lastIdInput = id;
                }

                input.onclick = () => {
                    setTimeout(() => {
                        document.querySelector(`.${selectDataId}-select-menu-container`).classList.add('select2-container--open');
                        document.querySelector('.select2-results__message').remove();
                    }, 100);
                }
            })

            function selectOption() {
                document.querySelectorAll(`#${selectDataId}-results .doc-description-select-result_option`).forEach(li => {
                    li.onclick = () => {
                        document.querySelectorAll(`#${selectDataId}-results .doc-description-select-result_option`).forEach(item => {
                            item.ariaSelected = false;
                        })
                        const options = Object.entries(selectEl.options);
                        options.forEach(option => {
                            if (option[1].textContent.trim() == li.querySelector('.description').textContent.trim()) {
                                selectEl.selectedIndex = option[0];
                                selectEl.dispatchEvent(new Event("change"));
                                li.ariaSelected = true;
                                const placeholder = document.querySelector(`#${selectDataId}Placeholder span`);
                                placeholder.textContent = option[1].textContent.trim();
                                placeholder.className = '';
                                document.querySelector(`.${selectDataId}-select-menu-container`)
                                    .classList.remove("select2-container--open");
                            }
                        })

                        lastSearchInput ? lastSearchInput.value = "" : "";
                        document.querySelectorAll(`#${lastIdInput}-results .doc-description-select-result_option`).forEach(li => {
                            li.classList.remove('d-none');
                        });

                        openDescription(selectEl);
                    }
                });
            }

            selectOption();

            document.querySelector('.select2-parent-container').onmouseleave = () => {
                document.removeEventListener('click', unFocusSelect, true);
                document.addEventListener('click', unFocusSelect, true);
            }

            document.querySelectorAll('.edit-doc-description-icon').forEach(icon => {
                icon.onclick = () => {
                    const id = icon.dataset.id;

                    const editDescription = new bootstrap.Modal(document.getElementById(
                        `editDescriptionModal${id}`), {
                        backdrop: false,
                        keyboard: false
                    });

                    const currentModal = icon.closest(".modal");
                    if (currentModal) {
                        currentModal.style.zIndex = "1040";
                        editDescription.show();

                        const editDescriptionEl = document.getElementById(`editDescriptionModal${id}`);
                        editDescriptionEl.addEventListener("hidden.bs.modal", function () {
                            currentModal.style.zIndex = "";
                        }, {
                            once: true
                        });
                    }
                }
            })

            document.querySelectorAll('.delete-doc-description-icon').forEach(icon => {
                icon.onclick = () => {
                    const id = icon.dataset.id;

                    SwalHelper.confirm("Are you sure you want to delete this document?", "Delete Document").then(async (response) => {
                        if (response.isDenied || response.isDismissed) return;

                        await fetch("/registrar/doc-requirements/delete-description", {
                            method: 'DELETE',
                            headers: {
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
                                    .getAttribute('content'),
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                description_id: id
                            }),
                        })
                            .then(response => response.json())
                            .then(response => {
                                if (response.success || response.status === 'success') {
    
                                    notyf.open({
                                        type: 'success',
                                        message: response.toast.message,
                                        duration: response.toast.duration,
                                        dismissible: response.toast.dismissible,
                                        ripple: response.toast.ripple,
                                        position: response.toast.possition
                                    });
    
                                    window.location.reload();
    
                                } else {
                                    notyf.open({
                                        type: 'error',
                                        message: response.toast.message,
                                        duration: response.toast.duration,
                                        dismissible: response.toast.dismissible,
                                        ripple: response.toast.ripple,
                                        position: response.toast.possition
                                    });
                                }
                            })
                            .catch(error => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Deletion Failed',
                                    text: 'You cannot delete description in used',
                                    timer: 2000,
                                    showConfirmButton: false,
                                    customClass: {
                                        container: 'swal2-container-high-z'
                                    },
                                    didOpen: () => {
                                        const swalContainer = document.querySelector(
                                            '.swal2-container');
                                        if (swalContainer) {
                                            swalContainer.style.zIndex = '9999';
                                        }
                                        const swalPopup = document.querySelector(
                                            '.swal2-popup');
                                        if (swalPopup) {
                                            swalPopup.style.zIndex = '10000';
                                        }
                                    }
                                });
                            })
                    });
                }
            })

            function unFocusSelect() {
                document.querySelector(`.${selectDataId}-select-menu-container`)
                    .classList.remove("select2-container--open");
                select.classList.remove('select2-container--focus');
                document.removeEventListener('click', unFocusSelect, true);
            }

            function openDescription(select) {
                const id = select.dataset.id;
                const selectedValue = select.value;
                const selected = select.selectedOptions[0]?.text;

                const curriculumModal = new bootstrap.Modal(document.getElementById(
                    `addDescriptionModal`), {
                    backdrop: false,
                    keyboard: false
                });

                if (!selectedValue || selectedValue != 'Add Curriculum') {
                    document.querySelectorAll('.add-subject-row').forEach(row => {
                        row.classList.remove('d-none')
                    });
                }

                document.querySelectorAll(`.subject-row`).forEach(row => {
                    if (row.dataset.curriculumId == selectedValue) {
                        row.classList.remove('d-none');
                    } else {
                        row.classList.add('d-none');
                    }
                });

                const currentModal = select.closest(".modal");
                if (currentModal && selected == 'Add Document') {
                    currentModal.style.zIndex = "1040";
                    curriculumModal.show();

                    const curriculumModalEl = document.getElementById(`addDescriptionModal`);
                    curriculumModalEl.addEventListener("hidden.bs.modal", function () {
                        currentModal.style.zIndex = "";

                        // Remove the value of the select
                        document.querySelectorAll(".open-curriculum-modal").forEach(
                            select => {
                                select.selectedIndex = 0;
                                select.dispatchEvent(new Event("change"));
                            });

                        // Remove all add subject buttons
                        document.querySelectorAll('.add-subject-row').forEach(row => {
                            row.classList.add('d-none')
                        });
                    }, {
                        once: true
                    });
                }
            }
        }

        document.querySelectorAll('.edit-doc-description-select').forEach(select => {
            select.onclick = () => {
                let lastSearchInput;
                let lastIdInput;
                const element = document.createElement('li');
                element.role = "alert";
                element.ariaLive = "assertive";
                element.className = "select2-results__option select2-results__message";
                element.textContent = "No results found";

                const selectDataId = select.dataset.selectId;
                const selectEl = document.querySelector(`#${selectDataId}`);
                if (select.className.includes('select2-container--focus')) {
                    select.classList.remove('select2-container--focus');
                } else {
                    select.classList.add('select2-container--focus');
                    isFocused = true;
                }
                if (document.querySelector(`.${selectDataId}-select-menu-container`).className.includes("select2-container--open")) {
                    document.querySelector(`.${selectDataId}-select-menu-container`).classList.remove('select2-container--open');
                } else {
                    document.querySelector(`.${selectDataId}-select-menu-container`).classList.add('select2-container--open');
                }

                document.querySelectorAll(`.select2-search__field`).forEach(input => {
                    input.oninput = () => {
                        const id = input.dataset.activedescendant;
                        element.remove();

                        document.querySelectorAll(`#${id}-results .doc-description-select-result_option`).forEach(li => {
                            li.classList.add('d-none');
                        });

                        if (!input.value) {
                            document.querySelectorAll(`#${id}-results .doc-description-select-result_option`).forEach(li => {
                                li.classList.remove('d-none');
                            });
                        };

                        let result = false;

                        document.querySelectorAll(`#${id}-results .doc-description-select-result_option`).forEach(li => {
                            if (li.textContent.trim().toUpperCase().includes(input.value.trim().toUpperCase())) {
                                li.classList.remove('d-none');
                                result = true;
                            }
                        });

                        if (!result) {
                            document.querySelector(`#${id}-results`).append(element);
                        }

                        lastSearchInput = input;
                        lastIdInput = id;
                    }

                    input.onclick = () => {
                        setTimeout(() => {
                            document.querySelector(`.${selectDataId}-select-menu-container`).classList.add('select2-container--open');
                            document.querySelector('.select2-results__message').remove();
                        }, 100);
                    }
                })

                function selectOption() {
                    document.querySelectorAll(`#${selectDataId}-results .doc-description-select-result_option`).forEach(li => {
                        li.onclick = () => {
                            document.querySelectorAll(`#${selectDataId}-results .doc-description-select-result_option`).forEach(item => {
                                item.ariaSelected = false;
                            })
                            const options = Object.entries(selectEl.options);
                            options.forEach(option => {
                                if (option[1].textContent.trim() == li.querySelector('.description').textContent.trim()) {
                                    selectEl.selectedIndex = option[0];
                                    selectEl.dispatchEvent(new Event("change"));
                                    li.ariaSelected = true;
                                    const placeholder = document.querySelector(`#${selectDataId}Placeholder span`);
                                    placeholder.textContent = option[1].textContent.trim();
                                    placeholder.className = '';
                                    document.querySelector(`.${selectDataId}-select-menu-container`)
                                        .classList.remove("select2-container--open");
                                }
                            })

                            lastSearchInput ? lastSearchInput.value = "" : "";
                            document.querySelectorAll(`#${lastIdInput}-results .doc-description-select-result_option`).forEach(li => {
                                li.classList.remove('d-none');
                            });

                            openDescription(selectEl);
                        }
                    });
                }

                selectOption();

                document.querySelectorAll('.edit-select2-parent-container').forEach(el => {
                    el.onmouseleave = () => {
                        document.removeEventListener('click', unFocusSelect, true);
                        document.addEventListener('click', unFocusSelect, true);
                    }
                })

                document.querySelectorAll('.edit-doc-description-icon').forEach(icon => {
                    icon.onclick = () => {
                        const id = icon.dataset.id;

                        const editDescription = new bootstrap.Modal(document.getElementById(
                            `editDescriptionModal${id}`), {
                            backdrop: false,
                            keyboard: false
                        });

                        const currentModal = icon.closest(".modal");
                        if (currentModal) {
                            currentModal.style.zIndex = "1040";
                            editDescription.show();

                            const editDescriptionEl = document.getElementById(`editDescriptionModal${id}`);
                            editDescriptionEl.addEventListener("hidden.bs.modal", function () {
                                currentModal.style.zIndex = "";
                            }, {
                                once: true
                            });
                        }
                    }
                })

                document.querySelectorAll('.delete-doc-description-icon').forEach(icon => {
                    icon.onclick = () => {
                        const id = icon.dataset.id;

                        fetch("/registrar/doc-requirements/delete-description", {
                            method: 'DELETE',
                            headers: {
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
                                    .getAttribute('content'),
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                description_id: id
                            }),
                        })
                            .then(response => response.json())
                            .then(response => {
                                if (response.success || response.status === 'success') {

                                    notyf.open({
                                        type: 'success',
                                        message: response.toast.message,
                                        duration: response.toast.duration,
                                        dismissible: response.toast.dismissible,
                                        ripple: response.toast.ripple,
                                        position: response.toast.possition
                                    });

                                    window.location.reload();

                                } else {
                                    throw new Error(data.message || 'Deletion failed');
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Failed to add',
                                    text: error.message || 'Something went wrong!',
                                    timer: 2000,
                                    showConfirmButton: false,
                                    customClass: {
                                        container: 'swal2-container-high-z'
                                    },
                                    didOpen: () => {
                                        const swalContainer = document.querySelector(
                                            '.swal2-container');
                                        if (swalContainer) {
                                            swalContainer.style.zIndex = '9999';
                                        }
                                        const swalPopup = document.querySelector(
                                            '.swal2-popup');
                                        if (swalPopup) {
                                            swalPopup.style.zIndex = '10000';
                                        }
                                    }
                                });
                            })
                    }
                })

                function unFocusSelect() {
                    document.querySelector(`.${selectDataId}-select-menu-container`)
                        .classList.remove("select2-container--open");
                    select.classList.remove('select2-container--focus');
                    document.removeEventListener('click', unFocusSelect, true);
                }

                function openDescription(select) {
                    const id = select.dataset.id;
                    const selectedValue = select.value;
                    const selected = select.selectedOptions[0]?.text;

                    const curriculumModal = new bootstrap.Modal(document.getElementById(
                        `addDescriptionModal`), {
                        backdrop: false,
                        keyboard: false
                    });

                    if (!selectedValue || selectedValue != 'Add Curriculum') {
                        document.querySelectorAll('.add-subject-row').forEach(row => {
                            row.classList.remove('d-none')
                        });
                    }

                    document.querySelectorAll(`.subject-row`).forEach(row => {
                        if (row.dataset.curriculumId == selectedValue) {
                            row.classList.remove('d-none');
                        } else {
                            row.classList.add('d-none');
                        }
                    });

                    const currentModal = select.closest(".modal");
                    if (currentModal && selected == 'Add Document') {
                        currentModal.style.zIndex = "1040";
                        curriculumModal.show();

                        const curriculumModalEl = document.getElementById(`addDescriptionModal`);
                        curriculumModalEl.addEventListener("hidden.bs.modal", function () {
                            currentModal.style.zIndex = "";

                            // Remove the value of the select
                            document.querySelectorAll(".open-curriculum-modal").forEach(
                                select => {
                                    select.selectedIndex = 0;
                                    select.dispatchEvent(new Event("change"));
                                });

                            // Remove all add subject buttons
                            document.querySelectorAll('.add-subject-row').forEach(row => {
                                row.classList.add('d-none')
                            });
                        }, {
                            once: true
                        });
                    }
                }
            }
        })

        if (typeof $.fn.select2 !== 'undefined') {
            $('.select2').select2({
                placeholder: function () {
                    return $(this).find('option:first-child').text();
                },
                allowClear: true,
                width: '100%'
            });
        }

        $('#collegeGradeLevel')
            .on('change', function () {
                setTimeout(function () {
                    filterTable();
                }, 100);
            });

        applyInitialFiltering();

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

        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.onclick = () => {
                const id = btn.dataset.id;
                const copyModal = new bootstrap.Modal(document.getElementById(
                    `copyRequirementModal${id}`), {
                    backdrop: false,
                    keyboard: false
                });

                const currentModal = btn.closest(".modal");
                if (currentModal) {
                    currentModal.style.zIndex = "1040";
                    copyModal.show();

                    const copyModalEl = document.getElementById(`copyRequirementModal${id}`);
                    copyModalEl.addEventListener("hidden.bs.modal", function () {
                        currentModal.style.zIndex = "";
                    }, {
                        once: true
                    });
                }
            }
        });

    })

    function applyInitialFiltering() {
        const hasPreselectedFilters =
            $('#collegeGradeLevel').val()

        if (hasPreselectedFilters) {
            setTimeout(function () {
                filterTable();
            }, 100);
        } else {
            $('#collegeTableId tbody tr').each(function () {
                const row = $(this);
                row.toggle(false);
            });
        }
    }

    async function filterTable() {
        const college_grade_level = $('#collegeGradeLevel').val();

        let visibleCount = 0;
        let totalRequired = 0;
        let totalActive = 0;

        $('#collegeTableId tbody tr').each(function () {
            let show = true;
            const row = $(this);

            document.getElementById('copyAllRequirementBtn').disabled = false;

            if (college_grade_level && row.data('college-grade-level') != college_grade_level) {
                show = false;
            }

            if (row.data('college-grade-level') == college_grade_level && row.data('required') == '1') {
                totalRequired++;
            }

            if (row.data('college-grade-level') == college_grade_level && row.data('active') == '1') {
                totalActive++;
            }

            if (show) {
                visibleCount++;
            }

            document.querySelector('.filter-required').textContent = totalRequired;
            document.querySelector('.filter-active').textContent = totalActive;

            row.toggle(show);
        });

        try {
            await fetch('/registrar/doc-requirements/get-related-requirements', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
                        .getAttribute('content'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    college_grade_level_id: college_grade_level
                }),
            }).then(response => response.json())
                .then(response => {
                    let copyTableListHtml = '';
                    if (response.success) {

                        response.doc_requirements.forEach(requirement => {
                            if (requirement.college_grade_level_id == college_grade_level) {
                                const doc_description = response.doc_descriptions.find(doc_description => doc_description.id === requirement.doc_description_id);
                                copyTableListHtml += `
                                        <tr>
                                            <td class="border p-2">
                                                <input type="hidden" name="doc_requirement_id[]" value="${requirement.id}" />
                                                ${doc_description.description}
                                            </td>
                                            <td class="border p-2">
                                                ${requirement.student_type}
                                            </td>
                                            <td class="border p-2">
                                                <span
                                                    class="btn btn-sm rounded-circle p-0 m-0 btn-${requirement.is_required ? 'success' : 'danger'}">
                                                    <span
                                                        class="icon-base bx bx-${requirement.is_required ? 'check' : 'x'} icon-sm"></span>
                                                </span>
                                            </td>
                                            <td class="border p-2">
                                                <span
                                                    class="btn btn-sm rounded-circle p-0 m-0 btn-${requirement.is_active ? 'success' : 'danger'}">
                                                    <span
                                                        class="icon-base bx bx-${requirement.is_active ? 'check' : 'x'} icon-sm"></span>
                                                </span>
                                            </td>
                                        </tr>
                                    `;
                            }
                        });

                        document.getElementById('copyTableList').innerHTML = copyTableListHtml;

                        const options = document.getElementById(`copyAllRequirementsSelect`).options;
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].value != college_grade_level) {
                                options[i].selected = true;
                            } else {
                                options[i].selected = false;
                            }
                            document.getElementById(`copyAllRequirementsSelect`).dispatchEvent(new Event("change"));
                        }
                    }
                })
        } catch (error) {
            console.log('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to add',
                text: error.message || 'Something went wrong!',
                timer: 2000,
                showConfirmButton: false,
                customClass: {
                    container: 'swal2-container-high-z'
                },
                didOpen: () => {
                    const swalContainer = document.querySelector(
                        '.swal2-container');
                    if (swalContainer) {
                        swalContainer.style.zIndex = '9999';
                    }
                    const swalPopup = document.querySelector(
                        '.swal2-popup');
                    if (swalPopup) {
                        swalPopup.style.zIndex = '10000';
                    }
                }
            });
        }

        if (!college_grade_level) {
            $('#collegeTableId tbody tr').each(function () {
                const row = $(this);
                row.toggle(false);
            });
            document.getElementById('copyAllRequirementBtn').disabled = true;
        }

        // Update record count if you have a counter
        if ($('#recordCount').length) {
            $('#recordCount').text(visibleCount);
        }
    }
})()