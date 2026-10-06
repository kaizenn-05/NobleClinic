(() => {
    // Create School Campus Form Validation
    document.addEventListener("DOMContentLoaded", function (e) {
        function initializeFormValidation() {
            let e = document.getElementById("create_component_form"),
                i = FormValidation.formValidation(e, {
                    fields: {
                        department_id: {
                            validators: {
                                notEmpty: { message: "Select department" },
                            },
                        },
                        component_name: {
                            validators: {
                                notEmpty: { message: "Add component name" },
                            },
                        },
                        units_required: {
                            validators: {
                                notEmpty: { message: "Add required unit/s" },
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
                                        return ".validate";
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

            i.on('core.form.valid', function () {
                const btn = document.querySelector(`[form="create_component_form"]`);

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

    document.addEventListener("DOMContentLoaded", function (e) {
        document.querySelectorAll('.curriculum-component-form-validation').forEach(form => {
            const id = form.id;
            initializeFormValidation(id);
        })

        function initializeFormValidation(id) {
            let e = document.getElementById(id),
                f = jQuery(e.querySelector('[name="department_id"]')),
                i = FormValidation.formValidation(e, {
                    fields: {
                        department_id: {
                            validators: {
                                notEmpty: { message: "Select department" },
                            },
                        },
                        component_name: {
                            validators: {
                                notEmpty: { message: "Component must not be empty" },
                            },
                        },
                        units_required: {
                            validators: {
                                notEmpty: { message: "Units must not be empty" },
                            },
                        },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        bootstrap5: new FormValidation.plugins.Bootstrap5({
                            eleValidClass: "",
                            rowSelector: function (e, a) {
                                switch (e) {
                                    default:
                                        return ".validate";
                                }
                            },
                        }),
                        submitButton: new FormValidation.plugins.SubmitButton(),
                        // defaultSubmit:
                        //     new FormValidation.plugins.DefaultSubmit(),
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

            f.length &&
                (f.wrap('<div class="position-relative"></div>'),
                    f
                        .select2({
                            dropdownParent: f.parent(),
                        })
                        .on("change", function () {
                            i.revalidateField("class_type");
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

        initializeFormValidation();
    });
})()