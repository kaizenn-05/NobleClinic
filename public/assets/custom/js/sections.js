document.addEventListener("DOMContentLoaded", () => {
    let sectionEditFormUpdated = false;

    function renderSubjectSchedule(data, matchingScheduleId, conflictSemYear) {
        let subjectScheduleElements = "";

        data.assigned_schedules.forEach((assignedSched) => {
            const subject = data.subject_schedules.find(sub => assignedSched.subject_schedule_id == sub.id);
            const personnels = Object.entries(data.personnels);
            const instructor = data.instructors;

            const course = data.courses.filter(
                (course) => course.id == subject.course_id
            );
            let sectionHTML = "";
            let scheduleHTML = "";

            data.assigned_subject_fusing.forEach((assignedSection) => {
                const section = data.sections.filter(
                    (section) => section.id == assignedSection.section_id
                );
                const program = data.programs.filter(
                    (program) => program.id == section[0].program_id
                );
                const yearLevel = data.year_levels.filter(
                    (year_level) => year_level.id == section[0].year_level_id
                );

                if (assignedSection.subject_schedule_id == subject.id) {
                    sectionHTML += `
                            <span
                                class="badge text-bg-primary">${program[0].program_abbreviation
                        }-${yearLevel[0].grade_level.slice(0, 1)}
                                    ${section[0].section_description}</span><br>
                        `;
                }
            });

            data.schedules.forEach((schedule) => {
                if (schedule.id === assignedSched.schedule_id) {
                    const startDate = new Date(schedule.start_time);
                    const endDate = new Date(schedule.end_time);
                    let start_time =
                        startDate
                            .getHours()
                            .toString()
                            .padStart(2, "0") +
                        ":" +
                        startDate
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                    let end_time =
                        endDate.getHours().toString().padStart(2, "0") +
                        ":" +
                        endDate
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                    const room = data.rooms.filter(
                        (room) => room.id == schedule.room_id
                    );
                    let week = schedule.day.split("-");

                    let combinedDays = "";

                    week.forEach((day) => {
                        combinedDays +=
                            day == "Thu"
                                ? day.slice(0, 2)
                                : day.slice(0, 1);
                    });

                    scheduleHTML += `
                        <span>${title(schedule.classification.slice(0, 3))}:
                        ${start_time} -
                        ${end_time} /
                        ${combinedDays} /
                        ${room[0].room_name}</span>
                    `;
                }
            });

            if (assignedSched.schedule_id == matchingScheduleId) {
                subjectScheduleElements += `
                                <tr>
                                    <td>
                                        <div>
                                            <span
                                                class="badge text-bg-${subject.class_type ==
                        "REGULAR CLASS"
                        ? "primary"
                        : "warning text-black"
                    }">${subject.class_type == "REGULAR CLASS" ? "RS" : "SP"
                    }</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            ${sectionHTML}
                                        </div>
                                    </td>
                                    <td>
                                        <span>${course[0].description}</span><br>
                                        <span>${course[0].code}</span>
                                    </td>
                                    <td>41 / ${subject.capacity}</td>
                                    <td>
                                        ${scheduleHTML}
                                    </td>
                                    <td>
                                        <span>${instructor[0].name}</span><br>
                                        <span>${instructor[0].username}</span>
                                    </td>
                                    <td>
                                        <button data-subject-id="${subject.id
                    }" type="button" class="schedule-fusing-btn btn btn-warning">Fuse</button>
                                    </td>
                                </tr>
                            `;
            }
        });

        document.getElementById("schedule-fusing-table-tbody").innerHTML =
            subjectScheduleElements;
    }
    // <<<<

    // Form Handler >>>>

    // Section Form Submission
    document.getElementById("createSectionSubmitBtn").onclick = function () {
        const yearLevelValue =
            document.getElementById("sectionYearLevel").value;
        const programIdValue = document.getElementById("sectionProgram").value;
        const sectionDescriptionValue =
            document.getElementById("sectionDescription").value;

        if (!yearLevelValue || !programIdValue || !sectionDescriptionValue) {
            return;
        }

        const setup = {
            url: "/dean/sections/store_section",
            method: "POST",
            data: {
                year_level_id: yearLevelValue,
                program_id: programIdValue,
                section_description: sectionDescriptionValue,
            },
            message: {
                icon: "success",
                title: "Added!",
                text: "Section created successfully!",
                timer: 1000,
                showConfirmButton: false,
                customClass: {
                    container: "swal2-container-high-z",
                },
            },
        };
        APIFetcher(setup);

        const currentOpenedModal = document.getElementById(`sectionFormModal`);
        const modal = bootstrap.Modal.getInstance(currentOpenedModal);
        modal.hide();

        document.querySelector('#sectionModal .btn-close').onclick = () => {
            window.location.reload();
        }

        document.getElementById("sectionYearLevel").selectedIndex = 0;
        document
            .getElementById("sectionYearLevel")
            .dispatchEvent(new Event("change"));
        document.getElementById("sectionProgram").selectedIndex = 0;
        document
            .getElementById("sectionProgram")
            .dispatchEvent(new Event("change"));
        document.getElementById("sectionDescription").value = "";

        loadSectionTable()
    };

    // Section Edit Form Submission
    document.getElementById("updateSectionFormBtn").onclick = function () {
        const sectionId = document.getElementById("editSectionId");
        const yearLevel = document.getElementById(
            "editSectionYearLevel"
        );
        const programId =
            document.getElementById("editSectionProgram");
        const sectionDescription = document.getElementById(
            "editSectionDescription"
        );

        if (!sectionDescription.value || !yearLevel.value || !programId.value) {
            return;
        }

        if (!sectionEditFormUpdated) {
            Swal.fire({
                icon: "warning",
                title: "No changes",
                text: "You haven't change anything yet",
                customClass: {
                    container: "swal2-container-high-z",
                },
            });
            return;
        }

        const setup = {
            url: "/dean/sections/update_section",
            method: "PATCH",
            data: {
                section_id: sectionId.value,
                year_level_id: yearLevel.value,
                program_id: programId.value,
                section_description: sectionDescription.value,
            },
            message: {
                icon: "success",
                title: "Updated!",
                text: "Section updated successfully!",
                timer: 1000,
                showConfirmButton: false,
                customClass: {
                    container: "swal2-container-high-z",
                },
            },
        };
        APIFetcher(setup, function (data) {
            loadSectionTable()
        });

        const currentOpenedModal =
            document.getElementById(`editSectionFormModal`);
        const modal = bootstrap.Modal.getInstance(currentOpenedModal);
        modal.hide();

        sectionEditFormUpdated = false;
    };

    // Section Delete/Remove Form Submission
    document.querySelectorAll(".deleteSectionBtn").forEach((btn) => {
        btn.onclick = function () {
            const sectionIdValue = btn.dataset.sectionId;

            const setup = {
                url: "/dean/sections/delete_section",
                method: "PATCH",
                data: {
                    section_id: sectionIdValue,
                },
                message: {
                    icon: "success",
                    title: "Removed!",
                    text: "Section Removed successfully!",
                    timer: 1000,
                    showConfirmButton: false,
                    customClass: {
                        container: "swal2-container-high-z",
                    },
                },
            };
            APIFetcher(setup, function (data) {
                loadSectionTable()
                document.querySelector('#sectionModal .btn-close').onclick = () => {
                    window.location.reload();
                }
            });
        };
    });

    // Subject Schedule Form Submission Varification
    fetch("/dean/sections/get-subject-schedules")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("addSubjectScheduleBtn").onclick =
                function () {
                    const btn = document.getElementById("addSubjectScheduleBtn");
                    const addSubjectDepartment = document.getElementById(
                        "addSubjectDepartment"
                    );
                    const addSubjectSchoolYear = document.getElementById(
                        "addSubjectSchoolYear"
                    );
                    const addSubjectSemester =
                        document.getElementById("addSubjectSemester");
                    const addSubjectClassType = document.getElementById(
                        "addSubjectClassType"
                    );
                    const addSubjectCapacity =
                        document.getElementById("addSubjectCapacity");
                    const addSubjectScheduleGroup = document.getElementById(
                        "addSubjectScheduleGroup"
                    );
                    const addSubjectCurriculum = document.getElementById(
                        "addSubjectCurriculum"
                    );
                    const addSubjectCourse =
                        document.getElementById("addSubjectCourse");
                    const addSubjectInstructor = document.getElementById(
                        "addSubjectInstructor"
                    );
                    const addScheduleClassification = document.getElementById(
                        "addScheduleClassification"
                    );
                    const addScheduleRoom =
                        document.getElementById("addScheduleRoom");
                    const addScheduleStartTime = document.getElementById(
                        "addScheduleStartTime"
                    );
                    const addScheduleEndTime =
                        document.getElementById("addScheduleEndTime");
                    let day = [];
                    let scheduleNotConflict = true;

                    document
                        .querySelectorAll('input[name="day[]"]')
                        .forEach((days) => {
                            if (days.checked) {
                                day.push(days.value);
                            }
                        });

                    let abort = false;

                    document.querySelectorAll('#formValidation input[data-need-validation="true"]').forEach(el => {
                        if (!el.value || el.value == "") {
                            abort = true;
                        }
                    })

                    document.querySelectorAll('#formValidation select[data-need-validation="true"]').forEach(el => {
                        if (!el.value || el.value == "") {
                            abort = true;
                        }
                    })

                    if (addScheduleStartTime.value &&
                        addScheduleEndTime.value &&
                        addScheduleStartTime.value >=
                        addScheduleEndTime.value) {
                        SwalHelper.warning("End time must be later than start time.", "Invalid Time").then(response => {
                            btn.disabled = false;
                            btn.innerHTML = 'Create Schedule';
                        });
                        return; // Stop submission
                    }

                    if (abort) return;

                    if (day.length === 0) {
                        SwalHelper.warning("Please select at least one day.", "Missing Day").then(response => {
                            btn.disabled = false;
                            btn.innerHTML = 'Create Schedule';
                        });
                        return; // Stop submission
                    }

                    let instructorMatched = false;
                    let semesterMatched = false;
                    let schoolYearMatched = false;

                    const activeSchoolYear = data.responseData.schoolYears.find((schoolYear) =>
                        schoolYear.is_active == 1
                    )
                    const activeSemester = data.responseData.semesters.find((semester) =>
                        semester.is_active == 1
                    )

                    const semesterYearConflict = data.responseData.subject_schedules.find(sched =>
                        sched.user_id == addSubjectInstructor.value && sched.semester_id == addSubjectSemester.value && sched.school_year_id == addSubjectSchoolYear.value
                    );



                    data.responseData.assigned_schedules.forEach(assignedSched => {
                        const subjectConflict = data.responseData.subject_schedules.find(sub =>
                            assignedSched.subject_schedule_id == sub.id && sub.user_id == addSubjectInstructor.value && sub.semester_id == addSubjectSemester.value && sub.school_year_id == addSubjectSchoolYear.value
                        );
                        const schedule = data.responseData.schedules.find(sched =>
                            assignedSched.schedule_id == sched.id
                        );

                        const days = schedule.day.split("-");
                        const startDate = new Date(schedule.start_time);
                        const endDate = new Date(schedule.end_time);

                        let start_time =
                            startDate.getHours().toString().padStart(2, "0") +
                            ":" +
                            startDate.getMinutes().toString().padStart(2, "0");
                        let end_time =
                            endDate.getHours().toString().padStart(2, "0") +
                            ":" +
                            endDate.getMinutes().toString().padStart(2, "0");

                        if (
                            (addScheduleStartTime.value == start_time) &&
                            (addScheduleEndTime.value == end_time) &&
                            day.every((val) => days.includes(val)) &&
                            (schedule.room_id == addScheduleRoom.value)
                        ) {
                            scheduleNotConflict = false;
                            const modal = new bootstrap.Modal(
                                document.getElementById("subjectConflictModal"),
                                {
                                    backdrop: false,
                                    keyboard: false,
                                }
                            );

                            const currentModal = this.closest(".modal");
                            if (currentModal) {
                                currentModal.style.zIndex = "1040";
                                modal.show();

                                renderSubjectSchedule(
                                    data.responseData,
                                    schedule.id,
                                    semesterYearConflict
                                );

                                document
                                    .querySelectorAll(".schedule-fusing-btn")
                                    .forEach((btn) => {
                                        btn.onclick = () => {
                                            const subjectId =
                                                btn.dataset.subjectId;

                                            const setup = {
                                                url: "/dean/sections/fuse-subject-section",
                                                method: "POST",
                                                data: {
                                                    section_id:
                                                        addSubjectScheduleGroup.value,
                                                    subject_schedule_id:
                                                        subjectId,
                                                },
                                                message: {
                                                    icon: "success",
                                                    title: "Fused!",
                                                    text: "Subject Schedule fused successfully!",
                                                    timer: 1000,
                                                    showConfirmButton: false,
                                                    customClass: {
                                                        container:
                                                            "swal2-container-high-z",
                                                    },
                                                },
                                            };
                                            APIFetcher(setup);
                                            window.location.reload();
                                        };
                                    });

                                const modalEl = document.getElementById(
                                    "subjectConflictModal"
                                );
                                modalEl.addEventListener(
                                    "hidden.bs.modal",
                                    function () {
                                        currentModal.style.zIndex = "";
                                        const btn = document.querySelector(`[form="formValidation"]`);
                                        btn.disabled = false;
                                        btn.dataset.originalText = btn.innerHTML = "Create Schedule";
                                    },
                                    {
                                        once: true,
                                    }
                                );
                            }
                        }
                        
                        if ((parseInt(addScheduleStartTime.value.replace(':', '')) > parseInt(start_time.replace(':', '')) && parseInt(addScheduleStartTime.value.replace(':', '')) < parseInt(end_time.replace(':', ''))) || (parseInt(addScheduleEndTime.value.replace(':', '')) > parseInt(start_time.replace(':', '')) && parseInt(addScheduleEndTime.value.replace(':', '')) < parseInt(end_time.replace(':', '')))) {
                            SwalHelper.warning("Please make sure that the start time and end time is valid.", "Time Conflict").then(response => {
                                btn.disabled = false;
                                btn.innerHTML = 'Create Schedule';
                            });
                            scheduleNotConflict = false;
                        }
                    })

                    if (scheduleNotConflict) {
                        const setup = {
                            url: "/dean/sections/store-subject-schedule",
                            method: "POST",
                            data: {
                                department_id: addSubjectDepartment.value,
                                school_year_id: addSubjectSchoolYear.value,
                                semester_id: addSubjectSemester.value,
                                class_type: addSubjectClassType.value,
                                capacity: addSubjectCapacity.value,
                                section_id: addSubjectScheduleGroup.value,
                                curriculum_id: addSubjectCurriculum.value,
                                course_id: addSubjectCourse.value,
                                user_id: addSubjectInstructor.value,
                                classification: addScheduleClassification.value,
                                room_id: addScheduleRoom.value,
                                start_time: addScheduleStartTime.value,
                                end_time: addScheduleEndTime.value,
                                day: day,
                            },
                            message: {
                                icon: "success",
                                title: "Added!",
                                text: "Subject Schedule added successfully!",
                                timer: 1000,
                                showConfirmButton: false,
                                customClass: {
                                    container: "swal2-container-high-z",
                                },
                            },
                        };
                        APIFetcher(setup);

                        window.location.reload();
                    }
                };
        });

    // Schedule Form Submission
    fetch("/dean/sections/get-subject-schedules")
        .then((response) => response.json())
        .then((data) => {
            document
                .querySelectorAll(".create-schedule-form-btn")
                .forEach((btn) => {
                    btn.onclick = () => {
                        const id = btn.dataset.subjectId;
                        const subjectId = document.getElementById(
                            `createScheduleSubjectId${id}`
                        );
                        const addScheduleClassification =
                            document.getElementById(
                                `createScheduleClassification${id}`
                            );
                        const addScheduleRoom = document.getElementById(
                            `createScheduleRoom${id}`
                        );
                        const addScheduleStartTime = document.getElementById(
                            `createScheduleStartTime${id}`
                        );
                        const addScheduleEndTime = document.getElementById(
                            `createScheduleEndTime${id}`
                        );
                        let day = [];
                        let scheduleNotConflict = true;

                        document
                            .querySelectorAll(`input[name="create_day${id}[]"]`)
                            .forEach((days) => {
                                if (days.checked) {
                                    day.push(days.value);
                                }
                            });

                        if (
                            !addScheduleClassification.value ||
                            !addScheduleRoom.value ||
                            !addScheduleStartTime.value ||
                            !addScheduleEndTime.value
                        ) {
                            return;
                        }

                        if (addScheduleStartTime.value &&
                            addScheduleEndTime.value &&
                            addScheduleStartTime.value >=
                            addScheduleEndTime.value) {
                            SwalHelper.warning("End time must be later than start time.", "Invalid Time").then(response => {
                                btn.disabled = false;
                                btn.innerHTML = 'Create Schedule';
                            });
                            return; // Stop submission
                        }

                        if (day.length === 0) {
                            SwalHelper.warning("Please select at least one day.", "Missing Day").then(response => {
                                btn.disabled = false;
                                btn.innerHTML = 'Create Schedule';
                            });
                            return; // Stop submission
                        }

                        data.responseData.schedules.forEach((schedule) => {
                            const days = schedule.day.split("-");
                            const startDate = new Date(schedule.start_time);
                            const endDate = new Date(schedule.end_time);
                            let start_time =
                                startDate
                                    .getHours()
                                    .toString()
                                    .padStart(2, "0") +
                                ":" +
                                startDate
                                    .getMinutes()
                                    .toString()
                                    .padStart(2, "0");
                            let end_time =
                                endDate.getHours().toString().padStart(2, "0") +
                                ":" +
                                endDate
                                    .getMinutes()
                                    .toString()
                                    .padStart(2, "0");

                            if (
                                addScheduleStartTime.value == start_time &&
                                addScheduleEndTime.value == end_time &&
                                day.every((val) => days.includes(val)) &&
                                schedule.room_id == addScheduleRoom.value
                            ) {
                                scheduleNotConflict = false;

                                SwalHelper.warning("Schedule already exist!", "Failed to add").then(response => {
                                    btn.disabled = false;
                                    btn.innerHTML = 'Create Schedule';
                                });
                            }

                            if (day.every((val) => days.includes(val)) &&
                                schedule.room_id == addScheduleRoom.value && 
                                (parseInt(addScheduleStartTime.value.replace(':', '')) > parseInt(start_time.replace(':', '')) && parseInt(addScheduleStartTime.value.replace(':', '')) < parseInt(end_time.replace(':', ''))) || (parseInt(addScheduleEndTime.value.replace(':', '')) > parseInt(start_time.replace(':', '')) && parseInt(addScheduleEndTime.value.replace(':', '')) < parseInt(end_time.replace(':', '')))) {
                                SwalHelper.warning("Please make sure that the start time and end time is valid.", "Time Conflict").then(response => {
                                    btn.disabled = false;
                                    btn.innerHTML = 'Create Schedule';
                                });
                                scheduleNotConflict = false;
                            }
                        });

                        if (scheduleNotConflict) {
                            const setup = {
                                url: "/dean/sections/create-schedule",
                                method: "POST",
                                data: {
                                    subject_schedule_id: id,
                                    classification:
                                        addScheduleClassification.value,
                                    room_id: addScheduleRoom.value,
                                    start_time: addScheduleStartTime.value,
                                    end_time: addScheduleEndTime.value,
                                    day: day,
                                },
                                message: {
                                    icon: "success",
                                    title: "Added!",
                                    text: "Schedule added successfully!",
                                    timer: 1000,
                                    showConfirmButton: false,
                                    customClass: {
                                        container: "swal2-container-high-z",
                                    },
                                },
                            };
                            APIFetcher(setup);

                            window.location.reload();
                        }
                    };
                });
        });

    // Section Delete/Remove Form Submission
    document.querySelectorAll(".delete-schedule-btn").forEach((btn) => {
        btn.onclick = function () {
            const scheduleId = btn.dataset.scheduleId;

            const setup = {
                url: "/dean/sections/delete-schedule",
                method: "DELETE",
                data: {
                    schedule_id: scheduleId,
                },
                message: {
                    icon: "success",
                    title: "Removed!",
                    text: "Schedule removed successfully!",
                    timer: 1000,
                    showConfirmButton: false,
                    customClass: {
                        container: "swal2-container-high-z",
                    },
                },
            };
            APIFetcher(setup);

            window.location.reload();
        };
    });

    // <<<<

    // APIFetcher Function
    function APIFetcher(setup, callback) {
        document.querySelector("#page-block-spinner").style.display =
            "flex";
        fetch(setup.url, {
            method: setup.method,
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(setup.data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success || data.status === "success") {
                    if (callback) callback(data.responseData);

                    Swal.fire({
                        icon: setup.message.icon,
                        title: setup.message.title,
                        text: data.message || setup.message.text,
                        timer: setup.message.timer,
                        showConfirmButton: setup.message.showConfirmButton,
                        customClass: setup.message.customClass,
                        didOpen: () => {
                            const swalContainer =
                                document.querySelector(".swal2-container");
                            if (swalContainer) {
                                swalContainer.style.zIndex = "9999";
                            }
                            const swalPopup =
                                document.querySelector(".swal2-popup");
                            if (swalPopup) {
                                swalPopup.style.zIndex = "10000";
                            }
                        },
                    });
                } else {
                    throw new Error(data.message || "Update failed");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Failed to add",
                    text: error.message || "Something went wrong!",
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        container: "swal2-container-high-z",
                    },
                    didOpen: () => {
                        const swalContainer =
                            document.querySelector(".swal2-container");
                        if (swalContainer) {
                            swalContainer.style.zIndex = "9999";
                        }
                        const swalPopup =
                            document.querySelector(".swal2-popup");
                        if (swalPopup) {
                            swalPopup.style.zIndex = "10000";
                        }
                    },
                });
            })
            .finally(() => {
                document.querySelector(
                    "#page-block-spinner"
                ).style.display = "none";
            });
    }
    // <<<<

    // Modal Functions >>>>>
    // Main Table Modals

    // Edit Schedule Modal
    document.querySelectorAll(".editScheduleInstructorBtn").forEach((btn) => {
        btn.onclick = function () {
            const editScheduleModal = new bootstrap.Modal(
                document.getElementById("editScheduleInstructorModal")
            );
            editScheduleModal.show();
        };
    });

    // Edit Subject Schedule Modal
    document.querySelectorAll(".editSubjectScheduleFormBtn").forEach((btn) => {
        btn.onclick = function () {
            const editSubjectScheduleModal = new bootstrap.Modal(
                document.getElementById("editSubjectScheduleFormModal")
            );
            editSubjectScheduleModal.show();
        };
    });

    // Add New Schedule Modal
    toggleMultiModal(".addNewScheduleBtn", "addNewScheduleModal");

    // End Main Table Modals

    // Section Modals
    // Section Form Modal
    toggleModal("sectionFormBtn", "sectionFormModal", function () {
        document.getElementById('sectionYearLevel').classList.remove('is-invalid');
        document.getElementById('sectionProgram').classList.remove('is-invalid');
        document.getElementById('sectionDescription').classList.remove('is-invalid');
        document.querySelectorAll('.fv-plugins-message-container div').forEach(div => div.innerHTML = '');
    });

    // Section Form Modal
    toggleMultiModal(
        ".editSectionFormBtn",
        "editSectionFormModal",
        function (target) {
            editSectionCallback(target);
        }
    );

    function editSectionCallback(target) {
        const id = target.dataset.sectionId;
        const yearLevelId = target.dataset.yearLevelId;
        const programId = target.dataset.programId;
        const sectionDescription = target.dataset.sectionDescription;
        const yearLevelOptions =
            document.getElementById(`editSectionYearLevel`).options;
        const programOptions =
            document.getElementById(`editSectionProgram`).options;

        document.getElementById("editSectionId").value = id;
        document.getElementById("editSectionDescription").value =
            sectionDescription;

        document.getElementById('editSectionYearLevel').classList.remove('is-invalid');
        document.getElementById('editSectionProgram').classList.remove('is-invalid');
        document.getElementById('editSectionDescription').classList.remove('is-invalid');
        document.querySelectorAll('.fv-plugins-message-container div').forEach(div => div.innerHTML = '');

        for (let i = 0; i < yearLevelOptions.length; i++) {
            if (yearLevelOptions[i].value == yearLevelId) {
                document.getElementById(
                    `editSectionYearLevel`
                ).selectedIndex = i;
                document
                    .getElementById(`editSectionYearLevel`)
                    .dispatchEvent(new Event("change"));
            }
        }

        for (let i = 0; i < programOptions.length; i++) {
            if (programOptions[i].value == programId) {
                document.getElementById(
                    `editSectionProgram`
                ).selectedIndex = i;
                document
                    .getElementById(`editSectionProgram`)
                    .dispatchEvent(new Event("change"));
            }
        }

        sectionEditFormUpdated = false;

        document.getElementById('editSectionYearLevel').onchange = () => {
            sectionEditFormUpdated = true;
        }
        document.getElementById('editSectionProgram').onchange = () => {
            sectionEditFormUpdated = true;
        }
        document.getElementById('editSectionDescription').oninput = () => {
            sectionEditFormUpdated = true;
        }
    }

    fetch("/dean/sections/get-subject-schedules")
        .then((response) => response.json())
        .then((data) => {
            document
                .querySelectorAll(".edit-schedule-modal-btn")
                .forEach((btn) => {
                    btn.onclick = function () {
                        const id = btn.dataset.scheduleId;

                        const modal = new bootstrap.Modal(
                            document.getElementById(`editScheduleModal${id}`),
                            {
                                backdrop: false,
                                keyboard: false,
                            }
                        );

                        const currentModal = this.closest(".modal");
                        if (currentModal) {
                            currentModal.style.zIndex = "1040";
                            modal.show();

                            document.getElementById(
                                `updateScheduleFormBtn${id}`
                            ).onclick = () => {
                                const editScheduleClassification =
                                    document.getElementById(
                                        `editScheduleClassification${id}`
                                    );
                                const editScheduleRoom =
                                    document.getElementById(
                                        `editScheduleRoom${id}`
                                    );
                                const editScheduleStartTime =
                                    document.getElementById(
                                        `editScheduleStartTime${id}`
                                    );
                                const editScheduleEndTime =
                                    document.getElementById(
                                        `editScheduleEndTime${id}`
                                    );
                                let day = [];
                                let scheduleNotConflict = true;

                                document
                                    .querySelectorAll(
                                        `input[name="update_day${id}[]"]`
                                    )
                                    .forEach((days) => {
                                        if (days.checked) {
                                            day.push(days.value);
                                        }
                                    });

                                if (
                                    !editScheduleClassification.value ||
                                    !editScheduleRoom.value ||
                                    !editScheduleStartTime.value ||
                                    !editScheduleEndTime.value
                                ) {
                                    return;
                                }

                                if (editScheduleStartTime.value &&
                                    editScheduleEndTime.value &&
                                    editScheduleStartTime.value >=
                                    editScheduleEndTime.value) {
                                    SwalHelper.warning("End time must be later than start time.", "Invalid Time").then(response => {
                                        btn.disabled = false;
                                        btn.innerHTML = 'Update';
                                    });
                                    return; // Stop submission
                                }

                                if (day.length === 0) {
                                    SwalHelper.warning("Please select at least one day!", "Missing Day").then(response => {
                                        btn.disabled = false;
                                        btn.innerHTML = 'Update';
                                    });
                                    return; // Stop submission
                                }

                                data.responseData.schedules.forEach(
                                    (schedule) => {
                                        const days = schedule.day.split("-");
                                        const startDate = new Date(
                                            schedule.start_time
                                        );
                                        const endDate = new Date(
                                            schedule.end_time
                                        );
                                        let start_time =
                                            startDate
                                                .getHours()
                                                .toString()
                                                .padStart(2, "0") +
                                            ":" +
                                            startDate
                                                .getMinutes()
                                                .toString()
                                                .padStart(2, "0");
                                        let end_time =
                                            endDate
                                                .getHours()
                                                .toString()
                                                .padStart(2, "0") +
                                            ":" +
                                            endDate
                                                .getMinutes()
                                                .toString()
                                                .padStart(2, "0");

                                        if (
                                            editScheduleStartTime.value == start_time &&
                                            editScheduleEndTime.value == end_time &&
                                            day.every((val) => days.includes(val)) &&
                                            schedule.room_id == editScheduleRoom.value
                                        ) {
                                            scheduleNotConflict = false;

                                            SwalHelper.warning("Schedule already exist.", "Failed to add").then(response => {
                                                btn.disabled = false;
                                                btn.innerHTML = 'Update';
                                            });
                                        }

                                        if ((parseInt(editScheduleStartTime.value.replace(':', '')) > parseInt(start_time.replace(':', '')) && parseInt(editScheduleStartTime.value.replace(':', '')) < parseInt(end_time.replace(':', ''))) || (parseInt(editScheduleEndTime.value.replace(':', '')) > parseInt(start_time.replace(':', '')) && parseInt(editScheduleEndTime.value.replace(':', '')) < parseInt(end_time.replace(':', '')))) {
                                            SwalHelper.warning("Please make sure that the start time and end time is valid.", "Time Conflict").then(response => {
                                                btn.disabled = false;
                                                btn.innerHTML = 'Update';
                                            });
                                            scheduleNotConflict = false;
                                        }
                                    }
                                );

                                if (scheduleNotConflict) {
                                    btn.disabled = true;
                                    btn.dataset.originalText = btn.innerHTML;

                                    btn.innerHTML = `
                                        <span class="spinner-border spinner-border-sm me-2"></span>
                                        Processing...
                                    `;

                                    const setup = {
                                        url: "/dean/sections/update-schedule",
                                        method: "PATCH",
                                        data: {
                                            schedule_id: id,
                                            classification:
                                                editScheduleClassification.value,
                                            room_id: editScheduleRoom.value,
                                            start_time:
                                                editScheduleStartTime.value,
                                            end_time: editScheduleEndTime.value,
                                            day: day,
                                        },
                                        message: {
                                            icon: "success",
                                            title: "Updated!",
                                            text: "Schedule updated successfully!",
                                            timer: 1000,
                                            showConfirmButton: false,
                                            customClass: {
                                                container:
                                                    "swal2-container-high-z",
                                            },
                                        },
                                    };
                                    APIFetcher(setup);

                                    window.location.reload();
                                }
                            };

                            const modalEl = document.getElementById(
                                `editScheduleModal${id}`
                            );
                            modalEl.addEventListener(
                                "hidden.bs.modal",
                                function () {
                                    currentModal.style.zIndex = "";
                                },
                                {
                                    once: true,
                                }
                            );
                        }
                    };
                });
        });

    function toggleModal(btnId, modalId, callback) {
        document.getElementById(btnId).onclick = function () {
            const modal = new bootstrap.Modal(
                document.getElementById(modalId),
                {
                    backdrop: false,
                    keyboard: false,
                }
            );

            const currentModal = this.closest(".modal");
            if (currentModal) {
                currentModal.style.zIndex = "1040";
                modal.show();

                callback();

                const modalEl = document.getElementById(modalId);
                modalEl.addEventListener(
                    "hidden.bs.modal",
                    function () {
                        currentModal.style.zIndex = "";
                    },
                    {
                        once: true,
                    }
                );
            }
        };
    }

    function toggleMultiModal(btnClass, modalId, callback, cancelCallback) {
        document.querySelectorAll(btnClass).forEach((btn) => {
            btn.onclick = function () {
                const modal = new bootstrap.Modal(
                    document.getElementById(modalId),
                    {
                        backdrop: false,
                        keyboard: false,
                    }
                );

                if (callback) callback(btn);

                const currentModal = this.closest(".modal");
                if (currentModal) {
                    currentModal.style.zIndex = "1040";
                    modal.show();

                    if (cancelCallback) cancelCallback();

                    const modalEl = document.getElementById(modalId);
                    modalEl.addEventListener(
                        "hidden.bs.modal",
                        function () {
                            currentModal.style.zIndex = "";
                        },
                        {
                            once: true,
                        }
                    );
                }
            };
        });
    }

    // FUNCTIONS >>>>

    // Curriculum Select
    fetch("/dean/prospectus/getAllData")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("addSubjectCurriculum").onchange = () => {
                filter();
            }
            document.getElementById("addSubjectScheduleGroup").onchange = () => {
                filter();
            }

            function filter() {
                const subjectGroup = document.getElementById('addSubjectScheduleGroup');
                const selectValue = document.getElementById(
                    "addSubjectCurriculum"
                ).value;
                document.getElementById(
                    "addSubjectCourseLectureUnit"
                ).textContent = "0.0";
                document.getElementById(
                    "addSubjectCourseLaboratoryUnit"
                ).textContent = "0.0";

                let selectHTML =
                    '<option value="">--- Select Curriculum ---</option>';

                const section = data.responseData.sections.find(sec => sec.id == subjectGroup.value)
                const activeSemester = document.getElementById('addSubjectSemester');

                const programProspectus = data.responseData.prospectus.filter(curriculum =>
                    curriculum.program_id == section?.program_id &&
                    curriculum.year_level_id == section?.year_level_id &&
                    curriculum.semester_id == activeSemester.value
                )

                programProspectus.forEach((prospectus) => {
                    const course = data.responseData.courses.find(
                        (course) => course.id === prospectus.course_id
                    );
                    const program = data.responseData.programs.find(
                        (program) => program.id === prospectus.program_id
                    );
                    const yearLevel = data.responseData.year_levels.find(
                        (level) => level.id === prospectus.year_level_id
                    );
                    const semester = data.responseData.semesters.find(
                        (sem) => sem.id === prospectus.semester_id
                    );

                    if (selectValue == prospectus.curriculum_id) {
                        selectHTML += `
                                <option value="${prospectus.course_id}">${course.description} (${program.program_abbreviation}-${yearLevel.grade_level.slice(0, 1)}) - ${semester.semesters_name}</option>
                            `;
                    }
                });

                document.getElementById("addSubjectCourse").innerHTML =
                    selectHTML;

                document.getElementById("addSubjectCourse").onchange =
                    () => {
                        const selectValue =
                            document.getElementById(
                                "addSubjectCourse"
                            ).value;

                        data.responseData.prospectus.forEach(
                            (prospectus) => {
                                const course =
                                    data.responseData.courses.filter(
                                        (course) =>
                                            course.id ===
                                            prospectus.course_id
                                    );

                                if (selectValue == course[0].id) {
                                    document.getElementById(
                                        "addSubjectCourseLectureUnit"
                                    ).textContent = course[0].lecture_unit;
                                    document.getElementById(
                                        "addSubjectCourseLaboratoryUnit"
                                    ).textContent =
                                        course[0].laboratory_unit;
                                }
                            }
                        );
                    };
            };

            document
                .querySelectorAll(".edit-subject-schedule-btn")
                .forEach((btn) => {
                    btn.onchange = function () {
                        const id = btn.dataset.subjectId;
                        const selectValue = btn.value;
                        document.getElementById(
                            `editSubjectCourseLectureUnit${id}`
                        ).textContent = "0.0";
                        document.getElementById(
                            `editSubjectCourseLaboratoryUnit${id}`
                        ).textContent = "0.0";

                        let selectHTML =
                            '<option value="">--- Select Subject ---</option>';

                        data.responseData.prospectus.forEach((prospectus) => {
                            const course = data.responseData.courses.find(
                                (course) => course.id === prospectus.course_id
                            );
                            const program = data.responseData.programs.find(
                                (program) => program.id === prospectus.program_id
                            );
                            const yearLevel = data.responseData.year_levels.find(
                                (level) => level.id === prospectus.year_level_id
                            );
                            const semester = data.responseData.semesters.find(
                                (sem) => sem.id === prospectus.semester_id
                            );

                            if (selectValue == prospectus.curriculum_id) {
                                selectHTML += `
                                <option value="${prospectus.course_id}">${course.description} (${program.program_abbreviation}-${yearLevel.grade_level.slice(0, 1)}) - ${semester.semesters_name}</option>
                            `;
                            }
                        });

                        document.getElementById(
                            `editSubjectCourse${id}`
                        ).innerHTML = selectHTML;

                        document.getElementById(
                            `editSubjectCourse${id}`
                        ).onchange = () => {
                            const selectValue = document.getElementById(
                                `editSubjectCourse${id}`
                            ).value;

                            data.responseData.prospectus.forEach(
                                (prospectus) => {
                                    const course =
                                        data.responseData.courses.filter(
                                            (course) =>
                                                course.id ===
                                                prospectus.course_id
                                        );

                                    if (selectValue == course[0].id) {
                                        document.getElementById(
                                            `editSubjectCourseLectureUnit${id}`
                                        ).textContent = course[0].lecture_unit;
                                        document.getElementById(
                                            `editSubjectCourseLaboratoryUnit${id}`
                                        ).textContent =
                                            course[0].laboratory_unit;
                                    }
                                }
                            );
                        };
                    };
                });
        })
        .catch((err) => console.error(err));

    document.querySelectorAll('.delete-subject-schedule-btn').forEach(btn => {
        btn.onclick = () => {
            SwalHelper.confirm("Are you sure you want to delete this subject schedule?", "Delete Subject").then((response) => {
                if (response.isDenied || response.isDismissed) {
                    return;
                }
                const subjectScheduleId = btn.dataset.subjectScheduleId;
    
                const setup = {
                    url: "/dean/sections/delete-subject-schedule",
                    method: "DELETE",
                    data: {
                        subject_schedule_id: subjectScheduleId
                    },
                    message: {
                        icon: "success",
                        title: "Deleted!",
                        text: "Subject Schedule deleted successfully!",
                        timer: 1000,
                        showConfirmButton: false,
                        customClass: {
                            container:
                                "swal2-container-high-z",
                        },
                    },
                };
                APIFetcher(setup);
    
                window.location.reload();
            });
        }
    })

    // <<<<

    function initializeTables() {
        document.querySelectorAll(".table.init-table").forEach((table) => {
            const initializeTable = new DataTable(`#${table.id}`, {
                pageLength: 25,
                responsive: true,
                searching: true,
                ordering: false,
                info: true,
                paging: true,
                language: {
                    emptyTable: "No records",
                    zeroRecords: "No matching records found",
                },
            });
        });
    }

    initializeTables();

    // Tools >>>>

    function title(phrase) {
        let words = phrase.replaceAll("_", " ").split(" ");
        let capitalizedWords = [];
        words.forEach((word) => {
            capitalizedWords.push(
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            );
        });
        return capitalizedWords.join(" ");
    }

    function loadSectionTable() {
        $.ajax({
            url: "/dean/sections/section-table-load",
            method: "GET",
            data: {},
            success: function (response) {

                $('#sections tbody').html(response.table);

                toggleMultiModal(
                    ".editSectionFormBtn",
                    "editSectionFormModal",
                    function (target) {
                        editSectionCallback(target);
                    }
                );

                document.querySelectorAll(".deleteSectionBtn").forEach((btn) => {
                    btn.onclick = function () {
                        const sectionIdValue = btn.dataset.sectionId;

                        const setup = {
                            url: "/dean/sections/delete_section",
                            method: "PATCH",
                            data: {
                                section_id: sectionIdValue,
                            },
                            message: {
                                icon: "success",
                                title: "Removed!",
                                text: "Section Removed successfully!",
                                timer: 1000,
                                showConfirmButton: false,
                                customClass: {
                                    container: "swal2-container-high-z",
                                },
                            },
                        };
                        APIFetcher(setup, function (data) {
                            loadSectionTable()
                        });
                    };
                });
            },
            error: function (e) {
                console.error("Error refreshing section table", e.responseJSON);
            }
        });
    }

    // <<<<
});