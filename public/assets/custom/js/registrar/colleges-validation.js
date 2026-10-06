document.addEventListener("DOMContentLoaded", function () {
    function initializeFormValidation() {
        let e = document.getElementById("createCollegeForm"),
            i = FormValidation.formValidation(e, {
                fields: {
                    college_description: {
                        validators: {
                            notEmpty: {
                                message: "Please enter college description",
                            },
                        },
                    },
                    college_abbreviation: {
                        validators: {
                            notEmpty: {
                                message: "Please enter college abbreviation",
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
    }

    initializeFormValidation();
});
