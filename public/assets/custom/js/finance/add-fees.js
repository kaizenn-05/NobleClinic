$(document).ready(function () {
    // Function to toggle save button
    function toggleButtons() {
        const academicProgram = $("#academic_program");
        const description = $("#description");
        const addSaveBtn = $(".add-save-btn");

        const hasAcademicProgram =
            academicProgram.val() !== "" && academicProgram.val() !== null;
        const hasDescription =
            description.val() !== "" && description.val() !== null;

        if (hasAcademicProgram && hasDescription) {
            addSaveBtn.prop("disabled", false);
        } else {
            addSaveBtn.prop("disabled", true);
        }
    }

    // Function to update description for College
    function updateCollegeDescription() {
        const programSelect = $("#program");
        const yearLevelSelect = $("#year_level");
        const descriptionInput = $("#description");

        const programId = programSelect.val();
        const yearLevelId = yearLevelSelect.val();

        if (programId && yearLevelId) {
            // Get the program abbreviation from data attribute
            const programAbbr = programSelect
                .find("option:selected")
                .data("abbr");
            const yearLevelText = yearLevelSelect
                .find("option:selected")
                .text()
                .trim();

            // Format: "1ST YEAR COLLEGE PAYABLE (BSIT)"
            const description = `${yearLevelText.toUpperCase()} PAYABLE (${programAbbr.toUpperCase()})`;
            descriptionInput.val(description).trigger("change"); // Trigger change event
        } else {
            descriptionInput.val("").trigger("change"); // Trigger change event
        }

        toggleButtons(); // Check button state
    }

    // Function to update description for Primary/JHS
    function updateOtherDescription(gradeSelector) {
        const gradeSelect = $(gradeSelector);
        const descriptionInput = $("#description");

        const gradeId = gradeSelect.val();

        if (gradeId) {
            const gradeText = gradeSelect.find("option:selected").text().trim();
            const description = `${gradeText.toUpperCase()} PAYABLE`;
            descriptionInput.val(description).trigger("change"); // Trigger change event
        } else {
            descriptionInput.val("").trigger("change"); // Trigger change event
        }

        toggleButtons(); // Check button state
    }

    // Function to update description for SHS
    function updateSHSDescription() {
        const gradeSelect = $("#shs_grade");
        const strandSelect = $("#strand");
        const descriptionInput = $("#description");

        const gradeId = gradeSelect.val();

        if (gradeId) {
            const gradeText = gradeSelect.find("option:selected").text().trim();
            let description = `${gradeText.toUpperCase()} PAYABLE`;

            const strandId = strandSelect.val();
            if (strandId) {
                const strandText = strandSelect
                    .find("option:selected")
                    .text()
                    .trim();
                description += ` (${strandText.toUpperCase()})`;
            }

            descriptionInput.val(description).trigger("change"); // Trigger change event
        } else {
            descriptionInput.val("").trigger("change"); // Trigger change event
        }

        toggleButtons(); // Check button state
    }

    // Listen for changes on Program select
    $("#program").on("change", function () {
        updateCollegeDescription();
    });

    // Listen for changes on Year Level select
    $("#year_level").on("change", function () {
        updateCollegeDescription();
    });

    // Listen for changes on Primary Grade Level
    $("#primary_grade").on("change", function () {
        updateOtherDescription("#primary_grade");
    });

    // Listen for changes on JHS Grade Level
    $("#jhs_grade").on("change", function () {
        updateOtherDescription("#jhs_grade");
    });

    // Listen for changes on SHS Grade Level
    $("#shs_grade").on("change", function () {
        updateSHSDescription();
    });

    // Listen for changes on SHS Strand
    $("#strand").on("change", function () {
        updateSHSDescription();
    });

    // Clear description when academic program changes
    $("#academic_program").on("change", function () {
        $("#description").val("").trigger("change"); // Trigger change event
        toggleButtons(); // Check button state
    });

    // Watch for change events on academic program and description
    $("#academic_program").on("change", toggleButtons);
    $("#description").on("change", toggleButtons);

    // Run once on load
    toggleButtons();
});
