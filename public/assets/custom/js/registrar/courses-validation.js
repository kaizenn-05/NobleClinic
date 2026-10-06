// Create Course Validation
document.addEventListener("DOMContentLoaded", function () {
    function initializeFormValidation() {
        let e = document.getElementById("createCourseForm"),
            a = jQuery(e.querySelector("[name='college']")),
            i = FormValidation.formValidation(e, {
                fields: {
                    program_description: {
                        validators: {
                            notEmpty: {
                                message: "Please enter course description",
                            },
                        },
                    },
                    program_abbreviation: {
                        validators: {
                            notEmpty: {
                                message: "Please enter course abbreviation",
                            },
                        },
                    },
                    college: {
                        validators: {
                            notEmpty: {
                                message: "Please select a department or college",
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap5: new FormValidation.plugins.Bootstrap5({
                        eleValidClass: "",
                        rowSelector: function (e, a) {
                            return ".form-control-validation";
                        },
                    }),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
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

            // School Year
            a.length &&
                (a.wrap('<div class="position-relative"></div>'),
                a
                    .select2({
                        dropdownParent: a.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("college");
                    }));
    }

    initializeFormValidation();
});

// Update Course Validation
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.update-course-form-validation').forEach(form => {
        const id = form.id;

        console.log(id);

        initializeFormValidation(id);
    });

    function initializeFormValidation(id) {
        let e = document.getElementById(id),
            a = jQuery(e.querySelector("[name='college']")),
            i = FormValidation.formValidation(e, {
                fields: {
                    program_description: {
                        validators: {
                            notEmpty: {
                                message: "Please enter course description",
                            },
                        },
                    },
                    program_abbreviation: {
                        validators: {
                            notEmpty: {
                                message: "Please enter course abbreviation",
                            },
                        },
                    },
                    college: {
                        validators: {
                            notEmpty: {
                                message: "Please select a department or college",
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap5: new FormValidation.plugins.Bootstrap5({
                        eleValidClass: "",
                        rowSelector: function (e, a) {
                            return ".form-control-validation";
                        },
                    }),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                    defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
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

            // School Year
            a.length &&
                (a.wrap('<div class="position-relative"></div>'),
                a
                    .select2({
                        dropdownParent: a.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("college");
                    }));
    }
});
