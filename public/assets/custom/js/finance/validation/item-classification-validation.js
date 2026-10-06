(() => {
    // Create Terminal Form Validation
    document.addEventListener("DOMContentLoaded", function (e) {
        function initializeFormValidation() {
            let e = document.getElementById("create_item_classification_form"),
                a = jQuery(e.querySelector('[name="fee_classifications"]')),
                i = FormValidation.formValidation(e, {
                    fields: {
                        name: {
                            validators: {
                                notEmpty: { message: "Please add a classification name" },
                            },
                        },
                        fee_classifications: {
                            validators: {
                                notEmpty: { message: "Please select a fee classification" },
                            },
                        },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        bootstrap5: new FormValidation.plugins.Bootstrap5({
                            eleValidClass: "",
                            rowSelector: function (e, a) {
                                switch (e) {
                                    case "update_formValidationCheckbox":
                                        return ".form-control-validation";
                                    default:
                                        return ".col";
                                }
                            },
                        }),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        defaultSubmit:
                            new FormValidation.plugins.DefaultSubmit(),
                        autoFocus: new FormValidation.plugins.AutoFocus(),
                    },
                    init: (e) => {
                        e.on("plugins.message.placed", function (e) {
                            e.element.parentElement.classList.contains(
                                "input-group"
                            ) &&
                                e.element.parentElement.insertAdjacentElement(
                                    "afterend",
                                    e.messageElement
                                ),
                                e.element.parentElement.parentElement.classList.contains(
                                    "custom-option"
                                ) &&
                                e.element
                                    .closest(".row")
                                    .insertAdjacentElement(
                                        "afterend",
                                        e.messageElement
                                    );
                        });
                        e.on("plugins.message.placed", function (e) {
                            e.element.parentElement.classList.contains(
                                "input-group"
                            ) &&
                                e.element.parentElement.insertAdjacentElement(
                                    "afterend",
                                    e.messageElement
                                ),
                                e.element.parentElement.parentElement.classList.contains(
                                    "custom-option"
                                ) &&
                                e.elements
                                    .closest(".row")
                                    .insertAdjacentElement(
                                        "afterend",
                                        e.messageElement
                                    );
                        });
                    },
                });

            a.length &&
                (a.wrap('<div class="position-relative"></div>'),
                    a
                        .select2({
                            dropdownParent: a.parent(),
                        })
                        .on("change", function () {
                            i.revalidateField("fee_classifications");
                        })),
                isRtl &&
                (s = [].slice.call(
                    document.querySelectorAll(".typeahead")
                )) &&
                s.forEach((e) => {
                    e.setAttribute("dir", "rtl");
                });

            i.on('core.form.valid', function () {
                const btn = e.querySelector(`[type="submit"]`);

                btn.disabled = true;
                btn.dataset.originalText = btn.innerHTML;

                btn.innerHTML = `
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                `;

                e.submit();
            });
        }

        initializeFormValidation();
    });

    // Update School Campus Form Validation
    document.addEventListener("DOMContentLoaded", function (e) {

        document.querySelectorAll('.edit-item-classification-form-validation').forEach(form => {
            const id = form.id;

            initializeFormValidation(id);
        })

        function initializeFormValidation(id) {
            let e = document.getElementById(id),
                a = jQuery(e.querySelector('[name="fee_classifications"]')),
                i = FormValidation.formValidation(e, {
                    fields: {
                        classification_name: {
                            validators: {
                                notEmpty: { message: "Classification must not be empty" },
                            },
                        },
                        fee_classifications: {
                            validators: {
                                notEmpty: { message: "Please select a fee classification" },
                            },
                        },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        bootstrap5: new FormValidation.plugins.Bootstrap5({
                            eleValidClass: "",
                            rowSelector: function (e, a) {
                                switch (e) {
                                    case "update_formValidationCheckbox":
                                        return ".form-control-validation";
                                    default:
                                        return ".col";
                                }
                            },
                        }),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        defaultSubmit:
                            new FormValidation.plugins.DefaultSubmit(),
                        autoFocus: new FormValidation.plugins.AutoFocus(),
                    },
                    init: (e) => {
                        e.on("plugins.message.placed", function (e) {
                            e.element.parentElement.classList.contains(
                                "input-group"
                            ) &&
                                e.element.parentElement.insertAdjacentElement(
                                    "afterend",
                                    e.messageElement
                                ),
                                e.element.parentElement.parentElement.classList.contains(
                                    "custom-option"
                                ) &&
                                e.element
                                    .closest(".row")
                                    .insertAdjacentElement(
                                        "afterend",
                                        e.messageElement
                                    );
                        });
                        e.on("plugins.message.placed", function (e) {
                            e.element.parentElement.classList.contains(
                                "input-group"
                            ) &&
                                e.element.parentElement.insertAdjacentElement(
                                    "afterend",
                                    e.messageElement
                                ),
                                e.element.parentElement.parentElement.classList.contains(
                                    "custom-option"
                                ) &&
                                e.element
                                    .closest(".row")
                                    .insertAdjacentElement(
                                        "afterend",
                                        e.messageElement
                                    );
                        });
                    },
                });

            a.length &&
                (a.wrap('<div class="position-relative"></div>'),
                    a
                        .select2({
                            dropdownParent: a.parent(),
                        })
                        .on("change", function () {
                            i.revalidateField("fee_classifications");
                        })),
                isRtl &&
                (s = [].slice.call(
                    document.querySelectorAll(".typeahead")
                )) &&
                s.forEach((e) => {
                    e.setAttribute("dir", "rtl");
                });

            i.on('core.form.valid', function () {
                const btn = e.querySelector(`[type="submit"]`);

                btn.disabled = true;
                btn.dataset.originalText = btn.innerHTML;

                btn.innerHTML = `
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                `;

                e.submit();
            });

            const form = document.getElementById(id);
            const btn = form.querySelector(`[type="submit"]`);

            const initialState = JSON.stringify(
                Object.fromEntries(new FormData(form))
            );

            function checkChanges() {
                const currentState = JSON.stringify(
                    Object.fromEntries(new FormData(form))
                );

                btn.disabled = currentState === initialState;
            }
            
            form.querySelectorAll('select').forEach(select => {
                select.onchange = () => {
                    checkChanges();
                }
            });
            form.addEventListener('input', checkChanges);
            form.addEventListener('change', checkChanges);

            checkChanges();
        }
    });
})();