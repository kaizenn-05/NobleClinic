// Hide inputs Filter Fees and Collection
document.addEventListener("DOMContentLoaded", function () {
    const college = document.querySelector(".js-college-filter");
    const ps = document.querySelector(".js-primary-school-filter");
    const jhs = document.querySelector(".js-jhs-filter");
    const shs = document.querySelector(".js-shs-filter");
    const academic = document.querySelector(".academic_program-filter");
    const all = document.querySelectorAll(".fees-filter");

    // Initially hide all
    all.forEach((select) => select.classList.add("d-none"));

    // Initially hide summary
    document.querySelectorAll(".summary-element").forEach((element) => {
        element.classList.add("d-none");
    });

    academic.onchange = () => {
        // Hide all first
        all.forEach((select) => select.classList.add("d-none"));
        document.querySelectorAll(".summary-element").forEach((element) => {
            element.classList.add("d-none");
        });

        // Reset values inside hidden sections
        all.forEach((section) => {
            section.querySelectorAll("select, input").forEach((el) => {
                if (el.tagName === "SELECT") {
                    el.selectedIndex = 0;
                    el.dispatchEvent(new Event("change"));
                } else if (el.type === "radio" || el.type === "checkbox") {
                    el.checked = false;
                } else {
                    el.value = "";
                }
            });
        });

        let value = academic.options[academic.options.selectedIndex].label;

        if (value.includes("PRIMARY")) {
            ps.classList.remove("d-none");
        } else if (value.includes("JUNIOR HIGH SCHOOL")) {
            jhs.classList.remove("d-none");
        } else if (value.includes("SENIOR HIGH SCHOOL")) {
            shs.classList.remove("d-none");
        } else if (value.includes("COLLEGE")) {
            college.classList.remove("d-none");
        }
    };
});

// Hide inputs of Add Fees and Collection Modal
document.addEventListener("DOMContentLoaded", function () {
    const college = document.querySelector(".js-college");
    const ps = document.querySelector(".js-primary-school");
    const jhs = document.querySelector(".js-jhs");
    const shs = document.querySelector(".js-shs");
    const academic = document.querySelector("#academic_program");
    const all = document.querySelectorAll(".enrollment-select");

    // Initially hide all
    all.forEach((select) => select.classList.add("d-none"));

    // Initially hide summary
    document.querySelectorAll(".summary-element").forEach((element) => {
        element.classList.add("d-none");
    });

    academic.onchange = () => {
        // Hide all first
        all.forEach((select) => select.classList.add("d-none"));
        document.querySelectorAll(".summary-element").forEach((element) => {
            element.classList.add("d-none");
        });

        // Reset values inside hidden sections
        all.forEach((section) => {
            section.querySelectorAll("select, input").forEach((el) => {
                if (el.tagName === "SELECT") {
                    el.selectedIndex = 0;
                    el.dispatchEvent(new Event("change"));
                } else if (el.type === "radio" || el.type === "checkbox") {
                    el.checked = false;
                } else {
                    el.value = "";
                }
            });
        });

        let value = academic.options[academic.options.selectedIndex].label;

        if (value.includes("PRIMARY")) {
            ps.classList.remove("d-none");
        } else if (value.includes("JUNIOR HIGH SCHOOL")) {
            jhs.classList.remove("d-none");
        } else if (value.includes("SENIOR HIGH SCHOOL")) {
            shs.classList.remove("d-none");
        } else if (value.includes("COLLEGE")) {
            college.classList.remove("d-none");
        }
    };
});

// Hide inputs Edit Fees and Collection Modal
document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelectorAll('[id^="updateFeeAssignment"]')
        .forEach(function (modal) {
            const college = modal.querySelector(".js-college-update");
            const ps = modal.querySelector(".js-primary-school-update");
            const jhs = modal.querySelector(".js-jhs-update");
            const shs = modal.querySelector(".js-shs-update");
            const academic = modal.querySelector(".academic_program-update");
            const all = modal.querySelectorAll(".enrollment-select-update");

            function toggleSections() {
                all.forEach((s) => s.classList.add("d-none"));

                let value =
                    academic.options[academic.options.selectedIndex].label;

                if (value.includes("PRIMARY")) {
                    ps?.classList.remove("d-none");
                } else if (value.includes("JUNIOR HIGH SCHOOL")) {
                    jhs?.classList.remove("d-none");
                } else if (value.includes("SENIOR HIGH SCHOOL")) {
                    shs?.classList.remove("d-none");
                } else if (value.includes("COLLEGE")) {
                    college?.classList.remove("d-none");
                }
            }

            toggleSections(); // run on load

            if ($(academic).hasClass("select2")) {
                $(academic).on("change", toggleSections);
            } else {
                academic?.addEventListener("change", toggleSections);
            }
        });
});
