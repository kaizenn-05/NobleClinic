(() => {
    window.Helpers.initCustomOptionCheck();
    let e = document.querySelector(".flatpickr"),
        t = document.querySelectorAll(".contact-number-mask"),
        o = $("#plCountry"),
        i = document.querySelector("#plFurnishingDetails");
    t &&
        t.forEach((input) => {
            input.addEventListener("input", (e) => {
                let cleaned = e.target.value.replace(/\D/g, "");
                input.value = formatGeneral(cleaned, {
                    blocks: [4, 3, 4],
                    delimiters: [" ", " "],
                });
            });

            registerCursorTracker({ input: input, delimiter: " " });
        });

    // School year masking (e.g., 2020–2024)
    const schoolYearInputs = document.querySelectorAll(".school-year-mask");
    schoolYearInputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            let cleaned = e.target.value.replace(/[^\d]/g, "");
            if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);
            if (cleaned.length >= 4) {
                input.value = cleaned.slice(0, 4) + "–" + cleaned.slice(4);
            } else {
                input.value = cleaned;
            }
        });
    });

    o &&
        (o.wrap('<div class="position-relative"></div>'),
            o.select2({
                placeholder: "Select country",
                dropdownParent: o.parent(),
            })),
        e && e.flatpickr(),
        i &&
        new Tagify(i, {
            whitelist: [
                "Fridge",
                "TV",
                "AC",
                "WiFi",
                "RO",
                "Washing Machine",
                "Sofa",
                "Bed",
                "Dining Table",
                "Microwave",
                "Cupboard",
            ],
            maxTags: 9,
            dropdown: {
                maxItems: 20,
                classname: "tags-inline",
                enabled: 0,
                closeOnSelect: !1,
            },
        });

    var l = document.querySelector("#wizard-property-listing");
    if (null !== l) {

        // ⚠️ FIX: keep a dedicated reference to the <form> element.
        // Your original code reused the same variable name `s` for the
        // form and then overwrote it with the .btn-prev button list,
        // so nothing later in the file could ever call form.submit().
        var formEl = l.querySelector("#wizard-property-listing-form"),
            u = formEl.querySelector("#personal-info-vertical"),
            c = formEl.querySelector("#address-vertical"),
            d = formEl.querySelector("#parent-guardian-vertical"),
            p = formEl.querySelector("#socio-economic-vertical"),
            m = formEl.querySelector("#enrollment-info-vertical"),
            y = formEl.querySelector("#educational-background-vertical"),
            x = formEl.querySelector("#your-health-condition-vertical"),
            v = formEl.querySelector("#summary-vertical"),
            g = [].slice.call(formEl.querySelectorAll(".btn-next")),
            prevButtons = [].slice.call(formEl.querySelectorAll(".btn-prev")),
            submitBtn = formEl.querySelector(".btn-submit");

        let t = new Stepper(l, { linear: !0 }),

            // Declared up front so they're proper local variables
            // (previously f, k, j were implicit globals).
            f, k, j,

            o = FormValidation.formValidation(u, {
                fields: {
                    admission: {
                        validators: {
                            notEmpty: {
                                message: "Please select admission",
                            },
                        },
                    },
                    first_name: {
                        validators: {
                            notEmpty: {
                                message: "Please enter your first name",
                            },
                        },
                    },
                    last_name: {
                        validators: {
                            notEmpty: {
                                message: "Please enter your last name",
                            },
                        },
                    },
                    date_of_birth: {
                        validators: {
                            notEmpty: {
                                message: "Please enter your birth date",
                            },
                        },
                    },
                    place_of_birth: {
                        validators: {
                            notEmpty: {
                                message: "Please enter your place of birth",
                            },
                        },
                    },
                    gender: {
                        validators: {
                            notEmpty: {
                                message: "Please select gender",
                            },
                        },
                    },
                    religion: {
                        validators: {
                            notEmpty: {
                                message: "Please select your religion",
                            },
                        },
                    },
                    nationality: {
                        validators: {
                            notEmpty: {
                                message: "Please select your nationality",
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap5: new FormValidation.plugins.Bootstrap5({
                        eleValidClass: "",
                        rowSelector: ".form-control-validation",
                    }),
                    autoFocus: new FormValidation.plugins.AutoFocus(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                },
                init: (e) => {
                    e.on("plugins.message.placed", function (e) {
                        e.element.parentElement.classList.contains(
                            "input-group"
                        ) &&
                            e.element.parentElement.insertAdjacentElement(
                                "afterend",
                                e.messageElement
                            );
                    });
                },
            }).on("core.form.valid", function () {
                t.next();
            }),
            i = FormValidation.formValidation(c, {
                fields: {
                    province: {
                        validators: {
                            notEmpty: {
                                message: "Please select property type",
                            },
                        },
                    },
                    city: {
                        validators: {
                            notEmpty: {
                                message: "Please select City/Municipality",
                            },
                        },
                    },
                    barangay: {
                        validators: {
                            notEmpty: {
                                message: "Please select barangay",
                            },
                        },
                    },
                    street: {
                        validators: {
                            notEmpty: {
                                message: "Please enter street",
                            },
                        },
                    },
                    mobile_number: {
                        validators: {
                            notEmpty: {
                                message: "Please enter mobile number",
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap5: new FormValidation.plugins.Bootstrap5({
                        eleValidClass: "",
                        rowSelector: function (e, t) {
                            return ".form-control-validation";
                        },
                    }),
                    autoFocus: new FormValidation.plugins.AutoFocus(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                },
            }).on("core.form.valid", function () {
                t.next();
            });

        l = $("#religion");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select Religion",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        o.revalidateField("religion");
                    }));

        l = $("#nationality");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select Nationality",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        o.revalidateField("nationality");
                    }));

        l = $("#province");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select property type",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("province");
                    }));

        l = $("#city");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select property type",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("city");
                    }));

        l = $("#barangay");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select barangay",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        i.revalidateField("barangay");
                    }));

        let a = FormValidation.formValidation(d, {
            fields: {},
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap5: new FormValidation.plugins.Bootstrap5({
                    eleValidClass: "",
                    rowSelector: ".form-control-validation",
                }),
                autoFocus: new FormValidation.plugins.AutoFocus(),
                submitButton: new FormValidation.plugins.SubmitButton(),
            },
        }).on("core.form.valid", function () {
            t.next();
        }),
            r = FormValidation.formValidation(p, {
                fields: {},
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap5: new FormValidation.plugins.Bootstrap5({
                        eleValidClass: "",
                        rowSelector: ".form-control-validation",
                    }),
                    autoFocus: new FormValidation.plugins.AutoFocus(),
                    submitButton: new FormValidation.plugins.SubmitButton(),
                },
            }).on("core.form.valid", function () {
                t.next();
            }),
            n = FormValidation.formValidation(m, {
                fields: {
                    enrollment_schedule: {
                        validators: {
                            notEmpty: {
                                message: "Please select academic program",
                            },
                        },
                    },
                    school_year: {
                        validators: {
                            notEmpty: {
                                message: "Please select school year",
                            },
                        },
                    },
                    semester: {
                        validators: {
                            notEmpty: {
                                message: "Please select semester",
                            },
                        },
                    },
                    program: {
                        validators: {
                            notEmpty: {
                                message: "Please select program",
                            },
                        },
                    },
                    year_level: {
                        validators: {
                            notEmpty: {
                                message: "Please select year level",
                            },
                        },
                    },
                    primary_grade: {
                        validators: {
                            notEmpty: {
                                message: "Please select year level",
                            },
                        },
                    },
                    jhs_grade: {
                        validators: {
                            notEmpty: {
                                message: "Please select year level",
                            },
                        },
                    },
                    shs_grade: {
                        validators: {
                            notEmpty: {
                                message: "Please select year level",
                            },
                        },
                    },
                    lrn: {
                        validators: {
                            notEmpty: {
                                message: "Please enter LRN",
                            },
                        },
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap5: new FormValidation.plugins.Bootstrap5({
                        eleValidClass: "",
                        rowSelector: ".form-control-validation",
                    }),
                    autoFocus: new FormValidation.plugins.AutoFocus(),
                    submitButton: new FormValidation.plugins.SubmitButton(),

                    excluded: new FormValidation.plugins.Excluded({
                        excluded: function (field, element, elements) {
                            // Skip hidden fields only if they're inside hidden enrollment sections
                            return element
                                .closest(".enrollment-select")
                                ?.classList.contains("d-none");
                        },
                    }),
                },
            }).on("core.form.valid", function () {
                t.next();
            });

        f = FormValidation.formValidation(y, {
            fields: {},
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap5: new FormValidation.plugins.Bootstrap5({
                    eleValidClass: "",
                    rowSelector: ".form-control-validation",
                }),
                autoFocus: new FormValidation.plugins.AutoFocus(),
                submitButton: new FormValidation.plugins.SubmitButton(),
            },
        }).on("core.form.valid", function () {
            t.next();
        });

        k = FormValidation.formValidation(x, {
            fields: {},
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap5: new FormValidation.plugins.Bootstrap5({
                    eleValidClass: "",
                    rowSelector: ".form-control-validation",
                }),
                autoFocus: new FormValidation.plugins.AutoFocus(),
                submitButton: new FormValidation.plugins.SubmitButton(),
            },
        }).on("core.form.valid", function () {
            populateSummary();
            t.next();
        });

        // ⚠️ FIX: on the final step, actually submit the form to Laravel
        // instead of just showing an alert(). This is what was causing
        // "nothing happens" — validation passed but nothing ever posted.
        j = FormValidation.formValidation(v, {
            fields: {},
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap5: new FormValidation.plugins.Bootstrap5({
                    eleValidClass: "",
                    rowSelector: ".form-control-validation",
                }),
                autoFocus: new FormValidation.plugins.AutoFocus(),
                submitButton: new FormValidation.plugins.SubmitButton(),
            },
        }).on("core.form.valid", function () {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML =
                    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting...';
            }
            formEl.submit();
        });

        l = $("#enrollment_schedule");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select academic program",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        n.revalidateField("enrollment_schedule");
                    }));
        l = $("#program");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select program",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        n.revalidateField("program");
                    }));
        l = $("#year_level");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select year level",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        n.revalidateField("year_level");
                    }));
        l = $("#elem_grade");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select year level",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        n.revalidateField("elem_grade");
                    }));
        l = $("#jhs_grade");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select year level",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        n.revalidateField("jhs_grade");
                    }));
        l = $("#shs_grade");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select year level",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        n.revalidateField("shs_grade");
                    }));
        l = $("#lrn");
        l.length &&
            (l.wrap('<div class="position-relative"></div>'),
                l
                    .select2({
                        placeholder: "Select enter lrn",
                        dropdownParent: l.parent(),
                    })
                    .on("change", function () {
                        n.revalidateField("lrn");
                    }));

        g.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                switch (t._currentIndex) {
                    case 0:
                        o.validate();
                        break;
                    case 1:
                        i.validate();
                        break;
                    case 2:
                        a.validate();
                        break;
                    case 3:
                        r.validate();
                        break;
                    case 4:
                        n.validate();
                        break;
                    case 5:
                        f.validate();
                        break;
                    case 6:
                        k.validate();
                        break;
                }
            });
        });

        prevButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                if (t._currentIndex > 0) {
                    t.previous();
                }
            });
        });

        // ⚠️ FIX: this is the button your original JS never wired up.
        // Because it sat inside a <form> with no explicit type, clicking
        // it triggered a native full-page submit (bypassing FormValidation
        // entirely) — which is exactly the "just reloads the page" symptom.
        if (submitBtn) {
            submitBtn.addEventListener("click", (e) => {
                e.preventDefault();
                j.validate();
            });
        }
    }
})();

