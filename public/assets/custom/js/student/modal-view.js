document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".open-evaluation-modal").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            const id = e.target.dataset.id;
            const updateModal = new bootstrap.Modal(
                document.getElementById(`studentEvaluationModal${id}`),
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
                    `studentEvaluationModal${id}`
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
    document.querySelectorAll(".open-course-modal").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            const id = e.target.dataset.id;
            const updateModal = new bootstrap.Modal(
                document.getElementById(`studentCourseModal${id}`),
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
                    `studentCourseModal${id}`
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
