// Disable Update Button of Edit Payment Item Modal
$(document).ready(function () {
    // For each update modal
    $('[id^="updateFeeAssignment"]').each(function () {
        const modalId = $(this).attr("id");
        const modal = $("#" + modalId);

        // Get selectors within this specific modal
        const academicProgramSelect = modal.find(".academic_program-update");
        const descriptionInput = modal.find('input[name="description"]');
        const programSelect = modal.find('select[name="program"]');
        const yearLevelSelect = modal.find('select[name="year_level"]');
        const primaryGradeSelect = modal.find('select[name="primary_grade"]');
        const jhsGradeSelect = modal.find('select[name="jhs_grade"]');
        const shsGradeSelect = modal.find('select[name="shs_grade"]');
        const updateBtn = modal.find(".update-btn-sm");

        // Function to toggle update button
        function toggleUpdateButton() {
            const hasAcademicProgram =
                academicProgramSelect.val() !== "" &&
                academicProgramSelect.val() !== null;
            const hasDescription =
                descriptionInput.val() !== "" &&
                descriptionInput.val() !== null;

            if (hasAcademicProgram && hasDescription) {
                updateBtn.prop("disabled", false);
            } else {
                updateBtn.prop("disabled", true);
            }
        }

        // Function to update description for College
        function updateCollegeDescription() {
            const programId = programSelect.val();
            const yearLevelId = yearLevelSelect.val();

            if (programId && yearLevelId) {
                // Get the program abbreviation from selected option text or data attribute
                const programText = programSelect
                    .find("option:selected")
                    .text()
                    .trim();
                const yearLevelText = yearLevelSelect
                    .find("option:selected")
                    .text()
                    .trim();

                // Try to get abbreviation from data attribute first
                let programAbbr = programSelect
                    .find("option:selected")
                    .data("abbr");

                // If no data attribute, try to extract from text
                if (!programAbbr) {
                    const match = programText.match(/\(([^)]+)\)/);
                    programAbbr = match ? match[1] : programText;
                }

                const description = `${yearLevelText.toUpperCase()} PAYABLE (${programAbbr.toUpperCase()})`;
                descriptionInput.val(description).trigger("input");
            } else {
                descriptionInput.val("").trigger("input");
            }

            toggleUpdateButton();
        }

        // Function to update description for Primary/JHS
        function updateOtherDescription(gradeSelect) {
            const gradeId = gradeSelect.val();

            if (gradeId) {
                const gradeText = gradeSelect
                    .find("option:selected")
                    .text()
                    .trim();
                const description = `${gradeText.toUpperCase()} PAYABLE`;
                descriptionInput.val(description).trigger("input");
            } else {
                descriptionInput.val("").trigger("input");
            }

            toggleUpdateButton();
        }

        // Function to update description for SHS
        function updateSHSDescription() {
            const gradeId = shsGradeSelect.val();

            if (gradeId) {
                const gradeText = shsGradeSelect
                    .find("option:selected")
                    .text()
                    .trim();
                const description = `${gradeText.toUpperCase()} PAYABLE`;
                descriptionInput.val(description).trigger("input");
            } else {
                descriptionInput.val("").trigger("input");
            }

            toggleUpdateButton();
        }

        // Listen for changes on Program select
        programSelect.on("change", function () {
            updateCollegeDescription();
        });

        // Listen for changes on Year Level select
        yearLevelSelect.on("change", function () {
            updateCollegeDescription();
        });

        // Listen for changes on Primary Grade Level
        primaryGradeSelect.on("change", function () {
            updateOtherDescription(primaryGradeSelect);
        });

        // Listen for changes on JHS Grade Level
        jhsGradeSelect.on("change", function () {
            updateOtherDescription(jhsGradeSelect);
        });

        // Listen for changes on SHS Grade Level
        shsGradeSelect.on("change", function () {
            updateSHSDescription();
        });

        // Clear description when academic program changes
        academicProgramSelect.on("change", function () {
            descriptionInput.val("").trigger("input");
            toggleUpdateButton();
        });

        // Watch for manual changes to description and academic program
        descriptionInput.on("input change", toggleUpdateButton);
        academicProgramSelect.on("change", toggleUpdateButton);

        // Run once when modal is shown
        modal.on("shown.bs.modal", function () {
            toggleUpdateButton();
        });

        // Initial check
        toggleUpdateButton();
    });
});

// Click Add Classification Button in the Edit Payment Item Modal
document.addEventListener("DOMContentLoaded", function () {
    // Handle Add Classification button click
    document.querySelectorAll(".add-classification").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            const id = this.dataset.id;
            const addClassificationModal = new bootstrap.Modal(
                document.getElementById(`addClassification${id}`),
                {
                    backdrop: false,
                    keyboard: false,
                },
            );

            const editModalEl = document.getElementById(
                `updateFeeAssignment${id}`,
            );

            if (editModalEl) {
                // Lower the z-index of the edit modal
                editModalEl.style.zIndex = "1040";

                const addClassificationModalEl = document.getElementById(
                    `addClassification${id}`,
                );
                addClassificationModalEl.style.zIndex = "1050";

                // Show add classification modal on top
                addClassificationModal.show();

                // Restore z-index after add classification modal closes
                addClassificationModalEl.addEventListener(
                    "hidden.bs.modal",
                    function () {
                        editModalEl.style.zIndex = "";
                    },
                    {
                        once: true,
                    },
                );
            }
        });
    });

    // Handle Add Classification Items button click
    document.querySelectorAll(".add-classification-items").forEach((btn) => {
        btn.addEventListener("click", function (e) {
            const id = this.dataset.id;
            const addItemsModal = new bootstrap.Modal(
                document.getElementById(`addClassificationItems${id}`),
                {
                    backdrop: false,
                    keyboard: false,
                },
            );

            const editModalEl = document.getElementById(
                `updateFeeAssignment${id}`,
            );
            const addClassificationModalEl = document.getElementById(
                `addClassification${id}`,
            );

            if (editModalEl && addClassificationModalEl) {
                // Set z-indexes to stack modals properly
                editModalEl.style.zIndex = "1040";
                addClassificationModalEl.style.zIndex = "1050";

                const addItemsModalEl = document.getElementById(
                    `addClassificationItems${id}`,
                );
                addItemsModalEl.style.zIndex = "1060";

                // Show add items modal on top
                addItemsModal.show();

                // Restore z-index after add items modal closes
                addItemsModalEl.addEventListener(
                    "hidden.bs.modal",
                    function () {
                        addClassificationModalEl.style.zIndex = "1050";
                    },
                    {
                        once: true,
                    },
                );
            }
        });
    });
});

// Click Delete Button of View Payment Classification Modal
document.addEventListener("DOMContentLoaded", function () {
    // Handle delete button click for view modal items (with database deletion)
    document.addEventListener("click", function (e) {
        // Check if the clicked element is a view-remove-item button
        if (
            e.target.matches(".view-remove-item") ||
            e.target.closest(".view-remove-item")
        ) {
            e.preventDefault();
            e.stopPropagation();

            const button = e.target.matches(".view-remove-item")
                ? e.target
                : e.target.closest(".view-remove-item");
            const row = button.closest("tr");
            const modal = button.closest(".modal");

            if (!row || !modal) {
                showToast("Could not find row or modal", "error");
                return;
            }

            // Get the item ID from the hidden input
            const itemIdInput = row.querySelector(
                'input[name*="view_items"][name*="[id]"]',
            );

            if (!itemIdInput || !itemIdInput.value) {
                showToast("Item ID not found", "error");
                return;
            }

            const itemId = itemIdInput.value;

            // Get item description/name for better confirmation message (optional)
            const itemDescription =
                row.querySelector("td:first-child")?.textContent?.trim() ||
                "this item";

            // Use the reusable delete confirmation
            showDeleteConfirmation({
                title: "Delete Item?",
                text: `Are you sure you want to delete "${itemDescription}"? This action cannot be undone.`,
                cancelButtonText: "Cancel",
                confirmButtonText: "Yes, delete it!",
                icon: "warning",
                onConfirm: function () {
                    // Disable button during deletion
                    button.disabled = true;

                    // Send AJAX DELETE request
                    fetch(
                        `{{ url('/finance/fee-assignment-items') }}/${itemId}`,
                        {
                            method: "DELETE",
                            headers: {
                                "X-CSRF-TOKEN": document.querySelector(
                                    'meta[name="csrf-token"]',
                                ).content,
                                "X-Requested-With": "XMLHttpRequest",
                                Accept: "application/json",
                            },
                        },
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.success) {
                                // Remove the row from the table
                                row.remove();

                                // Update totals using existing functions
                                if (typeof updateTotalAmount === "function") {
                                    updateTotalAmount(modal, "view");
                                }

                                // Get assignment ID and update main table
                                const form = modal.querySelector(
                                    "form.view-classification-form",
                                );
                                if (form && form.dataset.assignmentId) {
                                    if (
                                        typeof updateMainClassificationTable ===
                                        "function"
                                    ) {
                                        updateMainClassificationTable(
                                            form.dataset.assignmentId,
                                            "view",
                                        );
                                    }
                                }
                                window.location.reload();
                            } else {
                                showToast(
                                    data.message || "Failed to delete item",
                                    "error",
                                );
                                button.disabled = false;
                            }
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                            showToast(
                                "An error occurred while deleting",
                                "error",
                            );
                            button.disabled = false;
                        });
                },
            });
        }
    });
});