function populateSummary() {
    document.getElementById("summary-admission").innerText =
        document.getElementById("admission").selectedOptions[0]?.text ?? "-";

    document.getElementById("summary-name").innerText =
        [
            document.getElementById("first_name").value,
            document.getElementById("middle_name").value,
            document.getElementById("last_name").value,
            document.getElementById("suffix").value,
        ]
            .filter(Boolean)
            .join(" ") || "-";

    document.getElementById("summary-birthdate").innerText =
        document.getElementById("date_of_birth").value || "-";
    document.getElementById("summary-birthplace").innerText =
        document.getElementById("place_of_birth").value || "-";
    document.getElementById("summary-native_lang").innerText =
        document.getElementById("native_lang").value || "-";
    document.getElementById("summary-mother_tongue").innerText =
        document.getElementById("mother_tongue").value || "-";
    document.getElementById("summary-gender").innerText =
        document.getElementById("gender").value || "-";
    document.getElementById("summary-ethnic_group").innerText =
        document.getElementById("ethnic_group").value || "-";
    document.getElementById("summary-religion").innerText =
        document.getElementById("religion").value || "-";
    document.getElementById("summary-nationality").innerText =
        document.getElementById("nationality").value || "-";

    const fullAddress = [
        document.getElementById("street").value,
        document.getElementById("barangay").value,
        document.getElementById("city").value,
        document.getElementById("province").value,
    ]
        .filter(Boolean)
        .join(", ");
    document.getElementById("summary-address").innerText = fullAddress || "-";

    document.getElementById("summary-mobile").innerText =
        document.getElementById("mobile_number").value || "-";
    document.getElementById("summary-email").innerText =
        document.getElementById("email_address").value || "-";

    // Father Info
    document.getElementById("summary-father-name").innerText =
        [
            document.getElementById("father_first_name").value,
            document.getElementById("father_middle_name").value,
            document.getElementById("father_last_name").value,
            document.getElementById("father_suffix").value,
        ]
            .filter(Boolean)
            .join(" ") || "-";

    document.getElementById("summary-father-phone").innerText =
        document.getElementById("father_contact_number").value || "-";

    document.getElementById("summary-father-address").innerText =
        document.getElementById("father_home_address").value || "-";

    // Mother Info
    document.getElementById("summary-mother-name").innerText =
        [
            document.getElementById("mother_first_name").value,
            document.getElementById("mother_middle_name").value,
            document.getElementById("mother_last_name").value,
        ]
            .filter(Boolean)
            .join(" ") || "-";

    document.getElementById("summary-mother-phone").innerText =
        document.getElementById("mother_contact_number").value || "-";

    document.getElementById("summary-mother-address").innerText =
        document.getElementById("mother_home_address").value || "-";

    document.getElementById("summary-mother-maiden").innerText =
        document.getElementById("mother_maiden_name").value || "-";

    // Guardian Info
    document.getElementById("summary-guardian-name").innerText =
        [
            document.getElementById("guardian_first_name").value,
            document.getElementById("guardian_middle_name").value,
            document.getElementById("guardian_last_name").value,
            document.getElementById("guardian_suffix").value,
        ]
            .filter(Boolean)
            .join(" ") || "-";

    document.getElementById("summary-guardian-phone").innerText =
        document.getElementById("guardian_contact_number").value || "-";

    document.getElementById("summary-guardian-address").innerText =
        document.getElementById("guardian_home_address").value || "-";

    // Emergency Contact
    const emergencyRadio = document.querySelector(
        'input[name="emergency"]:checked'
    );
    document.getElementById("summary-emergency-contact").innerText =
        emergencyRadio
            ? emergencyRadio.value.charAt(0).toUpperCase() +
            emergencyRadio.value.slice(1)
            : "-";

    // Father Socio-Economic Info
    document.getElementById("summary-father-education").innerText =
        document.getElementById("father_educ_attain").value || "-";

    document.getElementById("summary-father-occupation").innerText =
        document.getElementById("father_occupation").value || "-";

    document.getElementById("summary-father-income").innerText =
        document.getElementById("father_monthly_income").value || "-";

    document.getElementById("summary-father-other-income").innerText =
        document.getElementById("father_other_income").value || "-";

    document.getElementById("summary-father-ethnicity").innerText =
        document.getElementById("father_ethnicity").value || "-";

    // Mother Socio-Economic Info
    document.getElementById("summary-mother-education").innerText =
        document.getElementById("mother_educ_attain").value || "-";

    document.getElementById("summary-mother-occupation").innerText =
        document.getElementById("mother_occupation").value || "-";

    document.getElementById("summary-mother-income").innerText =
        document.getElementById("mother_monthly_income").value || "-";

    document.getElementById("summary-mother-other-income").innerText =
        document.getElementById("mother_other_income").value || "-";

    document.getElementById("summary-mother-ethnicity").innerText =
        document.getElementById("mother_ethnicity").value || "-";

    // Guardian Socio-Economic Info
    document.getElementById("summary-guardian-education").innerText =
        document.getElementById("guardian_educ_attain").value || "-";

    document.getElementById("summary-guardian-occupation").innerText =
        document.getElementById("guardian_occupation").value || "-";

    document.getElementById("summary-guardian-income").innerText =
        document.getElementById("guardian_monthly_income").value || "-";

    document.getElementById("summary-guardian-other-income").innerText =
        document.getElementById("guardian_other_income").value || "-";

    document.getElementById("summary-guardian-ethnicity").innerText =
        document.getElementById("guardian_ethnicity").value || "-";

    document.getElementById("summary-guardian-relation").innerText =
        document.getElementById("guardian_relation").value || "-";

    document.querySelectorAll('input[name="branch"]').forEach((branch) => {
        if (branch.checked) {
            document.getElementById("summary-branch").innerText =
                branch.ariaLabel;
        }
    });
    document.getElementById("summary-academic-program").innerText =
        document.getElementById("enrollment_schedule").selectedOptions[0]?.text ??
        "-";
    document.getElementById("summary-program").innerText =
        document.getElementById("program").selectedOptions[0]?.text ?? "-";
    document.getElementById("summary-year-level").innerText =
        document.getElementById("year_level").selectedOptions[0]?.text ?? "-";
    document.getElementById("summary-lrn").innerText =
        document.getElementById("LRN").value || "-";
    document.getElementById("summary-strand").innerText =
        document.getElementById("strand").selectedOptions[0]?.text ?? "-";
    document.getElementById("summary-primary-grade").innerText =
        document.getElementById("primary_grade").selectedOptions[0]?.text ??
        "-";
    document.getElementById("summary-jhs-grade").innerText =
        document.getElementById("jhs_grade").selectedOptions[0]?.text ?? "-";
    document.getElementById("summary-shs-grade").innerText =
        document.getElementById("shs_grade").selectedOptions[0]?.text ?? "-";

    document.getElementById("summary-last-school").innerText =
        document.getElementById("last_school_attended").value || "-";
    document.getElementById("summary-grade-level").innerText =
        document.getElementById("grade_level_school").selectedOptions[0]
            ?.text || "-";
    document.getElementById("summary-school-address").innerText =
        document.getElementById("mailing_address").value || "-";

    document.getElementById("summary-pre-school-name").innerText =
        document.getElementById("pre_school_name").value || "-";
    document.getElementById("summary-pre-school-year").innerText =
        document.getElementById("pre_school_year").value || "-";
    document.getElementById("summary-pre-school-type").innerText =
        document.getElementById("pre_school_type").selectedOptions[0]?.text ||
        "-";

    document.getElementById("summary-grade-school-name").innerText =
        document.getElementById("grade_school_name").value || "-";
    document.getElementById("summary-grade-school-year").innerText =
        document.getElementById("grade_school_year").value || "-";
    document.getElementById("summary-grade-school-type").innerText =
        document.getElementById("grade_school_type").selectedOptions[0]?.text ||
        "-";

    document.getElementById("summary-jhs-name").innerText =
        document.getElementById("junior_high_school_name").value || "-";
    document.getElementById("summary-jhs-year").innerText =
        document.getElementById("junior_high_school_year").value || "-";
    document.getElementById("summary-jhs-type").innerText =
        document.getElementById("junior_high_school_type").selectedOptions[0]
            ?.text || "-";

    document.getElementById("summary-shs-name").innerText =
        document.getElementById("senior_high_school_name").value || "-";
    document.getElementById("summary-shs-strand").innerText =
        document.getElementById("senior_high_school_strand").value || "-";
    document.getElementById("summary-shs-year").innerText =
        document.getElementById("senior_high_school_year").value || "-";
    document.getElementById("summary-shs-type").innerText =
        document.getElementById("senior_high_school_type").selectedOptions[0]
            ?.text || "-";

    document.getElementById("summary-college-name").innerText =
        document.getElementById("college_school_name").value || "-";
    document.getElementById("summary-college-program").innerText =
        document.getElementById("college_program").value || "-";
    document.getElementById("summary-college-year").innerText =
        document.getElementById("college_school_year").value || "-";
    document.getElementById("summary-college-type").innerText =
        document.getElementById("college_school_type").selectedOptions[0]
            ?.text || "-";

    // Medical Information
    document.getElementById("summary-allergies").textContent =
        document.getElementById("allergies").value || "-";
    document.getElementById("summary-allergies-med").textContent =
        document.getElementById("aller_to_med").value || "-";
    document.getElementById("summary-med-reasons").textContent =
        document.getElementById("med_reasons").value || "-";
    document.getElementById("summary-med-history").textContent =
        document.getElementById("med_history").value || "-";
    document.getElementById("summary-other-med-info").textContent =
        document.getElementById("other_med_info").value || "-";

    // PWD
    const pwdYes = document.getElementById("pwd_yes");
    const pwdNo = document.getElementById("pwd_no");
    document.getElementById("summary-pwd").textContent = pwdYes.checked
        ? "Yes"
        : pwdNo.checked
            ? "No"
            : "-";

    // Dependent Solo Parent
    const dspYes = document.getElementById("dsp_yes");
    const dspNo = document.getElementById("dsp_no");
    document.getElementById("summary-dsp").textContent = dspYes.checked
        ? "Yes"
        : dspNo.checked
            ? "No"
            : "-";

    // BEC Cell and Chapel/Zone
    document.getElementById("summary-bec").textContent =
        document.getElementById("BEC_cell").value || "-";
    document.getElementById("summary-chapel").textContent =
        document.getElementById("chapel_zone").value || "-";
}

