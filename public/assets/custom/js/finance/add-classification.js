// Pass data from Add Classification Items Modal to Add Classification modal
document.addEventListener("DOMContentLoaded", function () {
    // Handle Add Classification Items - Add button click
    document.addEventListener("click", function (e) {
        if (
            e.target.classList.contains("payment-add-btn") ||
            e.target.closest(".payment-add-btn")
        ) {
            e.preventDefault();

            const button = e.target.classList.contains("payment-add-btn")
                ? e.target
                : e.target.closest(".payment-add-btn");
            const currentModal = button.closest(".modal");
            const form = button.closest("form");

            if (!currentModal || !form) {
                showToast("Modal or form not found", "error");
                return;
            }

            // Get the assignment ID from the form data attribute
            const assignmentId = form.getAttribute("data-assignment-id");
            if (!assignmentId) {
                showToast("Assignment ID not found", "error");
                return;
            }

            const paymentItemSelect = currentModal.querySelector(
                ".paymentItem-select",
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

            // Add to classification table
            addItemToTable(assignmentId, itemId, itemName, amount);

            // Close current modal using Bootstrap's method
            const bsModal = bootstrap.Modal.getInstance(currentModal);
            if (bsModal) {
                bsModal.hide();
            }

            // Clear form
            clearClassificationItemsForm(currentModal);
        }
    });

    // Add item to classification table
    function addItemToTable(assignmentId, itemId, itemName, amount) {
        const classificationModal = document.getElementById(
            `addClassification${assignmentId}`,
        );
        if (!classificationModal) {
            showToast(
                `Classification modal not found for ID: addClassification${assignmentId}`,
                "error",
            );
            return;
        }

        const tableBody = classificationModal.querySelector(
            ".add-classification-items-table tbody",
        );
        if (!tableBody) {
            showToast("Table body not found in classification modal", "error");
            return;
        }

        // Check if item already exists
        const existingRow = tableBody.querySelector(
            `tr[data-item-id="${itemId}"]`,
        );

        if (existingRow) {
            // Item exists - add to existing amount
            const currentAmount = parseFloat(existingRow.dataset.amount) || 0;
            const newAmount = currentAmount + amount;

            // Update the row
            existingRow.dataset.amount = newAmount;
            existingRow.cells[1].innerHTML = `₱ ${newAmount.toFixed(2)}`;
        } else {
            // Create new row
            const newRow = document.createElement("tr");
            newRow.dataset.itemId = itemId;
            newRow.dataset.amount = amount;

            newRow.innerHTML = `
                    <td>${itemName}</td>
                    <td>₱ ${amount.toFixed(2)}</td>
                    <td>
                        <button type="button" class="btn btn-danger btn-sm remove-item" 
                                data-item-id="${itemId}">
                            <i class="bx bx-trash"></i>
                        </button>
                    </td>
                `;

            tableBody.appendChild(newRow);
        }

        // Update total and enable buttons
        updateTotal(assignmentId);
        updateButtonStates(assignmentId);
    }

    // Handle remove item button click
    document.addEventListener("click", function (e) {
        if (
            e.target.classList.contains("remove-item") ||
            e.target.closest(".remove-item")
        ) {
            const button = e.target.classList.contains("remove-item")
                ? e.target
                : e.target.closest(".remove-item");
            const row = button.closest("tr");
            const modal = button.closest(".modal");

            if (row && modal) {
                row.remove();

                // Get assignment ID from modal ID
                const modalId = modal.id;
                const assignmentId = modalId.replace("addClassification", "");

                updateTotal(assignmentId);
                updateButtonStates(assignmentId);
            }
        }
    });

    // Update total amount for specific modal
    function updateTotal(assignmentId) {
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

    // Update button states (enable/disable based on whether there are items)
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

    // Clear classification items form
    function clearClassificationItemsForm(modal) {
        const paymentItemSelect = modal.querySelector(".paymentItem-select");
        const amountInput = modal.querySelector(".amount-select");
        const saveBtn = modal.querySelector(".payment-add-btn");

        if (paymentItemSelect) {
            // Reset select2 dropdown
            $(paymentItemSelect).val("").trigger("change");
        }
        if (amountInput) {
            amountInput.value = "";
        }
        if (saveBtn) {
            saveBtn.disabled = true;
        }
    }

    // Handle payment items form validation - when modal is shown
    $(document).on(
        "shown.bs.modal",
        '[id^="addClassificationItems"]',
        function () {
            const modal = this;
            clearClassificationItemsForm(modal);
            setupPaymentItemsValidation(modal);
        },
    );

    // Handle classification modal validation - when modal is shown
    $(document).on("shown.bs.modal", '[id^="addClassification"]', function () {
        const modal = this;
        const modalId = modal.id;
        const assignmentId = modalId.replace("addClassification", "");

        setupClassificationValidation(modal, assignmentId);
        updateButtonStates(assignmentId);
    });

    // Setup validation for classification modal
    function setupClassificationValidation(modal, assignmentId) {
        const classificationSelect = modal.querySelector(
            ".classification-select",
        );
        const modeOfPaymentSelect = modal.querySelector(
            ".mode-of-payment-select",
        );

        if (!classificationSelect || !modeOfPaymentSelect) return;

        function validateAndUpdateButtons() {
            updateButtonStates(assignmentId);
        }

        // Remove existing listeners to avoid duplicates
        $(classificationSelect).off("change.classificationValidation");
        $(modeOfPaymentSelect).off("change.classificationValidation");

        // Add new listeners
        $(classificationSelect).on(
            "change.classificationValidation",
            validateAndUpdateButtons,
        );
        $(modeOfPaymentSelect).on(
            "change.classificationValidation",
            validateAndUpdateButtons,
        );

        // Initial validation
        validateAndUpdateButtons();
    }

    // Setup validation for payment items modal
    function setupPaymentItemsValidation(modal) {
        const paymentItemSelect = modal.querySelector(".paymentItem-select");
        const amountInput = modal.querySelector(".amount-select");
        const saveBtn = modal.querySelector(".payment-add-btn");

        if (!paymentItemSelect || !amountInput || !saveBtn) return;

        function validateForm() {
            const amount = parseFloat(amountInput.value) || 0;
            const hasItem = paymentItemSelect.value;
            const hasValidAmount = amount > 0;

            saveBtn.disabled = !(hasItem && hasValidAmount);
        }

        // Remove existing listeners to avoid duplicates
        $(paymentItemSelect).off("change.paymentValidation");
        amountInput.removeEventListener("input", validateForm);

        // Add new listeners
        $(paymentItemSelect).on("change.paymentValidation", validateForm);
        amountInput.addEventListener("input", validateForm);

        // Initial validation
        validateForm();
    }
});

// Save Modal Payment Classification
document.addEventListener("DOMContentLoaded", function () {
    // Handle Save button in Add Classification modal - use event delegation
    document.addEventListener("submit", function (e) {
        // Check if the submitted form is a classification form
        if (e.target.classList.contains("add-classification-form")) {
            e.preventDefault();

            const form = e.target;
            const modal = form.closest(".modal");

            if (!modal) {
                console.error("Modal not found");
                return;
            }

            // Get elements specific to this modal
            const classificationSelect = modal.querySelector(
                ".classification-select",
            );
            const modeOfPaymentSelect = modal.querySelector(
                ".mode-of-payment-select",
            );
            const tableRows = modal.querySelectorAll(
                ".add-classification-items-table tbody tr",
            );
            const saveBtn = modal.querySelector(".save-btn");
            const feeAssignmentIdInput = modal.querySelector(
                'input[name="fee_assignment_id"]',
            );
            const tokenInput = modal.querySelector('input[name="_token"]');

            // Prepare items data from table
            const items = [];
            tableRows.forEach(function (row) {
                const itemId = row.dataset.itemId;
                const amount = row.dataset.amount;

                if (itemId && amount) {
                    items.push({
                        id: itemId,
                        amount: parseFloat(amount),
                    });
                }
            });

            console.log("Submitting data:", {
                classification: classificationSelect.value,
                mode_of_payment: modeOfPaymentSelect.value,
                fee_assignment_id: feeAssignmentIdInput.value,
                items: items,
            });

            // Prepare form data
            const formData = new FormData();
            formData.append("_token", tokenInput.value);
            formData.append("classification", classificationSelect.value);
            formData.append("mode_of_payment", modeOfPaymentSelect.value);
            formData.append("fee_assignment_id", feeAssignmentIdInput.value);
            formData.append("items", JSON.stringify(items));

            // Show loading state
            const originalText = saveBtn.textContent;
            saveBtn.disabled = true;
            saveBtn.textContent = "Saving...";

            // Submit via AJAX
            fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    // Handle different response types
                    if (response.ok) {
                        // Check if response is JSON
                        const contentType =
                            response.headers.get("content-type");
                        if (
                            contentType &&
                            contentType.includes("application/json")
                        ) {
                            return response.json();
                        } else {
                            // If it's not JSON, it might be a redirect response with toast
                            // Close modal and reload to show the toast
                            const bsModal = bootstrap.Modal.getInstance(modal);
                            if (bsModal) {
                                bsModal.hide();
                            }
                            resetClassificationForm(modal);
                            window.location.reload();
                            return null;
                        }
                    } else {
                        // Handle HTTP error responses
                        if (response.status === 409) {
                            // Conflict - likely "Already recorded"
                            return response.json().catch(() => {
                                // If JSON parsing fails, still show error
                                return {
                                    success: false,
                                    message: "Already recorded",
                                };
                            });
                        } else if (response.status === 422) {
                            // Validation error
                            return response.json();
                        } else {
                            throw new Error(
                                `HTTP error! status: ${response.status}`,
                            );
                        }
                    }
                })
                .then((data) => {
                    if (!data) {
                        return;
                    }

                    if (data.success || data.reload) {
                        // Close modal using Bootstrap method
                        const bsModal = bootstrap.Modal.getInstance(modal);
                        if (bsModal) {
                            bsModal.hide();
                        }

                        // Reset form
                        resetClassificationForm(modal);

                        // Reload page to show the toast from session
                        // This handles both success and error cases with reload: true
                        if (data.reload) {
                            window.location.reload();
                        } else {
                            showToast(
                                data.message || "Created successfully!",
                                "success",
                            );
                        }
                    } else {
                        // Handle other error responses (validation errors, etc.)
                        if (data.errors) {
                            // Handle validation errors
                            let errorMessage =
                                data.message || "Validation failed";
                            const errorList = Object.values(data.errors)
                                .flat()
                                .join("\n");
                            errorMessage += "\n\nErrors:\n" + errorList;
                            alert(errorMessage);
                        } else {
                            // Other errors without reload
                            alert(data.message || "An error occurred");
                        }
                    }
                })
                .catch((error) => {
                    showToast(
                        "An error occurred while saving the classification",
                        "error",
                    );
                })
                .finally(() => {
                    // Reset button state
                    saveBtn.disabled = false;
                    saveBtn.textContent = originalText;
                });
        }
    });

    // Reset classification form after save - now accepts modal parameter
    function resetClassificationForm(modal) {
        if (!modal) return;

        // Reset selects specific to this modal
        const classificationSelect = modal.querySelector(
            ".classification-select",
        );
        const modeOfPaymentSelect = modal.querySelector(
            ".mode-of-payment-select",
        );

        if (classificationSelect) {
            $(classificationSelect).val("").trigger("change");
        }
        if (modeOfPaymentSelect) {
            $(modeOfPaymentSelect).val("").trigger("change");
        }

        // Clear table specific to this modal
        const tableBody = modal.querySelector(
            ".add-classification-items-table tbody",
        );
        if (tableBody) {
            tableBody.innerHTML = "";
        }

        // Reset total specific to this modal
        const totalElement = modal.querySelector(".total-amount");
        if (totalElement) {
            totalElement.textContent = "₱ 0.00";
        }

        // Disable buttons specific to this modal
        const addItemBtn = modal.querySelector(".add-classification-items");
        const saveBtn = modal.querySelector(".save-btn");

        if (addItemBtn) {
            addItemBtn.disabled = true;
        }
        if (saveBtn) {
            saveBtn.disabled = true;
        }
    }

    // Debug function to check modal states
    window.debugModals = function () {
        const modals = document.querySelectorAll('[id^="addClassification"]');
        console.log(`Found ${modals.length} classification modals`);

        modals.forEach((modal, index) => {
            const form = modal.querySelector(".add-classification-form");
            const saveBtn = modal.querySelector(".save-btn");
            const items = modal.querySelectorAll(
                ".add-classification-items-table tbody tr",
            );

            console.log(`Modal ${index + 1} (${modal.id}):`, {
                hasForm: !!form,
                hasSaveBtn: !!saveBtn,
                itemCount: items.length,
                saveBtnDisabled: saveBtn ? saveBtn.disabled : "N/A",
            });
        });
    };
});
