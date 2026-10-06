document.addEventListener("DOMContentLoaded", function () {
    // Add CSS for pointer cursor on classification items table
    const style = document.createElement("style");
    style.textContent = `
        .add-classification-items-table tbody tr {
            cursor: pointer;
        }
        .add-classification-items-table tbody tr:hover {
            background-color: #f8f9fa;
        }
        `;
    document.head.appendChild(style);

    // Handle clicking on table rows to edit items
    document.addEventListener("click", function (e) {
        const tableRow = e.target.closest(
            ".add-classification-items-table tbody tr",
        );

        // Don't proceed if clicked on action buttons or if no row found
        if (
            !tableRow ||
            e.target.closest("button") ||
            e.target.closest(".btn")
        ) {
            return;
        }

        // Get assignment ID from the modal
        const modal = tableRow.closest(".modal");
        if (!modal) {
            showToast("Modal not found", "error");
            return;
        }

        const assignmentId = modal.id.replace("addClassification", "");
        if (!assignmentId) {
            showToast("Assignment ID not found", "error");
            return;
        }

        // Extract item data from the row
        const itemId = tableRow.dataset.itemId;
        const amount = tableRow.dataset.amount;
        const itemName = tableRow.cells[0].textContent;

        if (!itemId || !amount) {
            showToast("Item data not found", "error");
            return;
        }

        // Open Edit Classification Items modal with the data
        openEditItemModal(assignmentId, itemId, amount, tableRow);
    });

    // Function to open Edit Classification Items modal
    function openEditItemModal(assignmentId, itemId, amount, originalRow) {
        const editItemsModalEl = document.getElementById(
            `editClassificationItems${assignmentId}`,
        );
        if (!editItemsModalEl) {
            showToast("Edit items modal not found", "error");
            return;
        }

        const form = editItemsModalEl.querySelector(
            ".edit-classification-items-form",
        );
        const paymentItemSelect = form.querySelector(
            ".edit-paymentItem-select",
        );
        const amountInput = form.querySelector(".edit-amount-select");
        const saveBtn = form.querySelector(".edit-payment-save-btn");

        // Populate form with item data
        paymentItemSelect.value = itemId;
        amountInput.value = amount;
        $(paymentItemSelect).trigger("change"); // Trigger select2 change

        // Store the original item ID for updating
        form.dataset.originalItemId = itemId;
        saveBtn.disabled = false;

        // Show modal with proper z-index
        const editModalEl = document.getElementById(
            `updateFeeAssignment${assignmentId}`,
        );
        const addClassificationModalEl = document.getElementById(
            `addClassification${assignmentId}`,
        );

        if (editModalEl) editModalEl.style.zIndex = "1040";
        if (addClassificationModalEl)
            addClassificationModalEl.style.zIndex = "1050";
        editItemsModalEl.style.zIndex = "1060";

        const editItemsModal = new bootstrap.Modal(editItemsModalEl, {
            backdrop: false,
            keyboard: false,
        });
        editItemsModal.show();

        // Reset form when modal closes
        editItemsModalEl.addEventListener(
            "hidden.bs.modal",
            function () {
                if (addClassificationModalEl)
                    addClassificationModalEl.style.zIndex = "1050";

                // Clear form
                $(paymentItemSelect).val("").trigger("change");
                amountInput.value = "";
                saveBtn.disabled = true;
                delete form.dataset.originalItemId;
            },
            {
                once: true,
            },
        );
    }

    // Handle edit-payment-save-btn click to update the item
    document.addEventListener("click", function (e) {
        if (
            e.target.classList.contains("edit-payment-save-btn") ||
            e.target.closest(".edit-payment-save-btn")
        ) {
            e.preventDefault();

            const button = e.target.classList.contains("edit-payment-save-btn")
                ? e.target
                : e.target.closest(".edit-payment-save-btn");
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
                ".edit-paymentItem-select",
            );
            const amountInput = currentModal.querySelector(
                ".edit-amount-select",
            );

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

            const newItemId = paymentItemSelect.value;
            const selectedOption =
                paymentItemSelect.options[paymentItemSelect.selectedIndex];
            const itemName =
                selectedOption.getAttribute("data-name") || selectedOption.text;
            const oldItemId = form.dataset.originalItemId;

            // Update the item in the table
            updateItemInTable(
                assignmentId,
                oldItemId,
                newItemId,
                itemName,
                amount,
            );

            // Close modal
            const bsModal = bootstrap.Modal.getInstance(currentModal);
            if (bsModal) {
                bsModal.hide();
            }
        }
    });

    // Function to update existing item in table
    function updateItemInTable(
        assignmentId,
        oldItemId,
        newItemId,
        itemName,
        amount,
    ) {
        const classificationModal = document.getElementById(
            `addClassification${assignmentId}`,
        );
        if (!classificationModal) {
            showToast("Classification modal not found", "error");
            return;
        }

        const tableBody = classificationModal.querySelector(
            ".add-classification-items-table tbody",
        );
        if (!tableBody) {
            showToast("Table body not found", "error");
            return;
        }

        // Find the row to update
        const existingRow = tableBody.querySelector(
            `tr[data-item-id="${oldItemId}"]`,
        );
        if (!existingRow) {
            showToast("Item not found in table", "error");
            return;
        }

        // Update the row data
        existingRow.dataset.itemId = newItemId;
        existingRow.dataset.amount = amount;
        existingRow.cells[0].textContent = itemName;
        existingRow.cells[1].innerHTML = `₱ ${amount.toFixed(2)}`;

        // Update remove button data attribute
        const removeBtn = existingRow.querySelector(".remove-item");
        if (removeBtn) {
            removeBtn.dataset.itemId = newItemId;
        }

        // Update total and button states
        updateTotalAmount(assignmentId);
        updateButtonStates(assignmentId);

        showToast("Item updated successfully", "success");
    }

    // Function to update total amount
    function updateTotalAmount(assignmentId) {
        const classificationModal = document.getElementById(
            `addClassification${assignmentId}`,
        );
        if (!classificationModal) return;

        const tableRows = classificationModal.querySelectorAll(
            ".add-classification-items-table tbody tr",
        );
        let total = 0;

        tableRows.forEach(function (row) {
            const amount = parseFloat(row.dataset.amount) || 0;
            total += amount;
        });

        const totalElement = classificationModal.querySelector(".total-amount");
        if (totalElement) {
            totalElement.textContent = `₱ ${total.toFixed(2)}`;
        }
    }

    // Function to update button states
    function updateButtonStates(assignmentId) {
        const classificationModal = document.getElementById(
            `addClassification${assignmentId}`,
        );
        if (!classificationModal) return;

        const tableRows = classificationModal.querySelectorAll(
            ".add-classification-items-table tbody tr",
        );
        const addItemBtn = classificationModal.querySelector(
            ".add-classification-items",
        );
        const saveBtn = classificationModal.querySelector(".save-btn");
        const classificationSelect = classificationModal.querySelector(
            ".classification-select",
        );
        const modeOfPaymentSelect = classificationModal.querySelector(
            ".mode-of-payment-select",
        );

        const hasItems = tableRows.length > 0;
        const hasClassification =
            classificationSelect && classificationSelect.value;
        const hasModeOfPayment =
            modeOfPaymentSelect && modeOfPaymentSelect.value;

        // Enable Add Item button if classification and mode of payment are selected
        if (addItemBtn) {
            addItemBtn.disabled = !(hasClassification && hasModeOfPayment);
        }

        // Enable Save button if there are items and required fields are filled
        if (saveBtn) {
            saveBtn.disabled = !(
                hasItems &&
                hasClassification &&
                hasModeOfPayment
            );
        }
    }

    // Setup validation for edit payment items modal
    $(document).on(
        "shown.bs.modal",
        '[id^="editClassificationItems"]',
        function () {
            const modal = this;
            const paymentItemSelect = modal.querySelector(
                ".edit-paymentItem-select",
            );
            const amountInput = modal.querySelector(".edit-amount-select");
            const saveBtn = modal.querySelector(".edit-payment-save-btn");

            if (!paymentItemSelect || !amountInput || !saveBtn) return;

            function validateForm() {
                const amount = parseFloat(amountInput.value) || 0;
                const hasItem = paymentItemSelect.value;
                const hasValidAmount = amount > 0;

                saveBtn.disabled = !(hasItem && hasValidAmount);
            }

            // Remove existing listeners to avoid duplicates
            $(paymentItemSelect).off("change.editValidation");
            amountInput.removeEventListener("input", validateForm);

            // Add new listeners
            $(paymentItemSelect).on("change.editValidation", validateForm);
            amountInput.addEventListener("input", validateForm);

            // Initial validation
            validateForm();
        },
    );
});