function populateSummary() {
    document.getElementById("summary-admission").innerText =
        document.getElementById("admission").selectedOptions[0]?.text ?? "-";

    document.getElementById("summary-name").innerText =
        [
            document.getElementById("first_name").value,
            document.getElementById("middle_name").value,
            document.getElementById("last_name").value,
            document.getElementById("suffix").value,
        ]
            .filter(Boolean)
            .join(" ") || "-";

    document.getElementById("summary-birthdate").innerText =
        document.getElementById("date_of_birth").value || "-";
    document.getElementById("summary-birthplace").innerText =
        document.getElementById("place_of_birth").value || "-";
    document.getElementById("summary-native_lang").innerText =
        document.getElementById("native_lang").value || "-";
    document.getElementById("summary-mother_tongue").innerText =
        document.getElementById("mother_tongue").value || "-";
    document.getElementById("summary-gender").innerText =
        document.getElementById("gender").value || "-";
    document.getElementById("summary-ethnic_group").innerText =
        document.getElementById("ethnic_group").value || "-";
    document.getElementById("summary-religion").innerText =
        document.getElementById("religion").value || "-";
    document.getElementById("summary-nationality").innerText =
        document.getElementById("nationality").value || "-";

    const fullAddress = [
        document.getElementById("street").value,
        document.getElementById("barangay").value,
        document.getElementById("city").value,
        document.getElementById("province").value,
    ]
        .filter(Boolean)
        .join(", ");
    document.getElementById("summary-address").innerText = fullAddress || "-";

    document.getElementById("summary-mobile").innerText =
        document.getElementById("mobile_number").value || "-";
    document.getElementById("summary-email").innerText =
        document.getElementById("email_address").value || "-";

    // Father Info
    document.getElementById("summary-father-name").innerText =
        [
            document.getElementById("father_first_name").value,
            document.getElementById("father_middle_name").value,
            document.getElementById("father_last_name").value,
            document.getElementById("father_suffix").value,
        ]
            .filter(Boolean)
            .join(" ") || "-";

    document.getElementById("summary-father-phone").innerText =
        document.getElementById("father_contact_number").value || "-";

    document.getElementById("summary-father-address").innerText =
        document.getElementById("father_home_address").value || "-";

    // Mother Info
    document.getElementById("summary-mother-name").innerText =
        [
            document.getElementById("mother_first_name").value,
            document.getElementById("mother_middle_name").value,
            document.getElementById("mother_last_name").value,
        ]
            .filter(Boolean)
            .join(" ") || "-";

    document.getElementById("summary-mother-phone").innerText =
        document.getElementById("mother_contact_number").value || "-";

    document.getElementById("summary-mother-address").innerText =
        document.getElementById("mother_home_address").value || "-";

    document.getElementById("summary-mother-maiden").innerText =
        document.getElementById("mother_maiden_name").value || "-";

    // Guardian Info
    document.getElementById("summary-guardian-name").innerText =
        [
            document.getElementById("guardian_first_name").value,
            document.getElementById("guardian_middle_name").value,
            document.getElementById("guardian_last_name").value,
            document.getElementById("guardian_suffix").value,
        ]
            .filter(Boolean)
            .join(" ") || "-";

    document.getElementById("summary-guardian-phone").innerText =
        document.getElementById("guardian_contact_number").value || "-";

    document.getElementById("summary-guardian-address").innerText =
        document.getElementById("guardian_home_address").value || "-";

    // Emergency Contact
    const emergencyRadio = document.querySelector(
        'input[name="emergency"]:checked'
    );
    document.getElementById("summary-emergency-contact").innerText =
        emergencyRadio
            ? emergencyRadio.value.charAt(0).toUpperCase() +
            emergencyRadio.value.slice(1)
            : "-";

    // Father Socio-Economic Info
    document.getElementById("summary-father-education").innerText =
        document.getElementById("father_educ_attain").value || "-";

    document.getElementById("summary-father-occupation").innerText =
        document.getElementById("father_occupation").value || "-";

    document.getElementById("summary-father-income").innerText =
        document.getElementById("father_monthly_income").value || "-";

    document.getElementById("summary-father-other-income").innerText =
        document.getElementById("father_other_income").value || "-";

    document.getElementById("summary-father-ethnicity").innerText =
        document.getElementById("father_ethnicity").value || "-";

    // Mother Socio-Economic Info
    document.getElementById("summary-mother-education").innerText =
        document.getElementById("mother_educ_attain").value || "-";

    document.getElementById("summary-mother-occupation").innerText =
        document.getElementById("mother_occupation").value || "-";

    document.getElementById("summary-mother-income").innerText =
        document.getElementById("mother_monthly_income").value || "-";

    document.getElementById("summary-mother-other-income").innerText =
        document.getElementById("mother_other_income").value || "-";

    document.getElementById("summary-mother-ethnicity").innerText =
        document.getElementById("mother_ethnicity").value || "-";

    // Guardian Socio-Economic Info
    document.getElementById("summary-guardian-education").innerText =
        document.getElementById("guardian_educ_attain").value || "-";

    document.getElementById("summary-guardian-occupation").innerText =
        document.getElementById("guardian_occupation").value || "-";

    document.getElementById("summary-guardian-income").innerText =
        document.getElementById("guardian_monthly_income").value || "-";

    document.getElementById("summary-guardian-other-income").innerText =
        document.getElementById("guardian_other_income").value || "-";

    document.getElementById("summary-guardian-ethnicity").innerText =
        document.getElementById("guardian_ethnicity").value || "-";

    document.getElementById("summary-guardian-relation").innerText =
        document.getElementById("guardian_relation").value || "-";

    document.querySelectorAll('input[name="branch"]').forEach((branch) => {
        branch.checked
            ? (document.getElementById("summary-branch").innerText =
                branch.ariaLabel)
            : "-";
    });
    document.getElementById("summary-academic-program").innerText =
        document.getElementById("enrollment_schedule").selectedOptions[0]?.text ??
        "-";
    document.getElementById("summary-program").innerText =
        document.getElementById("program").selectedOptions[0]?.text ?? "-";
    document.getElementById("summary-year-level").innerText =
        document.getElementById("year_level").selectedOptions[0]?.text ?? "-";
    document.getElementById("summary-lrn").innerText =
        document.getElementById("LRN").value || "-";
    document.getElementById("summary-strand").innerText =
        document.getElementById("strand").selectedOptions[0]?.text ?? "-";
    document.getElementById("summary-primary-grade").innerText =
        document.getElementById("primary_grade").selectedOptions[0]?.text ??
        "-";
    document.getElementById("summary-jhs-grade").innerText =
        document.getElementById("jhs_grade").selectedOptions[0]?.text ?? "-";
    document.getElementById("summary-shs-grade").innerText =
        document.getElementById("shs_grade").selectedOptions[0]?.text ?? "-";

    document.getElementById("summary-last-school").innerText =
        document.getElementById("last_school_attended").value || "-";
    document.getElementById("summary-grade-level").innerText =
        document.getElementById("grade_level_school").selectedOptions[0]
            ?.text || "-";
    document.getElementById("summary-school-address").innerText =
        document.getElementById("mailing_address").value || "-";

    document.getElementById("summary-pre-school-name").innerText =
        document.getElementById("pre_school_name").value || "-";
    document.getElementById("summary-pre-school-year").innerText =
        document.getElementById("pre_school_year").value || "-";
    document.getElementById("summary-pre-school-type").innerText =
        document.getElementById("pre_school_type").selectedOptions[0]?.text ||
        "-";

    document.getElementById("summary-grade-school-name").innerText =
        document.getElementById("grade_school_name").value || "-";
    document.getElementById("summary-grade-school-year").innerText =
        document.getElementById("grade_school_year").value || "-";
    document.getElementById("summary-grade-school-type").innerText =
        document.getElementById("grade_school_type").selectedOptions[0]?.text ||
        "-";

    document.getElementById("summary-jhs-name").innerText =
        document.getElementById("junior_high_school_name").value || "-";
    document.getElementById("summary-jhs-year").innerText =
        document.getElementById("junior_high_school_year").value || "-";
    document.getElementById("summary-jhs-type").innerText =
        document.getElementById("junior_high_school_type").selectedOptions[0]
            ?.text || "-";

    document.getElementById("summary-shs-name").innerText =
        document.getElementById("senior_high_school_name").value || "-";
    document.getElementById("summary-shs-strand").innerText =
        document.getElementById("senior_high_school_strand").value || "-";
    document.getElementById("summary-shs-year").innerText =
        document.getElementById("senior_high_school_year").value || "-";
    document.getElementById("summary-shs-type").innerText =
        document.getElementById("senior_high_school_type").selectedOptions[0]
            ?.text || "-";

    document.getElementById("summary-college-name").innerText =
        document.getElementById("college_school_name").value || "-";
    document.getElementById("summary-college-program").innerText =
        document.getElementById("college_program").value || "-";
    document.getElementById("summary-college-year").innerText =
        document.getElementById("college_school_year").value || "-";
    document.getElementById("summary-college-type").innerText =
        document.getElementById("college_school_type").selectedOptions[0]
            ?.text || "-";

    // Medical Information
    document.getElementById("summary-allergies").textContent =
        document.getElementById("allergies").value || "-";
    document.getElementById("summary-allergies-med").textContent =
        document.getElementById("aller_to_med").value || "-";
    document.getElementById("summary-med-reasons").textContent =
        document.getElementById("med_reasons").value || "-";
    document.getElementById("summary-med-history").textContent =
        document.getElementById("med_history").value || "-";
    document.getElementById("summary-other-med-info").textContent =
        document.getElementById("other_med_info").value || "-";

    // PWD
    const pwdYes = document.getElementById("pwd_yes");
    const pwdNo = document.getElementById("pwd_no");
    document.getElementById("summary-pwd").textContent = pwdYes.checked
        ? "Yes"
        : pwdNo.checked
            ? "No"
            : "-";

    // Dependent Solo Parent
    const dspYes = document.getElementById("dsp_yes");
    const dspNo = document.getElementById("dsp_no");
    document.getElementById("summary-dsp").textContent = dspYes.checked
        ? "Yes"
        : dspNo.checked
            ? "No"
            : "-";

    // BEC Cell and Chapel/Zone
    document.getElementById("summary-bec").textContent =
        document.getElementById("BEC_cell").value || "-";
    document.getElementById("summary-chapel").textContent =
        document.getElementById("chapel_zone").value || "-";
}

document.querySelectorAll(".btn-next").forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
    });
});

document.querySelectorAll(".btn-prev").forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
    });
});
