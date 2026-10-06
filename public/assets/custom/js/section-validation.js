// Subject Schedule Create Form Validation
document.addEventListener("DOMContentLoaded", function (e) {
    function initializeFormValidation() {
        let e = document.getElementById("formValidation"),
            a = jQuery(e.querySelector('[name="class_type"]')),
            b = jQuery(e.querySelector('[name="schedule_group_id"]')),
            c = jQuery(e.querySelector('[name="curriculum_id"]')),
            d = jQuery(e.querySelector('[name="course_id"]')),
            f = jQuery(e.querySelector('[name="personnel_id"]')),
            g = jQuery(e.querySelector('[name="classification"]')),
            h = jQuery(e.querySelector('[name="room_id"]')),
            i = FormValidation.formValidation(e, {
                fields: {
                    class_type: {
                        validators: {
                            notEmpty: { message: "Please select a class type" },
                        },
                    },

                    capacity: {
                        validators: {
                            notEmpty: {
                                message: "Please enter a capacity",
                            },
                        },
                    },

                    schedule_group_id: {
                        validators: {
                            notEmpty: {
                                message: "Please select a schedule group",
                            },
                        },
                    },

                    curriculum_id: {
                        validators: {
                            notEmpty: { message: "Please select curriculum" },
                        },
                    },

                    course_id: {
                        validators: {
                            notEmpty: { message: "Please select course" },
                        },
                    },

                    personnel_id: {
                        validators: {
                            notEmpty: { message: "Please select instructor or personnel" },
                        },
                    },

                    classification: {
                        validators: {
                            notEmpty: { message: "Please select classification" },
                        },
                    },

                    room_id: {
                        validators: {
                            notEmpty: { message: "Please select room" },
                        },
                    },

                    start_time: {
                        validators: {
                            notEmpty: { message: "Please enter start time" },
                        },
                    },

                    end_time: {
                        validators: {
                            notEmpty: { message: "Please enter end time" },
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

        a.length &&
            (a.wrap('<div class="position-relative"></div>'),
                a
                    .select2({
                        dropdownParent: a.parent(),
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

        b.length &&
            (b.wrap('<div class="position-relative"></div>'),
                b
                    .select2({
                        dropdownParent: b.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("schedule_group_id");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        c.length &&
            (c.wrap('<div class="position-relative"></div>'),
                c
                    .select2({
                        dropdownParent: c.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("curriculum_id");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        d.length &&
            (d.wrap('<div class="position-relative"></div>'),
                d
                    .select2({
                        dropdownParent: d.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("course_id");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        f.length &&
            (f.wrap('<div class="position-relative"></div>'),
                f
                    .select2({
                        dropdownParent: f.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("personnel_id");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        g.length &&
            (g.wrap('<div class="position-relative"></div>'),
                g
                    .select2({
                        dropdownParent: g.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("classification");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        h.length &&
            (h.wrap('<div class="position-relative"></div>'),
                h
                    .select2({
                        dropdownParent: h.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("room_id");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        i.on('core.form.valid', function () {
            const btn = document.querySelector(`[form="formValidation"]`);

            btn.disabled = true;
            btn.dataset.originalText = btn.innerHTML;

            btn.innerHTML = `
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                `;
        });
    }

    initializeFormValidation();
});

// Subject Schedule Update Form Validation
document.addEventListener("DOMContentLoaded", function (e) {

    document.querySelectorAll('.subject-schedule-form-valication').forEach(form => {
        const id = form.id;
        initializeFormValidation(id);
    })

    function initializeFormValidation(id) {
        let e = document.getElementById(id),
            a = jQuery(e.querySelector('[name="class_type"]')),
            b = jQuery(e.querySelector('[name="subject_section_id[]"]')),
            c = jQuery(e.querySelector('[name="curriculum_id"]')),
            d = jQuery(e.querySelector('[name="course_id"]')),
            i = FormValidation.formValidation(e, {
                fields: {
                    class_type: {
                        validators: {
                            notEmpty: { message: "Please select a class type" },
                        },
                    },

                    capacity: {
                        validators: {
                            notEmpty: {
                                message: "Please enter a capacity",
                            },
                        },
                    },

                    "subject_section_id[]": {
                        validators: {
                            notEmpty: {
                                message: "Please select a schedule group",
                            },
                        },
                    },

                    curriculum_id: {
                        validators: {
                            notEmpty: { message: "Please select curriculum" },
                        },
                    },

                    course_id: {
                        validators: {
                            notEmpty: { message: "Please select course" },
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
            (a.wrap('<div class="position-relative"></div>'),
                a
                    .select2({
                        dropdownParent: a.parent(),
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

        b.length &&
            (b.wrap('<div class="position-relative"></div>'),
                b
                    .select2({
                        dropdownParent: b.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("subject_section_id[]");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        c.length &&
            (c.wrap('<div class="position-relative"></div>'),
                c
                    .select2({
                        dropdownParent: c.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("curriculum_id");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        d.length &&
            (d.wrap('<div class="position-relative"></div>'),
                d
                    .select2({
                        dropdownParent: d.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("course_id");
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

// Faculty / Instructor Form Validation
document.addEventListener("DOMContentLoaded", function (e) {

    document.querySelectorAll('.instructor-form-valication').forEach(form => {
        const id = form.id;

        initializeFormValidation(id);
    })

    function initializeFormValidation(id) {
        let e = document.getElementById(id),
            a = jQuery(e.querySelector('[name="instructor_id"]')),
            i = FormValidation.formValidation(e, {
                fields: {
                    instructor_id: {
                        validators: {
                            notEmpty: { message: "Please select an instructor" },
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
            (a.wrap('<div class="position-relative"></div>'),
                a
                    .select2({
                        dropdownParent: a.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("instructor_id");
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

// Schedule Create Form Validation
document.addEventListener("DOMContentLoaded", function (e) {
    document.querySelectorAll('.schedule-create-form-validation').forEach(form => {
        const id = form.id;
        initializeFormValidation(id);
    })

    function initializeFormValidation(id) {
        let e = document.getElementById(id),
            g = jQuery(e.querySelector('[name="classification"]')),
            h = jQuery(e.querySelector('[name="room_id"]')),
            i = FormValidation.formValidation(e, {
                fields: {
                    classification: {
                        validators: {
                            notEmpty: { message: "Please select classification" },
                        },
                    },

                    room_id: {
                        validators: {
                            notEmpty: { message: "Please select room" },
                        },
                    },

                    start_time: {
                        validators: {
                            notEmpty: { message: "Please enter start time" },
                        },
                    },

                    end_time: {
                        validators: {
                            notEmpty: { message: "Please enter end time" },
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

        g.length &&
            (g.wrap('<div class="position-relative"></div>'),
                g
                    .select2({
                        dropdownParent: g.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("classification");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        h.length &&
            (h.wrap('<div class="position-relative"></div>'),
                h
                    .select2({
                        dropdownParent: h.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("room_id");
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
        });
    }
});

// Schedule Update Form Validation
document.addEventListener("DOMContentLoaded", function (e) {
    document.querySelectorAll('.schedule-update-form-validation').forEach(form => {
        const id = form.id;
        initializeFormValidation(id);
    })

    function initializeFormValidation(id) {
        let e = document.getElementById(id),
            g = jQuery(e.querySelector('[name="classification"]')),
            h = jQuery(e.querySelector('[name="room_id"]')),
            i = FormValidation.formValidation(e, {
                fields: {
                    classification: {
                        validators: {
                            notEmpty: { message: "Please select classification" },
                        },
                    },

                    room_id: {
                        validators: {
                            notEmpty: { message: "Please select room" },
                        },
                    },

                    start_time: {
                        validators: {
                            notEmpty: { message: "Please enter start time" },
                        },
                    },

                    end_time: {
                        validators: {
                            notEmpty: { message: "Please enter end time" },
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

        g.length &&
            (g.wrap('<div class="position-relative"></div>'),
                g
                    .select2({
                        dropdownParent: g.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("classification");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        h.length &&
            (h.wrap('<div class="position-relative"></div>'),
                h
                    .select2({
                        dropdownParent: h.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("room_id");
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
        });
    }
});

// Section Create Form Validation
document.addEventListener("DOMContentLoaded", function (e) {
    function initializeFormValidation() {
        let e = document.getElementById('sectionForm'),
            f = jQuery(e.querySelector('[name="year_level_id"]')),
            g = jQuery(e.querySelector('[name="program_id"]')),
            i = FormValidation.formValidation(e, {
                fields: {
                    year_level_id: {
                        validators: {
                            notEmpty: { message: "Please select year level" },
                        },
                    },

                    program_id: {
                        validators: {
                            notEmpty: { message: "Please select room" },
                        },
                    },

                    section_description: {
                        validators: {
                            notEmpty: { message: "Please enter section name" },
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
                        i.revalidateField("year_level_id");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        g.length &&
            (g.wrap('<div class="position-relative"></div>'),
                g
                    .select2({
                        dropdownParent: g.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("program_id");
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

// Section Update Form Validation
document.addEventListener("DOMContentLoaded", function (e) {
    function initializeFormValidation() {
        let e = document.getElementById('sectionUpdateForm'),
            f = jQuery(e.querySelector('[name="year_level_id"]')),
            g = jQuery(e.querySelector('[name="program_id"]')),
            i = FormValidation.formValidation(e, {
                fields: {
                    year_level_id: {
                        validators: {
                            notEmpty: { message: "Please select year level" },
                        },
                    },

                    program_id: {
                        validators: {
                            notEmpty: { message: "Please select room" },
                        },
                    },

                    section_description: {
                        validators: {
                            notEmpty: { message: "Please enter section name" },
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
                        i.revalidateField("year_level_id");
                    })),
            isRtl &&
            (s = [].slice.call(
                document.querySelectorAll(".typeahead")
            )) &&
            s.forEach((e) => {
                e.setAttribute("dir", "rtl");
            });

        g.length &&
            (g.wrap('<div class="position-relative"></div>'),
                g
                    .select2({
                        dropdownParent: g.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("program_id");
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