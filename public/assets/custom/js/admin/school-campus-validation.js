(() => {
    // Create School Campus Form Validation
    document.addEventListener("DOMContentLoaded", function (e) {
        function initializeFormValidation() {
            let e = document.getElementById("createSchoolCampusForm"),
                i = FormValidation.formValidation(e, {
                    fields: {
                        campus_name: {
                            validators: {
                                notEmpty: { message: "Please add a campus name" },
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

            i.on('core.form.valid', function () {
                const btn = document.querySelector(`[form="createSchoolCampusForm"]`);

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

        document.querySelectorAll('.update-school-campus-form-validation').forEach(form => {
            const id = form.id;

            initializeFormValidation(id);
        })

        function initializeFormValidation(id) {
            let e = document.getElementById(id),
                i = FormValidation.formValidation(e, {
                    fields: {
                        campus_name: {
                            validators: {
                                notEmpty: { message: "Campus Name must not be empty" },
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