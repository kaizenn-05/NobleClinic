document.addEventListener("DOMContentLoaded", async function () {
    let curriculumId;
    let latestSelectFilter;

    // Add Subject Checkboxes
    function renderCheckBoxes() {
        document.querySelectorAll('.courses-checkbox').forEach(input => {
            input.onchange = function () {

                const programId = this.dataset.programId;
                const courseId = this.value;
                const yearLevelId = this.dataset.yearLevelId || sessionStorage.getItem('current_year_level_id');
                const semesterId = this.dataset.semesterId || sessionStorage.getItem('current_semester_id');
                const curriculumId = this.dataset.curriculumId || sessionStorage.getItem('current_curriculum_id');
                document.querySelector(`div[data-course-loading-id="${programId}"]`).classList.remove('d-none')

                const setup = {
                    url: '/dean/prospectus/store-prospectus',
                    method: 'POST',
                    data: {
                        program_id: programId,
                        course_id: courseId,
                        year_level: yearLevelId,
                        semester_id: semesterId,
                        curriculum_id: curriculumId
                    },
                    message: {
                        icon: 'success',
                        title: 'Added!',
                        text: 'Course added successfully!',
                        timer: 1000,
                        showConfirmButton: false,
                        customClass: {
                            container: 'swal2-container-high-z'
                        }
                    }
                }
                API(setup, null, programId);

            }

            document.querySelectorAll('.form-check-label').forEach(label => {
                label.onclick = () => {
                    label.classList.add('d-none');
                }
            });
        });
    }

    renderCheckBoxes();

    function renderTableRow(loadingId) {
        fetch(`/dean/prospectus/getAllData`)
            .then(response => response.json())
            .then(data => {
                const responseData = data.responseData;
                document.querySelectorAll('.selectable-row').forEach(row => {
                    const programId = row.dataset.id;
                    responseData.year_levels.forEach(year_level => {
                        responseData.semesters.forEach(semester => {
                            const tbody = document.querySelector(`.prospectusTBody${programId}${year_level.id}${semester.id}`);
                            let tableBodyHTML = '';
                            responseData.prospectus.forEach(data => {
                                const course = responseData.courses.filter(course => course.id == data.course_id);
                                const prerequisite = responseData.courses.filter(course => course.id == data.prerequisite_id);
                                if (data.year_level_id == year_level.id && data.semester_id == semester.id && data.program_id == programId) {
                                    tableBodyHTML += `
                                        <tr class="subject-row"
                                            data-curriculum-id="${data.curriculum_id}">
                                            <td>${data.sort || '<span class="d-none">Z</span>'}</td>
                                            <td>${course[0].code}</td>
                                            <td>${course[0].description}</td>
                                            <td>${data.prerequisite_id ? prerequisite[0].description : ''}</td>
                                            <td>${course[0].lecture_unit}</td>
                                            <td>${course[0].laboratory_unit}</td>
                                            <td>
                                                <span class="d-flex h-100">
                                                    <button type="button"
                                                        class="open-subject-form-modal btn p-0 text-primary"><i
                                                            class="icon-base bx bx-edit"
                                                            data-program-id="${programId}"
                                                            data-id="${data.id}"
                                                            data-course-id="${course[0].id}"
                                                            data-code="${course[0].code}"
                                                            data-description="${course[0].description}"
                                                            data-lecture-unit="${course[0].lecture_unit}"
                                                            data-laboratory-unit="${course[0].laboratory_unit}"
                                                            data-sort="${data.sort || ''}"
                                                            data-prerequisite-id="${data.prerequisite_id}"
                                                            ></i></button>
                                                    <button type="button" data-program-id="${programId}"
                                                            data-id="${data.id}"
                                                            data-loading-id="${semester.id}${year_level.id}${programId}"
                                                        class="delete-prospectus-item btn text-danger p-0 ms-2"><i
                                                            class="icon-base bx bx-trash"
                                                            ></i></button>
                                                </span>
                                            </td>
                                            <td></td>
                                        </tr>
                                    `;
                                }
                            });

                            tbody.innerHTML = tableBodyHTML;
                        });
                    });
                })

                document.querySelectorAll(`.subject-row`).forEach(row => {
                    if (row.dataset.curriculumId == curriculumId) {
                        row.classList.remove('d-none');
                    } else {
                        row.classList.add('d-none');
                    }
                });

                calculateUnits(curriculumId);
                renderEditFormBtn();
                if (loadingId) {
                    document.querySelector(`div[data-loading-id="${loadingId}"]`).classList.add('d-none')
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })

    }

    function updateSubjectTable(courseLoadingId) {
        fetch(`/dean/prospectus/getAllData`)
            .then(response => response.json())
            .then(data => {
                const responseData = data.responseData;
                const personnels = Object.entries(responseData.personnels);
                document.querySelectorAll('.selectable-row').forEach(row => {
                    const program = responseData.programs.filter(program => program.id == row.dataset.id);

                    $(`#subject${program[0].id}`).DataTable().clear().destroy();

                    let tableBodyHTML = '';

                    responseData.courses.forEach(data => {
                        const subjectGroup = responseData.programs.find(program => program.id == data.subject_group_id);
                        personnels.forEach(personnel => {
                            if (personnel[1].department_id == subjectGroup.department_id) {
                                const courseAdded = responseData.prospectus.filter(pros => pros.course_id == data.id && pros.program_id == program[0].id && pros.curriculum_id == curriculumId);
                                let year_level;
                                let semester;
                                if (courseAdded[0]) {
                                    year_level = responseData.year_levels.filter(yearLevel => yearLevel.id == courseAdded[0].year_level_id);
                                    semester = responseData.semesters.filter(semester => semester.id == courseAdded[0].semester_id);
                                }

                                let prospectusCourseIds = [];

                                responseData.prospectus.forEach(item => {
                                    prospectusCourseIds.push(item.course_id);
                                });

                                const programSubjectGroup = responseData.programs.filter(program => program.id == data.subject_group_id);

                                tableBodyHTML += `
                                <tr data-subject-group-id="${data.subject_group_id}" data-program-id="${program[0].id}">
                                    <td>
                                        <div class="fs-tiny">
                                            <span class="badge text-bg-${data.subject_type == "MAJOR" ? 'primary' : 'success'}">${data.subject_type}</span>
                                        </div>
                                    </td>
                                    <td>${year_level ? year_level[0].grade_level.replace('_', ' ').toUpperCase() : ''}</td>
                                    <td>${semester ? semester[0].semesters_name.replace('_', ' ').toUpperCase() : ''}</td>
                                    <td>${data.code}</td>
                                    <td>${data.description}</td>
                                    <td>${programSubjectGroup[0]?.program_abbreviation}</td>
                                    <td>${data.lecture_unit}</td>
                                    <td>${data.laboratory_unit ?? 0.0}</td>
                                    <td>
                                        <span class="d-flex h-100">
                                            <button type="button"
                                                    data-program-id="${program[0].id}"
                                                    data-id="${data.id}"
                                                    data-code="${data.code}"
                                                    data-description="${data.description}"
                                                    data-subject-type="${data.subject_type}"
                                                    data-lecture-unit="${data.lecture_unit}"
                                                    data-laboratory-unit="${data.laboratory_unit}"
                                                    data-subject-group-id="${data.subject_group_id}"
                                                    data-curriculum-component-id="${data.curriculum_component_id}"
                                                class="open-edit-course-modal btn p-0 text-primary me-3"><i
                                                    class="icon-base bx bx-edit"
                                                    ></i></button>
                                            <label
                                                class="form-check-label bg-primary rounded ${prospectusCourseIds.includes(data.id) && courseAdded[0]?.program_id == program[0].id ? 'd-none' : ''}"
                                                for="course_${data.id}_${program[0].id}">
                                                <input class="form-check-input courses-checkbox d-none"
                                                    type="checkbox" data-program-id="${program[0].id}"
                                                    data-year-level-id="${sessionStorage.getItem('current_year_level_id')}" data-semester-id="${sessionStorage.getItem('current_semester_id')}"
                                                    data-course-loading-id="${program[0].id}"
                                                    data-curriculum-id="${sessionStorage.getItem('current_curriculum_id')}" name="course_${program[0].id}[]"
                                                    value="${data.id}"
                                                    id="course_${data.id}_${program[0].id}"
                                                    ${prospectusCourseIds.includes(data.id) && courseAdded[0]?.program_id == program[0].id ? 'checked' : ''}>
                                                <i class="icon-base bx bx-plus text-white"></i>
                                            </label>
                                        </span>
                                    </td>
                                </tr>
                            `;
                            }
                        });
                    });

                    document.getElementById(`add_subject_tbody_${program[0].id}`).innerHTML = tableBodyHTML;

                    new DataTable(`#subject${program[0].id}`, {
                        "pageLength": 25,
                        "responsive": true,
                        "searching": true,
                        "ordering": false,
                        "info": false,
                        "paging": true,
                        "language": {
                            "emptyTable": "No records available",
                            "zeroRecords": "No matching records found"
                        }
                    })

                    if (courseLoadingId) {
                        document.querySelector(`div[data-course-loading-id="${courseLoadingId}"]`).classList.add('d-none');
                    }

                    document.querySelectorAll(`.subject-row`).forEach(row => {
                        if (row.dataset.curriculumId == curriculumId) {
                            row.classList.remove('d-none');
                        } else {
                            row.classList.add('d-none');
                        }
                    });

                    latestSelectFilter ? filterTable(latestSelectFilter.id, latestSelectFilter.dataset.programId) : '';

                    document.querySelectorAll(".open-edit-course-modal").forEach(btn => {
                        btn.onclick = function () {
                            const programId = btn.dataset.programId;
                            const id = btn.dataset.id;
                            const code = btn.dataset.code;
                            const description = btn.dataset.description;
                            const subjectType = btn.dataset.subjectType;
                            const lectureUnit = btn.dataset.lectureUnit;
                            const laboratoryUnit = btn.dataset.laboratoryUnit;
                            const subjectGroupId = btn.dataset.subjectGroupId;
                            const curriculumComponentId = btn.dataset.curriculumComponentId;
                            const subjectTypeOptions = document.getElementById(`editSubjectType`).options;
                            const subjectGroupOptions = document.getElementById(`editSubjectGroupId`).options;
                            const curriculumComponentOptions = document.getElementById(`editCurriculumComponentId`).options;
                            const editSubjectType = document.getElementById('editSubjectType');
                            const subjectLaboratoryUnit = document.getElementById('editSubjectLaboratoryUnit');
                            const fields = [
                                "editSubjectDescription",
                                "editSubjectCode",
                                "editSubjectType",
                                "editSubjectLectureUnit",
                                "editSubjectGroupId",
                                "editCurriculumComponentId"
                            ];

                            const subjectFormModal = new bootstrap.Modal(document.getElementById(
                                `editSubjectModal`), {
                                backdrop: false,
                                keyboard: false
                            });

                            const currentModal = this.closest(".modal");
                            if (currentModal) {
                                currentModal.style.zIndex = "1040";
                                subjectFormModal.show();

                                document.getElementById(`editCourseId`).value = id;
                                document.getElementById(`editSubjectDescription`).value = description;
                                document.getElementById(`editSubjectCode`).value = code;
                                document.getElementById(`editSubjectLectureUnit`).value = lectureUnit;
                                document.getElementById(`editSubjectLaboratoryUnit`).value = laboratoryUnit;
                                for (let i = 0; i < subjectTypeOptions.length; i++) {
                                    if (subjectTypeOptions[i].value == subjectType) {
                                        document.getElementById(`editSubjectType`).selectedIndex = i;
                                        document.getElementById(`editSubjectType`).dispatchEvent(new Event("change"));
                                    }
                                }
                                for (let j = 0; j < subjectGroupOptions.length; j++) {
                                    if (subjectGroupOptions[j].value == subjectGroupId) {
                                        document.getElementById(`editSubjectGroupId`).selectedIndex = j;
                                        document.getElementById(`editSubjectGroupId`).dispatchEvent(new Event("change"));
                                    }
                                }
                                for (let j = 0; j < curriculumComponentOptions.length; j++) {
                                    if (curriculumComponentOptions[j].value == subjectGroupId) {
                                        document.getElementById(`editCurriculumComponentId`).selectedIndex = j;
                                        document.getElementById(`editCurriculumComponentId`).dispatchEvent(new Event("change"));
                                    }
                                }

                                subjectLaboratoryUnit.classList.remove('is-invalid');
                                document.querySelector('.laboratory-unit-invalid-container-2').innerHTML = '';

                                document.getElementById('updateCourseBtn').onclick = () => {
                                    let abort = false;

                                    fields.forEach(id => {
                                        const input = document.getElementById(id);

                                        if (input.value == "" || !input.value) {
                                            abort = true;
                                        }
                                    })

                                    if (abort) return;

                                    const setup = {
                                        url: '/dean/prospectus/update-course-info',
                                        method: 'POST',
                                        data: {
                                            course_id: document.getElementById('editCourseId').value,
                                            description: document.getElementById('editSubjectDescription').value,
                                            code: document.getElementById('editSubjectCode').value,
                                            subject_type: document.getElementById('editSubjectType').value,
                                            lecture_unit: document.getElementById('editSubjectLectureUnit').value,
                                            laboratory_unit: document.getElementById('editSubjectLaboratoryUnit').value ?? 0.0,
                                            subject_group_id: document.getElementById('editSubjectGroupId').value,
                                        },
                                        message: {
                                            icon: 'success',
                                            title: 'Updated!',
                                            text: 'Course updated successfully!',
                                            timer: 1000,
                                            showConfirmButton: false,
                                            customClass: {
                                                container: 'swal2-container-high-z'
                                            }
                                        }
                                    }
                                    API(setup);

                                    const editSubjectModalEl = document.getElementById(
                                        `editSubjectModal`);
                                    const modal = bootstrap.Modal.getInstance(editSubjectModalEl);
                                    modal.hide();
                                }

                                const subjectFormModalEl = document.getElementById(
                                    `editSubjectModal`);
                                subjectFormModalEl.addEventListener("hidden.bs.modal", function () {
                                    currentModal.style.zIndex = "";

                                    document.getElementById('editSubjectDescription').classList.remove('is-invalid');
                                    document.getElementById('editSubjectCode').classList.remove('is-invalid');
                                    document.getElementById('editSubjectType').classList.remove('is-invalid');
                                    document.getElementById('editSubjectLectureUnit').classList.remove('is-invalid');
                                    document.getElementById('editSubjectLaboratoryUnit').classList.remove('is-invalid');
                                    document.getElementById('editSubjectGroupId').classList.remove('is-invalid');

                                    document.querySelectorAll('.fv-plugins-message-container div').forEach(div => div.innerHTML = '');
                                }, {
                                    once: true
                                });
                            }
                        }
                    });

                    calculateUnits(curriculumId);
                    renderCheckBoxes();

                })
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

    // Subject Modal
    function renderSubjectModalBtn() {
        document.querySelectorAll(".open-subject-modal").forEach(btn => {
            btn.onclick = function () {
                const id = btn.dataset.id;
                const level = btn.dataset.level;
                const yearLevelId = btn.dataset.levelId;
                const semester = btn.dataset.semester;
                const semesterId = btn.dataset.semesterId;
                const curriculum = btn.dataset.curriculum;
                const curriculumId = btn.dataset.curriculumId;

                sessionStorage.setItem('current_year_level_id', yearLevelId);
                sessionStorage.setItem('current_semester_id', semesterId);
                sessionStorage.setItem('current_curriculum_id', curriculumId);

                const subjectModal = new bootstrap.Modal(document.getElementById(
                    `subjectModal${id}`), {
                    backdrop: false,
                    keyboard: false
                });

                const currentModal = this.closest(".modal");
                if (currentModal) {
                    currentModal.style.zIndex = "1040";
                    subjectModal.show();

                    document.getElementById(`yearLevelDisplay${id}`).textContent = level.toUpperCase();
                    document.getElementById(`semesterDisplay${id}`).textContent = semester.toUpperCase();
                    document.getElementById(`curriculumDisplay${id}`).textContent =
                        curriculum;

                    document.querySelectorAll('.courses-checkbox').forEach(input => {
                        input.dataset.yearLevelId = yearLevelId;
                        input.dataset.semesterId = semesterId;
                        input.dataset.curriculumId = curriculumId;
                    })

                    const subjectTable = new DataTable(`#subject${id}`);

                    const subjectModalEl = document.getElementById(`subjectModal${id}`);
                    subjectModalEl.addEventListener("hidden.bs.modal", function () {
                        currentModal.style.zIndex = "";
                    }, {
                        once: true
                    });
                }
            }
        });

        const subjectType = document.getElementById('addSubjectType');
        const subjectLaboratoryUnit = document.getElementById('addSubjectLaboratoryUnit');

        const fields = [
            "addSubjectDescription",
            "addSubjectCode",
            "addSubjectType",
            "addSubjectLectureUnit",
            "addSubjectGroupId",
            "addCurriculumComponent"
        ]

        document.getElementById('addNewCourseBtn').onclick = () => {
            let abort = false;

            fields.forEach(id => {
                const input = document.getElementById(id);

                if (input.value == "" || !input.value) {
                    abort = true;
                }
            })

            if (abort) return;

            const setup = {
                url: '/dean/prospectus/store-subject',
                method: 'POST',
                data: {
                    description: document.getElementById('addSubjectDescription').value,
                    code: document.getElementById('addSubjectCode').value,
                    subject_type: document.getElementById('addSubjectType').value,
                    lecture_unit: document.getElementById('addSubjectLectureUnit').value,
                    laboratory_unit: document.getElementById('addSubjectLaboratoryUnit').value ?? 0.0,
                    subject_group_id: document.getElementById('addSubjectGroupId').value,
                    curriculum_component_id: document.getElementById('addCurriculumComponent').value
                },
                message: {
                    icon: 'success',
                    title: 'Added!',
                    text: 'Course added successfully!',
                    timer: 1000,
                    showConfirmButton: false,
                    customClass: {
                        container: 'swal2-container-high-z'
                    }
                }
            }
            API(setup);

            const addSubjectModalEl = document.getElementById(
                `addSubjectModal`);
            const modal = bootstrap.Modal.getInstance(addSubjectModalEl);
            modal.hide();

            document.getElementById('addSubjectDescription').value = '';
            document.getElementById('addSubjectCode').value = '';
            document.getElementById('addSubjectType').selectedIndex = 0;
            document.getElementById('addSubjectType').dispatchEvent(new Event("change"));
            document.getElementById('addSubjectLectureUnit').value = '';
            document.getElementById('addSubjectLaboratoryUnit').value = '';
            document.getElementById('addSubjectGroupId').selectedIndex = 0;
            document.getElementById('addSubjectGroupId').dispatchEvent(new Event("change"));
        }
    }

    renderSubjectModalBtn();

    // Add Subject Modal
    function renderSubjectModal() {
        document.querySelectorAll(".open-add-subject-modal").forEach(btn => {
            btn.onclick = function () {
                const addSubjectModal = new bootstrap.Modal(document.getElementById(
                    `addSubjectModal`), {
                    backdrop: false,
                    keyboard: false
                });

                document.getElementById('addSubjectDescription').classList.remove('is-invalid');
                document.getElementById('addSubjectCode').classList.remove('is-invalid');
                document.getElementById('addSubjectType').classList.remove('is-invalid');
                document.getElementById('addSubjectLectureUnit').classList.remove('is-invalid');
                document.getElementById('addSubjectLaboratoryUnit').classList.remove('is-invalid');
                document.getElementById('addSubjectGroupId').classList.remove('is-invalid');

                document.querySelectorAll('.fv-plugins-message-container div').forEach(div => div.innerHTML = '');

                const previousModal = this.closest(".modal");
                if (previousModal) {
                    previousModal.style.zIndex = "1040";
                    addSubjectModal.show();

                    const addSubjectModalEl = document.getElementById(
                        `addSubjectModal`);
                    addSubjectModalEl.addEventListener("hidden.bs.modal", function () {
                        previousModal.style.zIndex = "";
                    }, {
                        once: true
                    });
                }
            }
        });
    }

    renderSubjectModal();

    // Subject Form Modal
    function renderEditFormBtn() {
        fetch(`/dean/prospectus/getAllData`)
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll(".open-subject-form-modal").forEach(btn => {
                    btn.onclick = function (e) {
                        const programId = e.target.dataset.programId;
                        const id = e.target.dataset.id;
                        const courseId = e.target.dataset.courseId;
                        const code = e.target.dataset.code;
                        const description = e.target.dataset.description;
                        const lectureUnit = e.target.dataset.lectureUnit;
                        const laboratoryUnit = e.target.dataset.laboratoryUnit;
                        const sort = e.target.dataset.sort;
                        const prerequisiteId = e.target.dataset.prerequisiteId ?? parseInt(e.target.dataset.prerequisiteId);

                        const subjectFormModal = new bootstrap.Modal(document.getElementById(
                            `subjectFormModal`), {
                            backdrop: false,
                            keyboard: false
                        });

                        const currentModal = this.closest(".modal");
                        if (currentModal) {
                            currentModal.style.zIndex = "1040";
                            subjectFormModal.show();

                            let prerequisiteHTML = '<option value="">--- Select Subject Group ---</option>';
                            data.responseData.courses.forEach(course => {
                                if (course.id != courseId) {
                                    prerequisiteHTML += `
                                        <option value="${course.id}">${course.description}</option>
                                    `;
                                }
                            })
                            document.getElementById(`formPrerequisite`).innerHTML = prerequisiteHTML;

                            const options = document.getElementById(`formPrerequisite`).options;
                            for (let i = 0; i < options.length; i++) {
                                if (options[i].value == prerequisiteId) {
                                    document.getElementById(`formPrerequisite`).selectedIndex = i;
                                    document.getElementById(`formPrerequisite`).dispatchEvent(new Event("change"));
                                }
                            }

                            document.getElementById(`formProgramId`).value = programId;
                            document.getElementById(`formProspectusId`).value = id;
                            document.getElementById(`formDescription`).value = description;
                            document.getElementById(`formCode`).value = code;
                            document.getElementById(`formLectureUnit`).value = lectureUnit;
                            document.getElementById(`formLaboratoryUnit`).value = laboratoryUnit;
                            document.getElementById(`formSort`).value = sort || '';


                            const subjectFormModalEl = document.getElementById(
                                `subjectFormModal`);
                            subjectFormModalEl.addEventListener("hidden.bs.modal", function () {
                                currentModal.style.zIndex = "";
                                document.getElementById(`formPrerequisite`).selectedIndex = 0;
                                document.getElementById(`formPrerequisite`).dispatchEvent(new Event("change"));
                            }, {
                                once: true
                            });
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Error:', error);
            })

        document.querySelectorAll(".delete-prospectus-item").forEach(btn => {
            btn.onclick = function () {
                document.querySelector(`div[data-loading-id="${btn.dataset.loadingId}"]`).classList.remove('d-none')

                const programId = btn.dataset.programId;
                const id = btn.dataset.id;

                const setup = {
                    url: '/dean/prospectus/delete-prospectus',
                    method: 'POST',
                    data: {
                        program_id: programId,
                        prospectus_id: id
                    },
                    message: {
                        icon: 'success',
                        title: 'Removed!',
                        text: 'Course removed successfully!',
                        timer: 1000,
                        showConfirmButton: false,
                        customClass: {
                            container: 'swal2-container-high-z'
                        }
                    }
                }
                API(setup, btn.dataset.loadingId);
            }
        });
    }

    renderEditFormBtn();

    document.getElementById('updateProspectusForm').onclick = () => {
        const id = document.getElementById(`formProspectusId`).value;
        const sortValue = document.getElementById(`formSort`).value || null;
        const prerequisiteValue = document.getElementById(`formPrerequisite`).value;

        const setup = {
            url: '/dean/prospectus/update-prospectus',
            method: 'POST',
            data: {
                prospectus_id: id,
                sort: sortValue,
                prerequisite_id: prerequisiteValue
            },
            message: {
                icon: 'success',
                title: 'Updated!',
                text: 'Course updated successfully!',
                timer: 1000,
                showConfirmButton: false,
                customClass: {
                    container: 'swal2-container-high-z'
                }
            }
        }
        API(setup);

        const subjectFormModalEl = document.getElementById(
            `subjectFormModal`);
        const modal = bootstrap.Modal.getInstance(subjectFormModalEl);
        modal.hide();
    }

    function renderProspectusModal() {
        // Prospectus Modal
        const table = new DataTable('#example');

        // Attach event to table rows
        document.querySelectorAll('#example tbody').forEach(tbody => {
            tbody.onclick = function (e) {
                const row = e.target.closest('.selectable-row');
                if (!row) return;

                // Get data attributes
                const id = row.dataset.id;
                sessionStorage.setItem('programId', id);

                // Show modal
                const programModal = new bootstrap.Modal(document.getElementById(
                    `programModal${id}`));
                programModal.show();

                const programModalEl = document.getElementById(`programModal${id}`);
                programModalEl.addEventListener("hidden.bs.modal", function () {

                    document.querySelectorAll('.curriculum-select').forEach(select => {
                        const selectDataId = select.dataset.selectId;
                        const placeholder = document.querySelector(`#${selectDataId}Placeholder span`);
                        placeholder.textContent = "Select Value";
                        placeholder.className = 'select2-selection__placeholder';

                        document.querySelectorAll(`#${selectDataId}-results .curriculum-select-result_option`).forEach(item => {
                            item.ariaSelected = false;
                        })
                    })

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

                    document.querySelectorAll(`.subject-row`).forEach(row => {
                        row.classList.add('d-none');
                    });

                }, {
                    once: true
                });
            }
        });

        renderTables();
    }

    renderProspectusModal();

    function renderTables() {
        document.querySelectorAll('.curriculum-tables').forEach(table => {
            const firstYear1semTable = new DataTable(`#${table.id}`, {
                "pageLength": 25,
                "responsive": true,
                "searching": false,
                "ordering": false,
                "info": false,
                "paging": false,
                "language": {
                    "emptyTable": "No subject records",
                    "zeroRecords": "No matching records found"
                }
            });
        })
    }

    document.querySelectorAll('.semester-select').forEach(select => {
        select.onchange = (e) => {
            const semesterFilter = e.target.value;

            document.querySelectorAll('.year-level-semester-table').forEach(table => {
                if (semesterFilter == 'All') {
                    table.classList.remove('d-none');
                }
                else if (table.dataset.semesterId == semesterFilter) {
                    table.classList.remove('d-none');
                } else {
                    table.classList.add('d-none');
                }
            })

        }
    });

    function calculateUnits(curriculumId) {
        fetch(`/dean/prospectus/getAllData`)
            .then(response => response.json())
            .then(data => {
                const responseData = data.responseData;

                document.querySelectorAll('.selectable-row').forEach(row => {
                    const programId = row.dataset.id;
                    responseData.year_levels.forEach(year_level => {
                        responseData.semesters.forEach(semester => {
                            let lectureTotalUnits = 0;
                            let laboratoryTotalUnits = 0;
                            responseData.prospectus.forEach(data => {
                                const course = responseData.courses.filter(course => course.id == data.course_id);
                                if (data.year_level_id == year_level.id && data.semester_id == semester.id && data.program_id == programId && data.curriculum_id == curriculumId) {
                                    lectureTotalUnits += parseFloat(course[0].lecture_unit);
                                    laboratoryTotalUnits += parseFloat(course[0].laboratory_unit);
                                }
                                document.getElementById(`lectureTotalUnits${programId}${year_level.id}${semester.id}`).textContent = lectureTotalUnits.toFixed(1) || 0;
                                document.getElementById(`laboratoryTotalUnits${programId}${year_level.id}${semester.id}`).textContent = laboratoryTotalUnits.toFixed(1) || 0;
                            })
                        })
                    })
                })
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

    function API(setup, loadingId, courseLoadingId) {
        // document.querySelector('#page-block-spinner').style.display = 'flex';
        fetch(setup.url, {
            method: setup.method,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
                    .getAttribute('content'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(setup.data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success || data.status === 'success') {

                    renderTableRow(loadingId);
                    updateSubjectTable(courseLoadingId);

                    Swal.fire({
                        icon: setup.message.icon,
                        title: setup.message.title,
                        text: data.message || setup.message.text,
                        timer: setup.message.timer,
                        showConfirmButton: setup.message.showConfirmButton,
                        customClass: setup.message.customClass,
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
                } else {
                    throw new Error(data.message || 'Update failed');
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
            .finally(() => {
                document.querySelector('#page-block-spinner').style.display = 'none';
            });
    }

    document.querySelectorAll('.curriculum-select').forEach(select => {
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

                    document.querySelectorAll(`#${id}-results .curriculum-select-result_option`).forEach(li => {
                        li.classList.add('d-none');
                    });

                    if (!input.value) {
                        document.querySelectorAll(`#${id}-results .curriculum-select-result_option`).forEach(li => {
                            li.classList.remove('d-none');
                        });
                    };

                    let result = false;

                    document.querySelectorAll(`#${id}-results .curriculum-select-result_option`).forEach(li => {
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

                input.onfocus = () => {
                    setTimeout(() => {
                        document.querySelector(`.${selectDataId}-select-menu-container`).classList.add('select2-container--open');
                    }, 100);
                }
            })

            function selectOption() {
                document.querySelectorAll(`#${selectDataId}-results .curriculum-select-result_option`).forEach(li => {
                    li.onclick = () => {
                        document.querySelectorAll(`#${selectDataId}-results .curriculum-select-result_option`).forEach(item => {
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
                        document.querySelectorAll(`#${lastIdInput}-results .curriculum-select-result_option`).forEach(li => {
                            li.classList.remove('d-none');
                        });

                        openCurriculum(selectEl);
                    }
                });
            }

            selectOption();

            select.onmouseleave = () => {
                document.removeEventListener('click', unFocusSelect);
                document.addEventListener('click', unFocusSelect)
            }

            document.querySelectorAll('.edit-curriculum-icon').forEach(icon => {
                icon.onclick = () => {
                    const programId = icon.dataset.id;
                    const curriculumId = icon.dataset.curriculumId;

                    const curriculumModal = new bootstrap.Modal(document.getElementById(
                        `editCurriculumModal${programId}${curriculumId}`), {
                        backdrop: false,
                        keyboard: false
                    });

                    const currentModal = icon.closest(".modal");
                    if (currentModal) {
                        currentModal.style.zIndex = "1040";
                        curriculumModal.show();

                        const curriculumModalEl = document.getElementById(`editCurriculumModal${programId}${curriculumId}`);
                        curriculumModalEl.addEventListener("hidden.bs.modal", function () {
                            currentModal.style.zIndex = "";
                        }, {
                            once: true
                        });
                    }
                }
            })

            function unFocusSelect() {
                document.querySelector(`.${selectDataId}-select-menu-container`)
                    .classList.remove("select2-container--open");
                select.classList.remove('select2-container--focus');
                document.removeEventListener('click', unFocusSelect);
            }

            function openCurriculum(select) {
                const id = select.dataset.id;
                const selectedValue = select.value;
                const selected = select.selectedOptions[0]?.text;
                document.querySelectorAll(`.open-subject-modal`).forEach(btn => {
                    btn.dataset.curriculum = selected;
                    btn.dataset.curriculumId = selectedValue;
                });

                const curriculumModal = new bootstrap.Modal(document.getElementById(
                    `curriculumModal${id}`), {
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

                curriculumId = selectedValue;
                calculateUnits(curriculumId, id);
                updateSubjectTable()

                const currentModal = select.closest(".modal");
                if (currentModal && selected == 'Add Curriculum') {
                    currentModal.style.zIndex = "1040";
                    curriculumModal.show();

                    const curriculumModalEl = document.getElementById(`curriculumModal${id}`);
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

    document.querySelectorAll('.subject-group-select').forEach(select => {
        select.onchange = () => {
            filterTable(select.id, select.dataset.programId)
            latestSelectFilter = select;
        }
    })

    function filterTable(selectElementId, programId) {

        const filters = {
            subject_group: $(`#${selectElementId}`).val()
        };

        let visibleCount = 0;

        $(`#subject${programId} tbody tr`).each(function () {

            let show = true;
            const row = $(this);

            // School Year
            if (filters.subject_group &&
                row.data('subject-group-id') != filters.subject_group) {
                show = false;
            }

            row.toggle(show);

            if (show) visibleCount++;
        });

        if ($('#recordCount').length) {
            $('#recordCount').text(visibleCount);
        }
    }

    // Initialize Select2 first before adding event listeners
    if (typeof $.fn.select2 !== 'undefined') {
        $('.select2').select2({
            placeholder: function () {
                return $(this).find('option:first-child').text();
            },
            allowClear: true,
            width: '100%'
        });
    }

    // Curriculum Summary Print
    document.querySelectorAll('.print-curriculum-summary').forEach(btn => {
        btn.onclick = () => {
            const program_id = Number(btn.dataset.programId);
            const curriculum_id = Number(document.getElementById(`curriculum${program_id}`).value);

            if (!curriculum_id) {
                SwalHelper.warning('No Curriculum selected', 'Print Prospectus');
                return;
            }

            window.open(`/dean/prospectus/print-prospectus/${program_id}/${curriculum_id}`, "_blank");
        };
    });
});
