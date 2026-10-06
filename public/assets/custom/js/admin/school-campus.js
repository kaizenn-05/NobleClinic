(() => {
    document.addEventListener("DOMContentLoaded", () => {
        new DataTable("#schoolCampusTable", {
            pageLength: 25,
            responsive: true,
            searching: true,
            ordering: true,
            info: true,
            paging: true,
            language: {
                emptyTable: "No School Campus data in this table",
                zeroRecords: "No matching records found",
            },
        });

        document.addEventListener("change", function (e) {
            const input = e.target;
            if (!input.classList.contains("is_active")) return;

            const schoolCampusId = input.dataset.isactiveId;

            // Show spinner
            document.querySelector("#page-block-spinner").style.display = "flex";

            fetch(`/admin/school-campus/${schoolCampusId}/toggle`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({}), // keep as your backend expects
            })
                .then(async (response) => {
                    const data = await response.json();
                    if (!response.ok) throw data;
                    return data;
                })
                .then((data) => {
                    const badge = document.getElementById(
                        `status-badge-${schoolCampusId}`,
                    );
                    if (badge) {
                        const isActive = input.checked;
                        badge.textContent = isActive
                            ? "ACTIVE"
                            : "INACTIVE";
                        badge.classList.remove(
                            "bg-label-success",
                            "bg-label-danger",
                        );
                        badge.classList.add(
                            isActive ? "bg-label-success" : "bg-label-danger",
                        );
                    }

                    SwalHelper.success(`School Campus ${data.message}.`, data.message);
                })
                .catch((error) => {
                    console.error("Error:", error);

                    // Revert checkbox state on error
                    input.checked = !input.checked;

                    Swal.fire({
                        icon: "error",
                        title: "Failed to update",
                        text: error.message || "Something went wrong!",
                        timer: 3000,
                        showConfirmButton: false,
                        customClass: {
                            container: "swal2-container-high-z",
                        },
                        didOpen: () => {
                            const swalContainer =
                                document.querySelector(".swal2-container");
                            if (swalContainer)
                                swalContainer.style.zIndex = "9999";
                            const swalPopup =
                                document.querySelector(".swal2-popup");
                            if (swalPopup) swalPopup.style.zIndex = "10000";
                        },
                    });
                })
                .finally(() => {
                    document.querySelector("#page-block-spinner").style.display = "none";
                });
        });
    });
})();
