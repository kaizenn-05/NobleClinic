// Course Create Form Validation
document.addEventListener("DOMContentLoaded", function (e) {
    function initializeFormValidation() {
        let e = document.getElementById("createSubjectForm"),
            a = jQuery(e.querySelector('[name="subject_type"]')),
            b = jQuery(e.querySelector('[name="subject_group"]')),
            i = FormValidation.formValidation(e, {
                fields: {
                    description: {
                        validators: {
                            notEmpty: { message: "Please add a description" },
                        },
                    },

                    code: {
                        validators: {
                            notEmpty: {
                                message: "Please enter subject code",
                            },
                        },
                    },

                    subject_type: {
                        validators: {
                            notEmpty: {
                                message: "Please select subject type",
                            },
                        },
                    },

                    lecture_unit: {
                        validators: {
                            notEmpty: { message: "Please enter unit" },
                        },
                    },

                    subject_group: {
                        validators: {
                            notEmpty: { message: "Please select subject group" },
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

        b.length &&
            (b.wrap('<div class="position-relative"></div>'),
                b
                    .select2({
                        dropdownParent: b.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("subject_group");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });
    }

    initializeFormValidation();
});

// Update Course Form Validation
document.addEventListener("DOMContentLoaded", function (e) {
    function initializeFormValidation() {
        let e = document.getElementById("editSubjectModal"),
            a = jQuery(e.querySelector('[name="subject_type"]')),
            b = jQuery(e.querySelector('[name="subject_group"]')),
            i = FormValidation.formValidation(e, {
                fields: {
                    description: {
                        validators: {
                            notEmpty: { message: "Please add a description" },
                        },
                    },

                    code: {
                        validators: {
                            notEmpty: {
                                message: "Please enter subject code",
                            },
                        },
                    },

                    subject_type: {
                        validators: {
                            notEmpty: {
                                message: "Please select subject type",
                            },
                        },
                    },

                    lecture_unit: {
                        validators: {
                            notEmpty: { message: "Please enter unit" },
                        },
                    },

                    subject_group: {
                        validators: {
                            notEmpty: { message: "Please select subject group" },
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

        b.length &&
            (b.wrap('<div class="position-relative"></div>'),
                b
                    .select2({
                        dropdownParent: b.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("subject_group");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });
    }

    initializeFormValidation();
});

// Add Curriculum Form Validation
document.addEventListener("DOMContentLoaded", function (e) {

    document.querySelectorAll('.add-curriculum-form-validation').forEach(form => {
        const id = form.id;

        initializeFormValidation(id);
    })

    function initializeFormValidation(id) {
        let e = document.getElementById(id),
            i = FormValidation.formValidation(e, {
                fields: {
                    description: {
                        validators: {
                            notEmpty: { message: "Please add a curriculum description" },
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

// Update Curriculum Form Validation
document.addEventListener("DOMContentLoaded", function (e) {

    document.querySelectorAll('.update-curriculum-form-validation').forEach(form => {
        const id = form.id;

        initializeFormValidation(id);
    })

    function initializeFormValidation(id) {
        let e = document.getElementById(id),
            i = FormValidation.formValidation(e, {
                fields: {
                    description: {
                        validators: {
                            notEmpty: { message: "Please add a curriculum description" },
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