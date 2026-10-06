(() => {
    // Document Description Update Form Validation
    document.addEventListener("DOMContentLoaded", function (e) {

        document.querySelectorAll('.rejection-form-validation').forEach(form => {
            const id = form.id;

            initializeFormValidation(id);
        })

        function initializeFormValidation(id) {
            let e = document.getElementById(id),
                a = jQuery(e.querySelector('[name="personnel_id"]')),
                i = FormValidation.formValidation(e, {
                    fields: {
                        rejection_message: {
                            validators: {
                                notEmpty: { message: "Please write a message" },
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
                            i.revalidateField("personnel_id");
                        })),
                isRtl &&
                (s = [].slice.call(
                    document.querySelectorAll(".typeahead")
                )) &&
                s.forEach((e) => {
                    e.setAttribute("dir", "rtl");
                });
        }
    });
})();