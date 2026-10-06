document.addEventListener("DOMContentLoaded", function () {
    function initializeFormValidation() {
        let e = document.getElementById("formEnrollmentAuthentication"),
            a = jQuery(e.querySelector('[name="school_year"]')),
            b = jQuery(e.querySelector('[name="enrollment_type"]')),
            c = jQuery(e.querySelector('[name="academic_program"]')),
            d = jQuery(e.querySelector('[name="semester"]')),
            i = FormValidation.formValidation(e, {
                fields: {
                    school_year: {
                        validators: {
                            notEmpty: {
                                message: "Please select School Year",
                            },
                        },
                    },

                    enrollment_type: {
                        validators: {
                            notEmpty: {
                                message: "Please select Enrollment Type",
                            },
                        },
                    },

                    academic_program: {
                        validators: {
                            notEmpty: {
                                message: "Please select Academic Program",
                            },
                        },
                    },

                    semester: {
                        validators: {
                            notEmpty: {
                                message: "Please select Semester",
                            },
                        },
                    },

                    start_date: {
                        validators: {
                            notEmpty: {
                                message: "Please enter Start Date",
                            },
                        },
                    },

                    end_date: {
                        validators: {
                            notEmpty: {
                                message: "Please enter End Date",
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap5: new FormValidation.plugins.Bootstrap5({
                        eleValidClass: "",
                        rowSelector: function () {
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
                                e.element
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
                    i.revalidateField("school_year");
                }));

        // Enrollment Type
        b.length &&
            (b.wrap('<div class="position-relative"></div>'),
            b
                .select2({
                    dropdownParent: b.parent(),
                })
                .on("change", function () {
                    i.revalidateField("enrollment_type");
                }));

        // Academic Program
        c.length &&
            (c.wrap('<div class="position-relative"></div>'),
            c
                .select2({
                    dropdownParent: c.parent(),
                })
                .on("change", function () {
                    i.revalidateField("academic_program");
                }));

        // Semester
        d.length &&
            (d.wrap('<div class="position-relative"></div>'),
            d
                .select2({
                    dropdownParent: d.parent(),
                })
                .on("change", function () {
                    i.revalidateField("semester");
                }));
    }

    initializeFormValidation();
});
