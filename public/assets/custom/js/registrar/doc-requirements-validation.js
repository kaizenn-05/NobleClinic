(() => {
    // Document Requirement Form Validation
    document.addEventListener("DOMContentLoaded", function (e) {
        function initializeFormValidation() {
            let e = document.getElementById("createDocRequirementForm"),
                a = jQuery(e.querySelector('[name="description"]')),
                b = jQuery(e.querySelector('[name="student_type"]')),
                i = FormValidation.formValidation(e, {
                    fields: {
                        description: {
                            validators: {
                                notEmpty: { message: "Please select a description" },
                            },
                        },
                        student_type: {
                            validators: {
                                notEmpty: { message: "Please select a student type" },
                            },
                        }
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
                                        return ".row";
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
                (a.on("change", function () {
                    i.revalidateField("description");
                })),
                isRtl &&
                (s = [].slice.call(
                    document.querySelectorAll(".typeahead")
                )) &&
                s.forEach((e) => {
                    e.setAttribute("dir", "rtl");
                });

            b.length &&
                (b.wrap('<div class="position-relative"></div>'),
                    b
                        .on("change", function () {
                            i.revalidateField("student_type");
                        })),
                isRtl &&
                (s = [].slice.call(
                    document.querySelectorAll(".typeahead")
                )) &&
                s.forEach((e) => {
                    e.setAttribute("dir", "rtl");
                });

            i.on('core.form.valid', function () {
                const btn = document.querySelector(`[form="createDocRequirementForm"]`);

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

    // Document Description Add Form Validation
    document.addEventListener("DOMContentLoaded", function (e) {
        function initializeFormValidation() {
            let e = document.getElementById("addDescriptionForm"),
                a = jQuery(e.querySelector('[name="subject_type"]')),
                i = FormValidation.formValidation(e, {
                    fields: {
                        description: {
                            validators: {
                                notEmpty: { message: "Please add a description" },
                            },
                        }
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
                                        return ".row";
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
                            i.revalidateField("subject_type");
                        })),
                isRtl &&
                (s = [].slice.call(
                    document.querySelectorAll(".typeahead")
                )) &&
                s.forEach((e) => {
                    e.setAttribute("dir", "rtl");
                });

            i.on('core.form.valid', function () {
                const btn = document.querySelector(`[form="addDescriptionForm"]`);

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

    // Document Requirement Update Form Validation
    document.addEventListener("DOMContentLoaded", function (e) {

        document.querySelectorAll('.update-doc-requirement-form-validation').forEach(form => {
            const id = form.id;

            initializeFormValidation(id);
        })

        function initializeFormValidation(id) {
            let e = document.getElementById(id),
                a = jQuery(e.querySelector('[name="description"]')),
                i = FormValidation.formValidation(e, {
                    fields: {
                        description: {
                            validators: {
                                notEmpty: { message: "Please select a description" },
                            },
                        },
                        student_type: {
                            validators: {
                                notEmpty: { message: "Please select a student type" },
                            },
                        }
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
                                        return ".row";
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
                (a.on("change", function () {
                    i.revalidateField("description");
                })),
                isRtl &&
                (s = [].slice.call(
                    document.querySelectorAll(".typeahead")
                )) &&
                s.forEach((e) => {
                    e.setAttribute("dir", "rtl");
                });

            i.on('core.form.valid', function () {
                const btn = document.querySelector(`[form="${id}"]`);

                btn.disabled = true;
                btn.dataset.originalText = btn.innerHTML;

                btn.innerHTML = `
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                `;

                e.submit();
            });
        }
    });

    // Document Description Update Form Validation
    document.addEventListener("DOMContentLoaded", function (e) {

        document.querySelectorAll('.update-doc-description-form-valication').forEach(form => {
            const id = form.id;

            initializeFormValidation(id);
        })

        function initializeFormValidation(id) {
            let e = document.getElementById(id),
                i = FormValidation.formValidation(e, {
                    fields: {
                        description: {
                            validators: {
                                notEmpty: { message: "Description must not be empty" },
                            },
                        }
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
                                        return ".row";
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

            i.on('core.form.valid', function () {
                const btn = document.querySelector(`[form="${id}"]`);

                btn.disabled = true;
                btn.dataset.originalText = btn.innerHTML;

                btn.innerHTML = `
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                `;

                e.submit();
            });

            const form = document.getElementById(id);
            const btn = document.querySelector(`[form="${id}"]`);

            const initialState = JSON.stringify(
                Object.fromEntries(new FormData(form))
            );

            function checkChanges() {
                const currentState = JSON.stringify(
                    Object.fromEntries(new FormData(form))
                );

                btn.disabled = currentState === initialState;
            }

            form.addEventListener('input', checkChanges);
            form.addEventListener('change', checkChanges);

            checkChanges();
        }
    });
})();