// Click table data Show View Payment Classification modal
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".show-classification-items").forEach((row) => {
        row.addEventListener("click", function (e) {
            const assignmentId = this.dataset.assignmentId;
            const classificationId = this.dataset.classificationId;
            const modeOfPaymentId = this.dataset.modeOfPaymentId;
            const classificationName = this.dataset.classificationName;
            const modeOfPaymentName = this.dataset.modeOfPaymentName;
            const items = JSON.parse(this.dataset.items);

            const modalElement = document.getElementById(
                `viewClassification${assignmentId}`,
            );

            if (!modalElement) {
                showToast(
                    `Modal with ID viewClassification${assignmentId} not found`,
                    "error",
                );
                return;
            }

            // Get the current edit modal and store reference FIRST
            const editModalEl = this.closest(".modal");
            if (editModalEl) {
                // Store parent modal reference in the view classification modal
                modalElement.dataset.parentModalId = editModalEl.id;
            }

            // ... rest of your population code ...
            const classificationSelect = modalElement.querySelector(
                ".view-classification-dropdown",
            );
            const modeOfPaymentSelect = modalElement.querySelector(
                ".view-payment-mode-dropdown",
            );
            const itemsTableBody = modalElement.querySelector(
                ".view-classification-items-table tbody",
            );
            const totalAmountElement =
                modalElement.querySelector(".view-total-amount");

            if (classificationSelect) {
                classificationSelect.value = classificationId;
                if (typeof $ !== "undefined") {
                    $(classificationSelect).trigger("change");
                }
            }

            if (modeOfPaymentSelect) {
                modeOfPaymentSelect.value = modeOfPaymentId;
                if (typeof $ !== "undefined") {
                    $(modeOfPaymentSelect).trigger("change");
                }
            }

            if (itemsTableBody) {
                itemsTableBody.innerHTML = "";
            }

            let totalAmount = 0;
            items.forEach((item, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>
                    <input type="hidden" name="view_items[${index}][id]" value="${item.id}">
                    <input type="hidden" name="view_items[${index}][payment_item_id]" value="${item.payment_item_id}">
                    <span>${item.payment_item_name || "N/A"}</span>
                </td>
                <td class="view-item-amount-display">
                    ${parseFloat(item.amount).toFixed(2)}
                </td>
                <td>
                    <button type="button" class="btn btn-sm btn-danger view-remove-item">
                        <i class="bx bx-trash"></i>
                    </button>
                </td>
            `;
                itemsTableBody.appendChild(row);
                totalAmount += parseFloat(item.amount);
            });

            if (totalAmountElement) {
                totalAmountElement.textContent = `₱ ${totalAmount.toLocaleString(
                    "en-US",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    },
                )}`;
            }

            const saveBtn = modalElement.querySelector(".view-update-btn");
            const addItemBtn = modalElement.querySelector(
                ".view-add-items-btn",
            );

            if (saveBtn) saveBtn.disabled = false;
            if (addItemBtn) addItemBtn.disabled = false;

            const viewModal = new bootstrap.Modal(modalElement, {
                backdrop: "static",
                keyboard: false,
            });

            if (editModalEl) {
                editModalEl.style.zIndex = "1040";
                viewModal.show();

                // REMOVED the hidden.bs.modal listener - will be handled by global cleanup
            } else {
                viewModal.show();
            }
        });
    });
});

// Edit Payment Item Modal
document.addEventListener("DOMContentLoaded", function () {
    // Add CSS for pointer cursor on ALL classification items table types
    const style = document.createElement("style");
    style.textContent = `
    .classification-items-table tbody tr,
    .show-classification-items-table tbody tr,
    .view-classification-items-table tbody tr {
        cursor: pointer;
    }
    .classification-items-table tbody tr:hover,
    .show-classification-items-table tbody tr:hover,
    .view-classification-items-table tbody tr:hover {
        background-color: #f8f9fa;
    }
    `;
    document.head.appendChild(style);

    // Handle clicking on table rows in ALL classification modals to open Update Items modal
    document.addEventListener("click", function (e) {
        // Check if clicked element is within any classification items table row (but not action buttons)
        const addTableRow = e.target.closest(
            ".classification-items-table tbody tr",
        );
        const showTableRow = e.target.closest(
            ".show-classification-items-table tbody tr",
        );
        const viewTableRow = e.target.closest(
            ".view-classification-items-table tbody tr",
        );
        const tableRow = addTableRow || showTableRow || viewTableRow;

        // Don't proceed if clicked on action buttons or if it's the total row
        if (
            tableRow &&
            !e.target.closest("button") &&
            !tableRow.querySelector(".fw-bold") &&
            !tableRow.classList.contains("table-border-bottom-0")
        ) {
            const assignmentId = getAssignmentIdFromModal(tableRow);
            let modalSource = "add"; // default

            if (showTableRow) modalSource = "show";
            else if (viewTableRow) modalSource = "view";

            if (!assignmentId) {
                showToast("Could not find assignment ID", "error");
                return;
            }

            // Extract item data from the row
            const itemData = extractItemDataFromRow(tableRow, modalSource);

            if (!itemData) {
                showToast("Could not extract item data from row", "error");
                return;
            }

            // Open the Update Items modal with the data
            showUpdateItemsModal(assignmentId, itemData, tableRow, modalSource);
        }
    });

    // Function to get assignment ID from the modal (updated for all modal types)
    function getAssignmentIdFromModal(element) {
        const modal = element.closest(".modal");
        if (!modal) return null;

        // Try all form types
        const addForm = modal.querySelector(
            "form.add-classification-form[data-assignment-id]",
        );
        const showForm = modal.querySelector(
            "form.show-classification-form[data-assignment-id]",
        );
        const viewForm = modal.querySelector(
            "form.view-classification-form[data-assignment-id]",
        );
        const form = addForm || showForm || viewForm;

        return form ? form.dataset.assignmentId : null;
    }

    // Function to extract item data from table row (updated for all modal types)
    function extractItemDataFromRow(row, modalSource = "add") {
        try {
            let itemIdInput, paymentItemIdInput, descriptionSpan, amountElement;

            if (modalSource === "view") {
                // For View Classification modal
                itemIdInput = row.querySelector(
                    'input[name*="view_items"][name*="[id]"]',
                );
                paymentItemIdInput = row.querySelector(
                    'input[name*="view_items"][name*="[payment_item_id]"]',
                );
                descriptionSpan = row.querySelector("td:first-child span");
                amountElement = row.querySelector(".view-item-amount-display");
            } else if (modalSource === "show") {
                // For Show Classification modal
                itemIdInput = row.querySelector(
                    'input[name*="show_items"][name*="[id]"]',
                );
                paymentItemIdInput = row.querySelector(
                    'input[name*="show_items"][name*="[payment_item_id]"]',
                );
                descriptionSpan = row.querySelector("td:first-child span");
                amountElement = row.querySelector(".show-item-amount-display");
            } else {
                // For Add Classification modal
                itemIdInput = row.querySelector(
                    'input[name*="items"][name*="[id]"]',
                );
                paymentItemIdInput = row.querySelector(
                    'input[name*="items"][name*="[payment_item_id]"]',
                );
                descriptionSpan = row.querySelector("td:first-child span");

                // Try both possible amount element types
                amountElement =
                    row.querySelector(".item-amount-display") ||
                    row.querySelector("td:nth-child(2)");
            }

            if (
                !itemIdInput ||
                !paymentItemIdInput ||
                !descriptionSpan ||
                !amountElement
            ) {
                console.error("Required elements not found in row", {
                    itemIdInput: !!itemIdInput,
                    paymentItemIdInput: !!paymentItemIdInput,
                    descriptionSpan: !!descriptionSpan,
                    amountElement: !!amountElement,
                    modalSource,
                });
                showToast(
                    "Required elements not found in row",
                    {
                        itemIdInput: !!itemIdInput,
                        paymentItemIdInput: !!paymentItemIdInput,
                        descriptionSpan: !!descriptionSpan,
                        amountElement: !!amountElement,
                        modalSource,
                    },
                    "error",
                );
                return null;
            }

            // Get amount value
            let amountValue;
            if (
                amountElement.classList.contains("view-item-amount-display") ||
                amountElement.classList.contains("show-item-amount-display") ||
                amountElement.classList.contains("item-amount-display")
            ) {
                amountValue = parseFloat(amountElement.textContent) || 0;
            } else {
                amountValue = parseFloat(amountElement.textContent.trim()) || 0;
            }

            return {
                id: itemIdInput.value,
                payment_item_id: paymentItemIdInput.value,
                payment_item_name: descriptionSpan.textContent.trim(),
                amount: amountValue,
                rowElement: row, // Store reference to the row for updates
                modalSource: modalSource,
            };
        } catch (error) {
            showToast("Error extracting item data:", "error");
            return null;
        }
    }

    // Function to show the Update Items modal with data (updated for all modal types)
    function showUpdateItemsModal(
        assignmentId,
        itemData,
        sourceRow,
        modalSource = "add",
    ) {
        const updateModalElement = document.getElementById(
            `updateItems${assignmentId}`,
        );

        if (!updateModalElement) {
            showToast(
                `Update modal with ID updateItems${assignmentId} not found`,
                "error",
            );
            return;
        }

        populateUpdateModal(updateModalElement, itemData, modalSource);

        // Get the immediate parent modal (View Classification)
        const immediateParentModal = sourceRow.closest(".modal");

        if (immediateParentModal) {
            // Store immediate parent reference
            updateModalElement.dataset.parentModalId = immediateParentModal.id;

            // Find and store grandparent modal (Edit Payment Item)
            const grandparentModalId =
                immediateParentModal.dataset.parentModalId;
            if (grandparentModalId) {
                updateModalElement.dataset.grandparentModalId =
                    grandparentModalId;
            }
        }

        const updateModal = new bootstrap.Modal(updateModalElement, {
            backdrop: false,
            keyboard: false,
        });

        if (immediateParentModal) {
            // Lower immediate parent z-index
            immediateParentModal.style.zIndex = "1040";

            // Keep grandparent at 1040 too
            const grandparentModalId =
                updateModalElement.dataset.grandparentModalId;
            if (grandparentModalId) {
                const grandparentModal =
                    document.getElementById(grandparentModalId);
                if (grandparentModal) {
                    grandparentModal.style.zIndex = "1040";
                }
            }
            updateModal.show();
        } else {
            updateModal.show();
        }
    }

    // Global cleanup for nested modals - COMPLETE REPLACEMENT
    document.addEventListener("hidden.bs.modal", function (e) {
        const closedModalId = e.target.id;

        // Handle Update Items or Add Items modal closing
        if (
            closedModalId.includes("updateItems") ||
            closedModalId.includes("addItems")
        ) {
            const parentModalId = e.target.dataset.parentModalId;
            if (parentModalId) {
                const parentModal = document.getElementById(parentModalId);
                if (parentModal) {
                    parentModal.style.zIndex = "";
                }
            }
        }
        // Handle View Classification or Show Classification modal closing
        else if (
            closedModalId.includes("viewClassification") ||
            closedModalId.includes("showClassification")
        ) {
            const parentModalId = e.target.dataset.parentModalId;
            if (parentModalId) {
                const parentModal = document.getElementById(parentModalId);
                if (parentModal) {
                    parentModal.style.zIndex = "";
                    parentModal.style.removeProperty("z-index");

                    setTimeout(() => {
                        if (parentModal.style.zIndex === "1040") {
                            parentModal.style.zIndex = "";
                        }
                    }, 100);
                }
            }
        }

        // CRITICAL FIX: Clean up orphaned backdrops ONLY when ALL modals are closed
        setTimeout(() => {
            const visibleModals = document.querySelectorAll(".modal.show");
            const allBackdrops = document.querySelectorAll(".modal-backdrop");

            if (visibleModals.length === 0) {
                allBackdrops.forEach((backdrop) => backdrop.remove());
                document.body.classList.remove("modal-open");
                document.body.style.overflow = "";
                document.body.style.paddingRight = "";

                // Reset all modal z-indexes
                document
                    .querySelectorAll('.modal[style*="z-index"]')
                    .forEach((modal) => {
                        modal.style.zIndex = "";
                        modal.style.removeProperty("z-index");
                    });
            } else {
                // IMPORTANT: Only remove excess backdrops, don't touch if counts match
                const excessBackdrops =
                    allBackdrops.length - visibleModals.length;

                if (excessBackdrops > 0) {
                    console.log("Removing excess backdrops:", excessBackdrops);

                    // Remove excess backdrops from the end
                    for (let i = 0; i < excessBackdrops; i++) {
                        const lastBackdrop = document.querySelector(
                            ".modal-backdrop:last-of-type",
                        );
                        if (lastBackdrop) {
                            lastBackdrop.remove();
                        }
                    }
                }

                // CRITICAL: Ensure body stays in modal state when modals are still open
                if (!document.body.classList.contains("modal-open")) {
                    document.body.classList.add("modal-open");
                }

                // Ensure the topmost visible modal has correct z-index
                if (visibleModals.length === 1) {
                    const topModal = visibleModals[0];
                    if (topModal.style.zIndex === "1040") {
                        topModal.style.zIndex = "";
                        topModal.style.removeProperty("z-index");
                    }
                }
            }
        }, 150);
    });

    // Additional safety: Prevent backdrop duplication when modals open
    document.addEventListener("shown.bs.modal", function (e) {
        setTimeout(() => {
            const visibleModals = document.querySelectorAll(".modal.show");
            const allBackdrops = document.querySelectorAll(".modal-backdrop");

            // Ensure we don't have more backdrops than visible modals
            if (allBackdrops.length > visibleModals.length) {
                const excess = allBackdrops.length - visibleModals.length;
                console.log("Modal shown - removing excess backdrops:", excess);
                for (let i = 0; i < excess; i++) {
                    const lastBackdrop = document.querySelector(
                        ".modal-backdrop:last-of-type",
                    );
                    if (lastBackdrop) {
                        lastBackdrop.remove();
                    }
                }
            }

            // Ensure body stays in modal state
            if (
                visibleModals.length > 0 &&
                !document.body.classList.contains("modal-open")
            ) {
                document.body.classList.add("modal-open");
            }
        }, 100);
    });

    // Emergency cleanup function (call from console if modals get stuck)
    window.forceCleanupModals = function () {
        console.log("Force cleanup triggered");

        document.querySelectorAll(".modal").forEach((modal) => {
            const instance = bootstrap.Modal.getInstance(modal);
            if (instance) {
                instance.hide();
            }
            modal.classList.remove("show");
            modal.style.display = "none";
            modal.style.zIndex = "";
            modal.removeAttribute("aria-modal");
            modal.setAttribute("aria-hidden", "true");
        });

        document
            .querySelectorAll(".modal-backdrop")
            .forEach((backdrop) => backdrop.remove());
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        console.log("Force cleanup completed");
        if (typeof showToast !== "undefined") {
            showToast("All modals cleaned up", "success");
        }
    };

    // Function to populate the update modal with item data (updated for all modal types)
    function populateUpdateModal(modalElement, itemData, modalSource = "add") {
        // Store the original item data for reference with appropriate prefix
        modalElement.dataset[`${modalSource}OriginalItemId`] = itemData.id;
        modalElement.dataset[`${modalSource}OriginalPaymentItemId`] =
            itemData.payment_item_id;
        modalElement.dataset[`${modalSource}OriginalAmount`] = itemData.amount;
        modalElement.dataset[`${modalSource}OriginalPaymentItemName`] =
            itemData.payment_item_name;
        modalElement.dataset.modalSource = modalSource; // Track which modal type this came from

        // Set the amount input
        const amountInput = modalElement.querySelector('input[name="amount"]');
        if (amountInput) {
            amountInput.value = itemData.amount;
        } else {
            showToast("Amount input not found", "error");
        }

        // Handle Select2 initialization and value setting
        const paymentItemSelect = modalElement.querySelector(
            'select[name="update-payment_items"]',
        );
        if (paymentItemSelect) {
            // Destroy existing Select2 instance if it exists
            if (
                typeof $ !== "undefined" &&
                $(paymentItemSelect).hasClass("select2-hidden-accessible")
            ) {
                $(paymentItemSelect).select2("destroy");
            }

            // Set the native select value
            paymentItemSelect.value = itemData.payment_item_id;

            // Reinitialize Select2 with the value
            if (typeof $ !== "undefined") {
                setTimeout(() => {
                    $(paymentItemSelect).select2({
                        dropdownParent: $(modalElement),
                        width: "100%",
                        placeholder: "Select Payment Item", // Add this
                        allowClear: true, // Add this
                    });

                    // Set value again after Select2 initialization
                    $(paymentItemSelect)
                        .val(itemData.payment_item_id)
                        .trigger("change");

                    // Validate form after everything is set
                    setTimeout(() => {
                        validateUpdateForm(modalElement);
                    }, 100);
                }, 100);
            }
        } else {
            showToast("Payment item select not found", "error");
        }
    }

    // Handle Update Items button click functionality (updated for all modal types)
    document.addEventListener("click", function (e) {
        if (
            e.target.matches(".payment-update-btn") &&
            e.target.closest(".modal").id.includes("updateItems")
        ) {
            e.preventDefault();
            e.stopPropagation();

            const modal = e.target.closest(".modal");
            const form = modal.querySelector("form");
            const assignmentId = form.dataset.assignmentId;
            const modalSource = modal.dataset.modalSource || "add"; // Default to 'add' if not set

            // Add a small delay to ensure DOM is stable
            setTimeout(() => {
                // Get form data with enhanced Select2 compatibility
                const paymentItemSelect = modal.querySelector(
                    'select[name="update-payment_items"]',
                );
                const amountInput = modal.querySelector('input[name="amount"]');

                let paymentItemValue = "";
                let paymentItemName = "";

                if (paymentItemSelect) {
                    // Try multiple methods to get the value
                    if (typeof $ !== "undefined") {
                        // Check if it's a Select2 element
                        if (
                            $(paymentItemSelect).hasClass(
                                "select2-hidden-accessible",
                            )
                        ) {
                            paymentItemValue = $(paymentItemSelect).val();
                            // Get the text from Select2
                            const select2Data =
                                $(paymentItemSelect).select2("data");
                            if (select2Data && select2Data[0]) {
                                paymentItemName = select2Data[0].text;
                            }
                        } else {
                            paymentItemValue = paymentItemSelect.value;
                            const selectedOption =
                                paymentItemSelect.options[
                                    paymentItemSelect.selectedIndex
                                ];
                            paymentItemName = selectedOption
                                ? selectedOption.text
                                : "";
                        }
                    } else {
                        // Fallback for non-jQuery environments
                        paymentItemValue = paymentItemSelect.value;
                        const selectedOption =
                            paymentItemSelect.options[
                                paymentItemSelect.selectedIndex
                            ];
                        paymentItemName = selectedOption
                            ? selectedOption.text
                            : "";
                    }
                }

                // Get amount value
                let amountValue = amountInput
                    ? parseFloat(amountInput.value)
                    : 0;

                // If form reading fails, use stored data as fallback with correct prefix
                if (
                    (!paymentItemValue || paymentItemValue === "") &&
                    modal.dataset[`${modalSource}OriginalPaymentItemId`]
                ) {
                    paymentItemValue =
                        modal.dataset[`${modalSource}OriginalPaymentItemId`];
                    paymentItemName =
                        modal.dataset[
                            `${modalSource}OriginalPaymentItemName`
                        ] || "";
                }

                if (
                    (isNaN(amountValue) || amountValue <= 0) &&
                    modal.dataset[`${modalSource}OriginalAmount`]
                ) {
                    const fallbackAmount = parseFloat(
                        modal.dataset[`${modalSource}OriginalAmount`],
                    );
                    if (!isNaN(fallbackAmount) && fallbackAmount > 0) {
                        // Don't override if user actually changed the amount
                        if (!amountInput.value || amountInput.value === "") {
                            amountValue = fallbackAmount;
                        }
                    }
                }

                // Enhanced validation with better error messages
                if (
                    !paymentItemValue ||
                    paymentItemValue === "" ||
                    paymentItemValue === null
                ) {
                    console.error("Payment item validation failed");
                    showToast("Please select a payment item", "error");
                    return;
                }

                if (
                    !amountInput ||
                    (!amountInput.value &&
                        !modal.dataset[`${modalSource}OriginalAmount`])
                ) {
                    console.error("Amount input validation failed");
                    showToast("Please enter an amount", "error");
                    return;
                }

                const finalAmountValue =
                    amountInput && amountInput.value
                        ? parseFloat(amountInput.value)
                        : parseFloat(
                              modal.dataset[`${modalSource}OriginalAmount`],
                          );

                if (isNaN(finalAmountValue) || finalAmountValue <= 0) {
                    console.error("Amount value validation failed");
                    alert("Please enter a valid amount greater than 0");
                    return;
                }

                const formData = {
                    payment_item_id: paymentItemValue,
                    payment_item_name:
                        paymentItemName ||
                        modal.dataset[
                            `${modalSource}OriginalPaymentItemName`
                        ] ||
                        "",
                    amount: finalAmountValue,
                    original_item_id:
                        modal.dataset[`${modalSource}OriginalItemId`],
                    modalSource: modalSource,
                };

                // Update the corresponding row in the classification items table
                updateClassificationItemRow(assignmentId, modal, formData);

                // Close the modal
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }

                // Show success message
                showToast("Item edited successfully!", "success");
            }, 50); // Small delay to ensure DOM stability
        }
    });

    // Enhanced modal show event to ensure proper initialization
    document.addEventListener("show.bs.modal", function (e) {
        if (e.target.id.includes("updateItems")) {
            // Initialize Select2 if not already initialized
            setTimeout(() => {
                const selects = e.target.querySelectorAll(
                    'select[name="update-payment_items"]',
                );
                selects.forEach((select) => {
                    if (
                        typeof $ !== "undefined" &&
                        !$(select).hasClass("select2-hidden-accessible")
                    ) {
                        $(select).select2({
                            dropdownParent: $(e.target),
                            width: "100%",
                        });
                    }
                });
            }, 100);
        }
    });

    // Function to update the classification item row (UPDATED for all modal types including VIEW)
    function updateClassificationItemRow(assignmentId, updateModal, formData) {
        const modalSource = formData.modalSource || "add";

        let classificationModal,
            tableBody,
            tableSelector,
            inputNamePattern,
            amountDisplayClass;

        // Handle all three modal types
        if (modalSource === "view") {
            classificationModal = document.getElementById(
                `viewClassification${assignmentId}`,
            );
            tableSelector = ".view-classification-items-table tbody";
            inputNamePattern = "view_items";
            amountDisplayClass = "view-item-amount-display";
        } else if (modalSource === "show") {
            classificationModal = document.getElementById(
                `showClassification${assignmentId}`,
            );
            tableSelector = ".show-classification-items-table tbody";
            inputNamePattern = "show_items";
            amountDisplayClass = "show-item-amount-display";
        } else {
            classificationModal = document.getElementById(
                `addClassification${assignmentId}`,
            );
            tableSelector = ".classification-items-table tbody";
            inputNamePattern = "items";
            amountDisplayClass = "item-amount-display";
        }

        if (!classificationModal) {
            showToast(
                `Classification modal not found for source: ${modalSource}`,
                "error",
            );
            return;
        }

        tableBody = classificationModal.querySelector(tableSelector);
        if (!tableBody) {
            showToast(
                `Table body not found for source: ${modalSource}`,
                "error",
            );
            return;
        }

        // Find the row that contains the original item ID
        const originalItemId = formData.original_item_id;
        let targetRow = null;
        let rowIndex = 0;

        // Search for the row with matching item ID
        Array.from(tableBody.children).forEach((row, index) => {
            const hiddenIdInput = row.querySelector(
                `input[name*="${inputNamePattern}"][name*="[id]"]`,
            );
            if (hiddenIdInput && hiddenIdInput.value === originalItemId) {
                targetRow = row;
                rowIndex = index;
            }
        });

        if (targetRow) {
            // Update the row content with appropriate naming
            const removeButtonClass =
                modalSource === "view"
                    ? "view-remove-item"
                    : modalSource === "show"
                      ? "show-remove-item"
                      : "remove-item";

            targetRow.innerHTML = `
            <td>
                <input type="hidden" name="${inputNamePattern}[${rowIndex}][id]" value="${formData.original_item_id}">
                <input type="hidden" name="${inputNamePattern}[${rowIndex}][payment_item_id]" value="${formData.payment_item_id}">
                <span>${formData.payment_item_name}</span>
            </td>
            <td class="${amountDisplayClass}">${formData.amount.toFixed(2)}</td>
            <td>
                <button type="button" class="btn btn-sm btn-danger ${removeButtonClass}">
                    <i class="bx bx-trash"></i>
                </button>
            </td>
            `;

            // Re-add event listener for the remove button
            const removeBtn = targetRow.querySelector(`.${removeButtonClass}`);
            if (removeBtn) {
                removeBtn.addEventListener("click", function () {
                    targetRow.remove();
                    updateTotalAmount(classificationModal, modalSource);
                    updateMainClassificationTable(assignmentId, modalSource);
                });
            }

            // Update total amount in classification items table
            updateTotalAmount(classificationModal, modalSource);

            // Update main classification table
            updateMainClassificationTable(assignmentId, modalSource);
        } else {
            showToast(
                "Target row not found for item ID:",
                originalItemId,
                "error",
            );
        }
    }

    // Function to update main classification table (updated for all modal types)
    function updateMainClassificationTable(assignmentId, modalSource = null) {
        // Find the main modal that contains the classification table
        const mainModal = document.getElementById(
            `updateFeeAssignment${assignmentId}`,
        );
        if (!mainModal) {
            showToast("Main fee assignment modal not found", "error");
            return;
        }

        const classificationTable = mainModal.querySelector(
            ".classification-table tbody",
        );
        if (!classificationTable) {
            showToast("Main classification table not found", "error");
            return;
        }

        // Try to get the correct classification modal based on modalSource first
        let classificationModal;
        if (modalSource === "view") {
            classificationModal = document.getElementById(
                `viewClassification${assignmentId}`,
            );
        } else if (modalSource === "show") {
            classificationModal = document.getElementById(
                `showClassification${assignmentId}`,
            );
        } else if (modalSource === "add") {
            classificationModal = document.getElementById(
                `addClassification${assignmentId}`,
            );
        } else {
            // Fallback to original logic if modalSource is not provided
            const viewClassificationModal = document.getElementById(
                `viewClassification${assignmentId}`,
            );
            const showClassificationModal = document.getElementById(
                `showClassification${assignmentId}`,
            );
            const addClassificationModal = document.getElementById(
                `addClassification${assignmentId}`,
            );
            classificationModal =
                viewClassificationModal ||
                showClassificationModal ||
                addClassificationModal;
        }

        if (!classificationModal) {
            showToast("No classification modal found", "error");
            return;
        }

        // Get classification and mode of payment info (try all selector types)
        let classificationSelect =
            classificationModal.querySelector(
                ".view-classification-dropdown",
            ) ||
            classificationModal.querySelector(".show-classification-select") ||
            classificationModal.querySelector(".classification-select");
        let modeOfPaymentSelect =
            classificationModal.querySelector(".view-payment-mode-dropdown") ||
            classificationModal.querySelector(".show-mode-of-payment-select") ||
            classificationModal.querySelector(".mode-of-payment-select");

        if (!classificationSelect || !modeOfPaymentSelect) {
            console.error("Classification or mode of payment select not found");
            return;
        }

        const classificationValue = classificationSelect.value;
        const modeOfPaymentValue = modeOfPaymentSelect.value;

        if (!classificationValue || !modeOfPaymentValue) {
            showToast(
                "Classification or mode of payment not selected, skipping main table update",
                "error",
            );
            return;
        }

        // Get classification and mode of payment names
        const classificationName =
            classificationSelect.options[classificationSelect.selectedIndex]
                ?.text || "";
        const modeOfPaymentName =
            modeOfPaymentSelect.options[modeOfPaymentSelect.selectedIndex]
                ?.text || "";

        // Calculate total amount from classification items (try all classes)
        const itemAmounts = classificationModal.querySelectorAll(
            ".view-item-amount-display, .show-item-amount-display, .item-amount-display",
        );
        let totalAmount = 0;
        itemAmounts.forEach((amountElement) => {
            totalAmount += parseFloat(amountElement.textContent) || 0;
        });

        // Find the corresponding row in main classification table
        let mainTableRow = null;
        const mainTableRows = classificationTable.querySelectorAll(
            "tr.show-classification-items",
        );

        mainTableRows.forEach((row) => {
            const rowClassificationId = row.getAttribute(
                "data-classification-id",
            );
            const rowModeOfPaymentId = row.getAttribute(
                "data-mode-of-payment-id",
            );

            if (
                rowClassificationId === classificationValue &&
                rowModeOfPaymentId === modeOfPaymentValue
            ) {
                mainTableRow = row;
            }
        });

        if (mainTableRow) {
            // Update existing row
            const cells = mainTableRow.querySelectorAll("td");
            if (cells.length >= 3) {
                cells[0].textContent = classificationName;
                cells[1].textContent = modeOfPaymentName;
                cells[2].textContent = `₱${totalAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`;
            }

            // Update data attributes
            mainTableRow.setAttribute(
                "data-classification-name",
                classificationName,
            );
            mainTableRow.setAttribute(
                "data-mode-of-payment-name",
                modeOfPaymentName,
            );

            // Update items data attribute (try all table types)
            const itemsData = [];
            const viewClassificationItems =
                classificationModal.querySelectorAll(
                    ".view-classification-items-table tbody tr",
                );
            const showClassificationItems =
                classificationModal.querySelectorAll(
                    ".show-classification-items-table tbody tr",
                );
            const addClassificationItems = classificationModal.querySelectorAll(
                ".classification-items-table tbody tr",
            );

            const classificationItems =
                viewClassificationItems.length > 0
                    ? viewClassificationItems
                    : showClassificationItems.length > 0
                      ? showClassificationItems
                      : addClassificationItems;

            classificationItems.forEach((itemRow) => {
                // Try all input name patterns
                const idInput =
                    itemRow.querySelector(
                        'input[name*="view_items"][name*="[id]"]',
                    ) ||
                    itemRow.querySelector(
                        'input[name*="show_items"][name*="[id]"]',
                    ) ||
                    itemRow.querySelector('input[name*="items"][name*="[id]"]');
                const paymentItemIdInput =
                    itemRow.querySelector(
                        'input[name*="view_items"][name*="[payment_item_id]"]',
                    ) ||
                    itemRow.querySelector(
                        'input[name*="show_items"][name*="[payment_item_id]"]',
                    ) ||
                    itemRow.querySelector(
                        'input[name*="items"][name*="[payment_item_id]"]',
                    );
                const nameSpan = itemRow.querySelector("td:first-child span");
                const amountCell = itemRow.querySelector(
                    ".view-item-amount-display, .show-item-amount-display, .item-amount-display",
                );

                if (idInput && paymentItemIdInput && nameSpan && amountCell) {
                    itemsData.push({
                        id: idInput.value,
                        payment_item_id: paymentItemIdInput.value,
                        payment_item_name: nameSpan.textContent.trim(),
                        amount: parseFloat(amountCell.textContent) || 0,
                    });
                }
            });

            mainTableRow.setAttribute("data-items", JSON.stringify(itemsData));
        } else {
            showToast(
                "Main table row not found, might be a new classification",
                "error",
            );
        }

        // Update main table total
        updateMainTableTotal(assignmentId);
    }

    // Function to update the main table total
    function updateMainTableTotal(assignmentId) {
        const mainModal = document.getElementById(
            `updateFeeAssignment${assignmentId}`,
        );
        if (!mainModal) return;

        const classificationTable = mainModal.querySelector(
            ".classification-table tbody",
        );
        if (!classificationTable) return;

        // Find the total row
        const totalRow = classificationTable.querySelector("tr.table-info");
        if (!totalRow) return;

        // Calculate total from all classification rows
        let grandTotal = 0;
        const dataRows = classificationTable.querySelectorAll(
            "tr.show-classification-items",
        );

        dataRows.forEach((row) => {
            const amountCell = row.querySelector("td:nth-child(3)");
            if (amountCell) {
                const amountText = amountCell.textContent
                    .replace("₱", "")
                    .replace(/,/g, "");
                grandTotal += parseFloat(amountText) || 0;
            }
        });

        // Update total row
        const totalCell = totalRow.querySelector("td:last-child strong");
        if (totalCell) {
            totalCell.textContent = `₱${grandTotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
        }
    }

    // Function to update total amount in classification modal (updated for all modal types)
    function updateTotalAmount(modal, modalSource = "add") {
        let totalSelector, amountSelector;

        if (modalSource === "view") {
            totalSelector = ".view-total-amount";
            amountSelector = ".view-item-amount-display";
        } else if (modalSource === "show") {
            totalSelector = ".show-total-amount";
            amountSelector = ".show-item-amount-display";
        } else {
            totalSelector = ".total-amount";
            amountSelector = ".item-amount-display";
        }

        const totalElement = modal.querySelector(totalSelector);
        if (!totalElement) return;

        const amountDisplays = modal.querySelectorAll(amountSelector);
        let total = 0;

        amountDisplays.forEach((display) => {
            total += parseFloat(display.textContent) || 0;
        });

        totalElement.textContent = `₱ ${total.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    }

    // Function to validate update form
    function validateUpdateForm(modal) {
        const saveBtn = modal.querySelector(".payment-update-btn");
        const paymentItemSelect = modal.querySelector(
            'select[name="update-payment_items"]',
        );
        const amountInput = modal.querySelector('input[name="amount"]');

        if (saveBtn) {
            // Get actual values, accounting for Select2
            let paymentItemValue = "";
            if (paymentItemSelect) {
                if (
                    typeof $ !== "undefined" &&
                    $(paymentItemSelect).hasClass("select2-hidden-accessible")
                ) {
                    paymentItemValue = $(paymentItemSelect).val();
                } else {
                    paymentItemValue = paymentItemSelect.value;
                }
            }

            const hasPaymentItem = paymentItemValue && paymentItemValue !== "";
            const amountValue = amountInput ? parseFloat(amountInput.value) : 0;
            const hasAmount =
                amountInput && amountInput.value !== "" && amountValue > 0;

            const isValid = hasPaymentItem && hasAmount;
            saveBtn.disabled = !isValid;

            if (isValid) {
                saveBtn.textContent = "Update";
            }
        }
    }

    // Validation for Update Items modal - input events
    document.addEventListener("input", function (e) {
        if (
            e.target.matches('input[name="amount"]') &&
            e.target.closest(".modal").id.includes("updateItems")
        ) {
            setTimeout(() => {
                validateUpdateForm(e.target.closest(".modal"));
            }, 10);
        }
    });

    // Validation for Update Items modal - change events
    document.addEventListener("change", function (e) {
        if (
            e.target.matches('select[name="update-payment_items"]') &&
            e.target.closest(".modal").id.includes("updateItems")
        ) {
            setTimeout(() => {
                validateUpdateForm(e.target.closest(".modal"));
            }, 10);
        }
    });

    // Enhanced event listeners for Select2 compatibility
    if (typeof $ !== "undefined") {
        $(document).on(
            "select2:select select2:unselect",
            'select[name="update-payment_items"]',
            function (e) {
                const modal = $(this).closest(".modal")[0];
                if (modal && modal.id.includes("updateItems")) {
                    setTimeout(() => {
                        validateUpdateForm(modal);
                    }, 10);
                }
            },
        );
    }

    // Unified function to check and update button states
    function updateViewModalButtons(modal) {
        const classificationDropdown = modal.querySelector(
            ".view-classification-dropdown",
        );
        const paymentModeDropdown = modal.querySelector(
            ".view-payment-mode-dropdown",
        );
        const addItemsBtn = modal.querySelector(".view-add-items-btn");
        const saveBtn = modal.querySelector(".view-update-btn");

        const hasClassification =
            classificationDropdown && classificationDropdown.value;
        const hasPaymentMode = paymentModeDropdown && paymentModeDropdown.value;

        // Add Items button - enabled only if classification is selected
        if (addItemsBtn) {
            addItemsBtn.disabled = !hasClassification;
        }

        // Save button - enabled only if both are selected
        if (saveBtn) {
            saveBtn.disabled = !(hasClassification && hasPaymentMode);
        }
    }

    // Native change events
    document.addEventListener("change", function (e) {
        if (
            e.target.matches(".view-classification-dropdown") ||
            e.target.matches(".view-payment-mode-dropdown")
        ) {
            const modal = e.target.closest(".modal");
            if (modal) {
                updateViewModalButtons(modal);
            }
        }
    });

    // Select2 events (for clearing/unselecting)
    if (typeof $ !== "undefined") {
        $(document).on(
            "select2:clear select2:unselect select2:select",
            ".view-classification-dropdown, .view-payment-mode-dropdown",
            function (e) {
                const modal = $(this).closest(".modal")[0];
                if (modal) {
                    updateViewModalButtons(modal);
                }
            },
        );
    }

    // Handle add items button for view modal
    document.addEventListener("click", function (e) {
        if (e.target.matches(".view-add-items-btn")) {
            const assignmentId = e.target.dataset.id;
            const addItemModal = document.getElementById(
                `addItems${assignmentId}`,
            );

            if (addItemModal) {
                const modal = new bootstrap.Modal(addItemModal);
                modal.show();
            }
        }
    });
});

// Handle Add Items Modal for View Classification
document.addEventListener("DOMContentLoaded", function () {
    // Handle clicking the "Add Item" button in View Classification modal
    document.addEventListener("click", function (e) {
        if (
            e.target.matches(".view-add-items-btn") ||
            e.target.closest(".view-add-items-btn")
        ) {
            const button = e.target.matches(".view-add-items-btn")
                ? e.target
                : e.target.closest(".view-add-items-btn");
            const assignmentId = button.dataset.id;
            const addItemModalEl = document.getElementById(
                `addItems${assignmentId}`,
            );

            if (!addItemModalEl) {
                showToast("Add Items modal not found", "error");
                return;
            }

            // Get the View Classification modal (immediate parent)
            const viewClassificationModalEl = button.closest(".modal");
            if (viewClassificationModalEl) {
                // Store parent reference
                addItemModalEl.dataset.parentModalId =
                    viewClassificationModalEl.id;

                // Get grandparent (Edit Payment Item modal) if exists
                const grandparentModalId =
                    viewClassificationModalEl.dataset.parentModalId;
                if (grandparentModalId) {
                    addItemModalEl.dataset.grandparentModalId =
                        grandparentModalId;
                }
            }

            // Show Add Items modal with proper z-index stacking
            const addItemModal = new bootstrap.Modal(addItemModalEl, {
                backdrop: false,
                keyboard: false,
            });

            // Set z-index hierarchy
            if (viewClassificationModalEl) {
                const grandparentModalId =
                    addItemModalEl.dataset.grandparentModalId;
                if (grandparentModalId) {
                    const grandparentModal =
                        document.getElementById(grandparentModalId);
                    if (grandparentModal) {
                        grandparentModal.style.zIndex = "1040";
                    }
                }
                viewClassificationModalEl.style.zIndex = "1050";
                addItemModalEl.style.zIndex = "1060";
            }

            addItemModal.show();

            // Restore z-index when Add Items modal closes
            addItemModalEl.addEventListener(
                "hidden.bs.modal",
                function () {
                    if (viewClassificationModalEl) {
                        viewClassificationModalEl.style.zIndex = "1050";
                    }
                },
                {
                    once: true,
                },
            );
        }
    });

    // Handle clicking the "Add" button in Add Items modal
    document.addEventListener("click", function (e) {
        if (
            e.target.matches(".add-payment-save-btn") ||
            e.target.closest(".add-payment-save-btn")
        ) {
            e.preventDefault();

            const button = e.target.matches(".add-payment-save-btn")
                ? e.target
                : e.target.closest(".add-payment-save-btn");
            const currentModal = button.closest(".modal");
            const form = button.closest("form");

            if (!currentModal || !form) {
                showToast("Modal or form not found", "error");
                return;
            }

            const assignmentId = form.getAttribute("data-assignment-id");
            if (!assignmentId) {
                showToast("Assignment ID not found", "error");
                return;
            }

            const paymentItemSelect = currentModal.querySelector(
                ".add-paymentItem-select",
            );
            const amountInput = currentModal.querySelector(".amount-select");

            // Validate inputs
            if (!paymentItemSelect || !amountInput) {
                showToast("Required form elements not found", "error");
                return;
            }

            if (!paymentItemSelect.value || !amountInput.value) {
                showToast("Please fill in all required fields", "error");
                return;
            }

            const amount = parseFloat(amountInput.value);
            if (amount <= 0) {
                showToast(
                    "Please enter a valid amount greater than 0",
                    "error",
                );
                return;
            }

            // Get selected item details
            const itemId = paymentItemSelect.value;
            const selectedOption =
                paymentItemSelect.options[paymentItemSelect.selectedIndex];
            const itemName =
                selectedOption.getAttribute("data-name") || selectedOption.text;

            // Add item to View Classification table and check if successful
            const success = addItemToViewClassificationTable(
                assignmentId,
                itemId,
                itemName,
                amount,
            );

            // Only show success message and close modal if item was added successfully
            if (success) {
                // Close Add Items modal
                const bsModal = bootstrap.Modal.getInstance(currentModal);
                if (bsModal) {
                    bsModal.hide();
                }

                // Clear form
                clearAddItemsForm(currentModal);

                showToast("Item added successfully!", "success");
            }
            // If not successful, the function already showed the appropriate error/warning message
        }
    });

    // Function to add item to View Classification table
    function addItemToViewClassificationTable(
        assignmentId,
        itemId,
        itemName,
        amount,
    ) {
        const viewClassificationModal = document.getElementById(
            `viewClassification${assignmentId}`,
        );
        if (!viewClassificationModal) {
            showToast("View Classification modal not found", "error");
            return false; // Return false to indicate failure
        }

        const tableBody = viewClassificationModal.querySelector(
            ".view-classification-items-table tbody",
        );
        if (!tableBody) {
            showToast("Table body not found", "error");
            return false; // Return false to indicate failure
        }

        // Check if item already exists
        const existingRows = tableBody.querySelectorAll("tr");
        let itemExists = false;

        existingRows.forEach((row) => {
            const paymentItemInput = row.querySelector(
                'input[name*="view_items"][name*="[payment_item_id]"]',
            );
            if (paymentItemInput && paymentItemInput.value === itemId) {
                itemExists = true;
            }
        });

        if (itemExists) {
            showToast("Already exists in the list", "error");
            return false; // Return false to indicate failure
        }

        // Get current row count for proper indexing
        const currentRowCount = existingRows.length;

        // Create new row
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
        <td>
            <input type="hidden" name="view_items[${currentRowCount}][id]" value="">
            <input type="hidden" name="view_items[${currentRowCount}][payment_item_id]" value="${itemId}">
            <span>${itemName}</span>
        </td>
        <td class="view-item-amount-display">${parseFloat(amount).toFixed(2)}</td>
        <td>
            <button type="button" class="btn btn-sm btn-danger view-remove-item">
                <i class="bx bx-trash"></i>
            </button>
        </td>
    `;

        tableBody.appendChild(newRow);

        // Attach remove button event
        const removeBtn = newRow.querySelector(".view-remove-item");
        if (removeBtn) {
            removeBtn.addEventListener("click", function () {
                newRow.remove();
                updateViewClassificationTotal(assignmentId);
                updateMainClassificationTableFromView(assignmentId);
            });
        }

        // Update total
        updateViewClassificationTotal(assignmentId);

        // Update main classification table
        updateMainClassificationTableFromView(assignmentId);

        // Enable save button
        const saveBtn =
            viewClassificationModal.querySelector(".view-update-btn");
        if (saveBtn) {
            saveBtn.disabled = false;
        }

        return true; // Return true to indicate success
    }

    // Function to update View Classification total
    function updateViewClassificationTotal(assignmentId) {
        const viewClassificationModal = document.getElementById(
            `viewClassification${assignmentId}`,
        );
        if (!viewClassificationModal) return;

        const amountDisplays = viewClassificationModal.querySelectorAll(
            ".view-item-amount-display",
        );
        let total = 0;

        amountDisplays.forEach((display) => {
            total += parseFloat(display.textContent) || 0;
        });

        const totalElement =
            viewClassificationModal.querySelector(".view-total-amount");
        if (totalElement) {
            totalElement.textContent = `₱ ${total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
        }
    }

    // Function to update main classification table from View modal
    function updateMainClassificationTableFromView(assignmentId) {
        const mainModal = document.getElementById(
            `updateFeeAssignment${assignmentId}`,
        );
        if (!mainModal) return;

        const classificationTable = mainModal.querySelector(
            ".classification-table tbody",
        );
        if (!classificationTable) return;

        const viewClassificationModal = document.getElementById(
            `viewClassification${assignmentId}`,
        );
        if (!viewClassificationModal) return;

        // Get classification and mode of payment values
        const classificationSelect = viewClassificationModal.querySelector(
            ".view-classification-dropdown",
        );
        const modeOfPaymentSelect = viewClassificationModal.querySelector(
            ".view-payment-mode-dropdown",
        );

        if (!classificationSelect || !modeOfPaymentSelect) return;

        const classificationValue = classificationSelect.value;
        const modeOfPaymentValue = modeOfPaymentSelect.value;

        if (!classificationValue || !modeOfPaymentValue) return;

        const classificationName =
            classificationSelect.options[classificationSelect.selectedIndex]
                ?.text || "";
        const modeOfPaymentName =
            modeOfPaymentSelect.options[modeOfPaymentSelect.selectedIndex]
                ?.text || "";

        // Calculate total
        const amountDisplays = viewClassificationModal.querySelectorAll(
            ".view-item-amount-display",
        );
        let totalAmount = 0;
        amountDisplays.forEach((display) => {
            totalAmount += parseFloat(display.textContent) || 0;
        });

        // Find and update the corresponding row
        let mainTableRow = null;
        const mainTableRows = classificationTable.querySelectorAll(
            "tr.show-classification-items",
        );

        mainTableRows.forEach((row) => {
            const rowClassificationId = row.getAttribute(
                "data-classification-id",
            );
            const rowModeOfPaymentId = row.getAttribute(
                "data-mode-of-payment-id",
            );

            if (
                rowClassificationId === classificationValue &&
                rowModeOfPaymentId === modeOfPaymentValue
            ) {
                mainTableRow = row;
            }
        });

        if (mainTableRow) {
            // Update row data
            const cells = mainTableRow.querySelectorAll("td");
            if (cells.length >= 3) {
                cells[2].textContent = `₱${totalAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`;
            }

            // Update items data attribute
            const itemsData = [];
            const viewItems = viewClassificationModal.querySelectorAll(
                ".view-classification-items-table tbody tr",
            );

            viewItems.forEach((itemRow) => {
                const idInput = itemRow.querySelector(
                    'input[name*="view_items"][name*="[id]"]',
                );
                const paymentItemIdInput = itemRow.querySelector(
                    'input[name*="view_items"][name*="[payment_item_id]"]',
                );
                const nameSpan = itemRow.querySelector("td:first-child span");
                const amountCell = itemRow.querySelector(
                    ".view-item-amount-display",
                );

                if (paymentItemIdInput && nameSpan && amountCell) {
                    itemsData.push({
                        id: idInput ? idInput.value : "",
                        payment_item_id: paymentItemIdInput.value,
                        payment_item_name: nameSpan.textContent.trim(),
                        amount: parseFloat(amountCell.textContent) || 0,
                    });
                }
            });

            mainTableRow.setAttribute("data-items", JSON.stringify(itemsData));
        }

        // Update main table total
        updateMainTableTotalFromView(assignmentId);
    }

    // Function to update main table total
    function updateMainTableTotalFromView(assignmentId) {
        const mainModal = document.getElementById(
            `updateFeeAssignment${assignmentId}`,
        );
        if (!mainModal) return;

        const classificationTable = mainModal.querySelector(
            ".classification-table tbody",
        );
        if (!classificationTable) return;

        const totalRow = classificationTable.querySelector("tr.table-info");
        if (!totalRow) return;

        let grandTotal = 0;
        const dataRows = classificationTable.querySelectorAll(
            "tr.show-classification-items",
        );

        dataRows.forEach((row) => {
            const amountCell = row.querySelector("td:nth-child(3)");
            if (amountCell) {
                const amountText = amountCell.textContent
                    .replace("₱", "")
                    .replace(/,/g, "");
                grandTotal += parseFloat(amountText) || 0;
            }
        });

        const totalCell = totalRow.querySelector("td:last-child strong");
        if (totalCell) {
            totalCell.textContent = `₱${grandTotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
        }
    }

    // Function to clear Add Items form
    function clearAddItemsForm(modal) {
        const paymentItemSelect = modal.querySelector(
            ".add-paymentItem-select",
        );
        const amountInput = modal.querySelector(".amount-select");
        const saveBtn = modal.querySelector(".add-payment-save-btn");

        if (paymentItemSelect) {
            $(paymentItemSelect).val("").trigger("change");
        }
        if (amountInput) {
            amountInput.value = "";
        }
        if (saveBtn) {
            saveBtn.disabled = true;
        }
    }

    // Setup validation for Add Items modal
    $(document).on("shown.bs.modal", '[id^="addItems"]', function () {
        const modal = this;
        clearAddItemsForm(modal);
        setupAddItemsValidation(modal);
    });

    // Function to setup validation
    function setupAddItemsValidation(modal) {
        const paymentItemSelect = modal.querySelector(
            ".add-paymentItem-select",
        );
        const amountInput = modal.querySelector(".amount-select");
        const saveBtn = modal.querySelector(".add-payment-save-btn");

        if (!paymentItemSelect || !amountInput || !saveBtn) return;

        function validateForm() {
            const amount = parseFloat(amountInput.value) || 0;
            const hasItem = paymentItemSelect.value;
            const hasValidAmount = amount > 0;

            saveBtn.disabled = !(hasItem && hasValidAmount);
        }

        // Remove existing listeners
        $(paymentItemSelect).off("change.addItemValidation");
        amountInput.removeEventListener("input", validateForm);

        // Add new listeners
        $(paymentItemSelect).on("change.addItemValidation", validateForm);
        amountInput.addEventListener("input", validateForm);

        // Initial validation
        validateForm();
    }
});

// Reusable Toast Notification Function using Notyf
function showToast(message, type = "success", options = {}) {
    if (typeof window.notyf === "undefined") {
        console.error(
            "Notyf instance not found. Make sure Notyf is initialized.",
        );
        return;
    }

    const defaultOptions = {
        duration: 6000,
        dismissible: true,
        ripple: true,
        position: {
            x: "right",
            y: "top",
        },
    };

    const finalOptions = {
        ...defaultOptions,
        ...options,
        type: type.toLowerCase(),
        message: message,
    };

    window.notyf.open(finalOptions);
}

function showDeleteConfirmation(options = {}) {
    if (typeof Swal === "undefined") {
        console.error("SweetAlert2 (Swal) not found. Make sure it is loaded.");
        return;
    }

    // Get the highest z-index from modals
    const modals = document.querySelectorAll(
        ".modal.show, .modal-backdrop.show",
    );
    let highestZIndex = 1050; // Bootstrap modal default z-index

    modals.forEach((modal) => {
        const zIndex = parseInt(window.getComputedStyle(modal).zIndex) || 0;
        if (zIndex > highestZIndex) {
            highestZIndex = zIndex;
        }
    });

    const defaults = {
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        // Set z-index higher than modals
        customClass: {
            container: "swal2-container-higher-z",
        },
    };

    const config = {
        ...defaults,
        ...options,
    };

    // Inject custom styles for z-index if inside modal
    if (modals.length > 0) {
        const styleId = "swal2-modal-fix";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = `
                .swal2-container-higher-z {
                    z-index: ${highestZIndex + 10} !important;
                }
                .swal2-container-higher-z .swal2-popup {
                    z-index: ${highestZIndex + 11} !important;
                }
            `;
            document.head.appendChild(style);
        } else {
            // Update existing style
            document.getElementById(styleId).textContent = `
                .swal2-container-higher-z {
                    z-index: ${highestZIndex + 10} !important;
                }
                .swal2-container-higher-z .swal2-popup {
                    z-index: ${highestZIndex + 11} !important;
                }
            `;
        }
    }

    Swal.fire({
        title: config.title,
        text: config.text,
        icon: config.icon,
        showCancelButton: config.showCancelButton,
        confirmButtonText: config.confirmButtonText,
        cancelButtonText: config.cancelButtonText,
        reverseButtons: config.reverseButtons,
        confirmButtonColor: config.confirmButtonColor,
        cancelButtonColor: config.cancelButtonColor,
        customClass: config.customClass,
    }).then((result) => {
        if (result.isConfirmed) {
            if (config.onConfirm && typeof config.onConfirm === "function") {
                config.onConfirm();
            } else if (config.url) {
                submitDeleteForm(
                    config.url,
                    config.method || "POST",
                    config.extraData,
                );
            }
        } else if (
            result.isDismissed &&
            config.onCancel &&
            typeof config.onCancel === "function"
        ) {
            config.onCancel();
        }
    });
}

function submitDeleteForm(url, method = "POST", extraData = {}) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;

    // CSRF token for Laravel
    const csrfToken = document.querySelector('meta[name="csrf-token"]');
    if (csrfToken) {
        const csrfInput = document.createElement("input");
        csrfInput.type = "hidden";
        csrfInput.name = "_token";
        csrfInput.value = csrfToken.content;
        form.appendChild(csrfInput);
    }

    // Method spoofing for Laravel (DELETE, PUT, etc.)
    if (method !== "POST") {
        const methodInput = document.createElement("input");
        methodInput.type = "hidden";
        methodInput.name = "_method";
        methodInput.value = method;
        form.appendChild(methodInput);
    }

    // Add extra data
    for (const [key, value] of Object.entries(extraData)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
}

function initDeleteButtons(selector = ".btn-delete") {
    document.querySelectorAll(selector).forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const url =
                this.getAttribute("data-delete-url") ||
                this.getAttribute("data-url");
            const title =
                this.getAttribute("data-delete-title") || "Are you sure?";
            const description =
                this.getAttribute("data-delete-description") ||
                this.getAttribute("data-description");
            const text =
                this.getAttribute("data-delete-text") ||
                (description
                    ? `Do you want to delete "${description}"?`
                    : "You won't be able to revert this!");
            const method = this.getAttribute("data-delete-method") || "DELETE";

            if (!url) {
                return;
            }

            showDeleteConfirmation({
                url: url,
                title: title,
                text: text,
                method: method,
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Initialize Notyf
    class CustomNotyf extends Notyf {
        _renderNotification(n) {
            const el = super._renderNotification(n);
            if (n.message) el.message.innerHTML = n.message;
            return el;
        }
    }

    window.notyf = new CustomNotyf({
        dismissible: true,
        ripple: true,
        duration: 6000,
        position: {
            x: "right",
            y: "top",
        },
        types: [
            {
                type: "success",
                background: "var(--bs-success)",
                className: "notyf__success",
                icon: {
                    className: "custom-success-icon",
                    tagName: "span",
                },
            },
            {
                type: "error",
                background: "var(--bs-danger)",
                className: "notyf__error",
                icon: {
                    className: "custom-error-icon",
                    tagName: "span",
                },
            },
            {
                type: "warning",
                background: "var(--bs-warning)",
                className: "notyf__warning",
                icon: {
                    className: "custom-warning-icon",
                    tagName: "span",
                },
            },
        ],
    });

    // Auto-initialize delete buttons on page load
    initDeleteButtons();
});

// Make functions globally available
window.showToast = showToast;
window.showDeleteConfirmation = showDeleteConfirmation;
window.submitDeleteForm = submitDeleteForm;
window.initDeleteButtons = initDeleteButtons;
