document.addEventListener("DOMContentLoaded", function () {
    new DataTable("#activeScheduleTable");
    new DataTable("#endedScheduleTable");
    new DataTable("#enrollmentType");
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".enrollment-type-modal").forEach((btn) => {
        btn.addEventListener("click", function () {
            const targetSelector = this.getAttribute("data-target");
            const addModalEl = document.querySelector(targetSelector);
            const listModalEl = this.closest(".modal");

            if (!addModalEl || !listModalEl) return;

            const addModal = new bootstrap.Modal(addModalEl, {
                backdrop: false,
                keyboard: false,
            });

            listModalEl.style.zIndex = "1040";

            addModal.show();

            addModalEl.addEventListener(
                "hidden.bs.modal",
                function () {
                    listModalEl.style.zIndex = "";
                },
                {
                    once: true,
                }
            );
        });
    });

    document.querySelectorAll(".update-enrollment-type").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            const id = e.target.dataset.id;
            const updateModal = new bootstrap.Modal(
                document.getElementById(`updateEnrollmentType${id}`),
                {
                    backdrop: false,
                    keyboard: false,
                }
            );
            const editModalEl = this.closest(".modal");

            if (editModalEl) {
                // Lower the z-index of the current edit modal
                editModalEl.style.zIndex = "1040";
                // Show studentInfoModal modal on top
                updateModal.show();

                // Restore z-index after update modal closes
                const updateModalEl = document.getElementById(
                    `updateEnrollmentType${id}`
                );
                updateModalEl.addEventListener(
                    "hidden.bs.modal",
                    function () {
                        editModalEl.style.zIndex = "";
                    },
                    {
                        once: true,
                    }
                );
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".update-enrollment-schedule").forEach((btn) => {
        btn.addEventListener("click", function () {
            const id = this.dataset.id;

            const modalEl = document.getElementById(
                `updateEnrollmentSchedule${id}`
            );

            if (!modalEl) {
                console.error("Modal not found for ID:", id);
                return;
            }

            const updateModal = new bootstrap.Modal(modalEl);
            updateModal.show();
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".start-enrollment-schedule").forEach((btn) => {
        btn.addEventListener("click", function () {
            const id = this.dataset.id;

            const modalEl = document.getElementById(
                `startEnrollmentSchedule${id}`
            );

            if (!modalEl) {
                console.error("Modal not found for ID:", id);
                return;
            }

            const updateModal = new bootstrap.Modal(modalEl);
            updateModal.show();
        });
    });
});
