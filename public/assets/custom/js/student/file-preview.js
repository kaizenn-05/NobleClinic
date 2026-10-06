function handleFileChange(input, type, enrollmentId) {
    const file = input.files[0];
    if (!file) return;

    // Define element IDs based on type
    let previewId, indicatorId, resetBtnId;

    if (type === "avatar") {
        previewId = `profilePreview${enrollmentId}`;
        indicatorId = `profileChangedIndicator${enrollmentId}`;
        resetBtnId = `resetProfile${enrollmentId}`;
    } else if (type === "psa") {
        previewId = `psaPreview${enrollmentId}`;
        indicatorId = `psaChangedIndicator${enrollmentId}`;
        resetBtnId = `resetPsa${enrollmentId}`;
    } else if (type === "goodMoral") {
        previewId = `goodMoralPreview${enrollmentId}`;
        indicatorId = `goodMoralChangedIndicator${enrollmentId}`;
        resetBtnId = `resetGoodMoral${enrollmentId}`;
    }

    const previewElement = document.getElementById(previewId);
    const indicator = document.getElementById(indicatorId);
    const resetBtn = document.getElementById(resetBtnId);

    if (!previewElement) return;

    // Show indicators
    if (indicator) indicator.classList.remove("d-none");
    if (resetBtn) resetBtn.classList.remove("d-none");

    // Handle file preview
    if (type === "avatar") {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        const ext = file.name.split(".").pop().toLowerCase();

        if (["jpg", "jpeg", "png", "svg"].includes(ext)) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newImg = document.createElement("img");
                newImg.id = previewId;
                newImg.src = e.target.result;
                newImg.alt = type;
                newImg.className = "d-block w-px-100 h-px-100 rounded";
                newImg.style.objectFit = "cover";

                previewElement.parentNode.replaceChild(newImg, previewElement);
            };
            reader.readAsDataURL(file);
        } else if (ext === "pdf") {
            const newDiv = document.createElement("div");
            newDiv.id = previewId;
            newDiv.className =
                "d-flex align-items-center justify-content-center w-px-100 h-px-100 rounded border bg-light";
            newDiv.innerHTML = `
                    <div class="text-center">
                        <i class="fas fa-file-pdf fa-2x text-danger d-block mb-1"></i>
                        <small class="text-success">New PDF</small>
                    </div>
                `;
            previewElement.parentNode.replaceChild(newDiv, previewElement);
        }
    }
}

// Store original content when page loads
let originalContent = {};

document.addEventListener("DOMContentLoaded", function () {
    // Store original profile images
    document.querySelectorAll('[id^="profilePreview"]').forEach(function (img) {
        const enrollmentId = img.id.replace("profilePreview", "");
        originalContent[`profile_${enrollmentId}`] = img.src;
    });

    // Store original PSA previews
    document
        .querySelectorAll('[id^="psaPreview"]')
        .forEach(function (container) {
            const enrollmentId = container.id.replace("psaPreview", "");
            originalContent[`psa_${enrollmentId}`] = container.outerHTML;
        });

    // Store original Good Moral previews
    document
        .querySelectorAll('[id^="goodMoralPreview"]')
        .forEach(function (container) {
            const enrollmentId = container.id.replace("goodMoralPreview", "");
            originalContent[`goodMoral_${enrollmentId}`] = container.outerHTML;
        });
});

function resetFilePreview(fileType, enrollmentId) {
    let inputId;
    if (fileType === "profile") {
        inputId = `uploadAvatar${enrollmentId}`;
    } else if (fileType === "psa") {
        inputId = `psaUpload${enrollmentId}`;
    } else if (fileType === "goodMoral") {
        inputId = `goodMoralUpload${enrollmentId}`;
    }

    const input = document.getElementById(inputId);
    if (input) input.value = "";

    // Define element IDs
    let previewId, indicatorId, resetBtnId;
    if (fileType === "profile") {
        previewId = `profilePreview${enrollmentId}`;
        indicatorId = `profileChangedIndicator${enrollmentId}`;
        resetBtnId = `resetProfile${enrollmentId}`;
    } else if (fileType === "psa") {
        previewId = `psaPreview${enrollmentId}`;
        indicatorId = `psaChangedIndicator${enrollmentId}`;
        resetBtnId = `resetPsa${enrollmentId}`;
    } else if (fileType === "goodMoral") {
        previewId = `goodMoralPreview${enrollmentId}`;
        indicatorId = `goodMoralChangedIndicator${enrollmentId}`;
        resetBtnId = `resetGoodMoral${enrollmentId}`;
    }

    const previewElement = document.getElementById(previewId);
    const indicator = document.getElementById(indicatorId);
    const resetBtn = document.getElementById(resetBtnId);

    if (indicator) indicator.classList.add("d-none");
    if (resetBtn) resetBtn.classList.add("d-none");

    // Restore original content
    const originalKey = `${fileType}_${enrollmentId}`;
    const originalData = originalContent[originalKey];

    if (previewElement && originalData) {
        if (fileType === "profile") {
            previewElement.src = originalData;
        } else {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = originalData;
            const newElement = tempDiv.firstChild;

            previewElement.parentNode.replaceChild(newElement, previewElement);
        }
    }
}

// Add some CSS to ensure elements are visible
document.addEventListener("DOMContentLoaded", function () {
    const style = document.createElement("style");
    style.textContent = `
            .w-px-100 { width: 100px !important; }
            .h-px-100 { height: 100px !important; }
        `;
    document.head.appendChild(style);
});

function setupFilePreview(
    inputId,
    imgPreviewId,
    pdfPreviewId,
    pdfFileNameId,
    existingPreviewId
) {
    const input = document.getElementById(inputId);
    const imgPreview = document.getElementById(imgPreviewId);
    const pdfPreview = document.getElementById(pdfPreviewId);
    const pdfFileName = document.getElementById(pdfFileNameId);
    const existingPreview = document.getElementById(existingPreviewId);

    input.addEventListener("change", function (event) {
        const file = event.target.files[0];

        // Reset previews
        imgPreview.style.display = "none";
        pdfPreview.style.display = "none";
        if (existingPreview) existingPreview.style.display = "none";

        if (!file) {
            if (existingPreview) existingPreview.style.display = "block";
            return;
        }

        const fileType = file.type;

        if (fileType.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imgPreview.src = e.target.result;
                imgPreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else if (fileType === "application/pdf") {
            pdfFileName.textContent = file.name;
            pdfPreview.style.display = "block";
        } else {
            if (existingPreview) existingPreview.style.display = "block";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    setupFilePreview(
        "psaUpload",
        "psaPreview",
        "psaPdfPreview",
        "psaPdfFileName",
        "existingPsaPreview"
    );
    setupFilePreview(
        "goodMoralUpload",
        "goodMoralPreview",
        "goodMoralPdfPreview",
        "goodMoralPdfFileName",
        "existingGoodMoralPreview"
    );
});

document.addEventListener("DOMContentLoaded", function () {
    const extraUpload = document.getElementById("extraUpload");
    const imagePreview = document.getElementById("extraFileImagePreview");
    const pdfPreview = document.getElementById("extraFilePdfPreview");
    const pdfFileName = document.getElementById("extraFilePdfFileName");
    const existingPreview = document.getElementById("existingExtraFilePreview");

    if (extraUpload) {
        extraUpload.addEventListener("change", function (e) {
            const file = e.target.files[0];

            if (!file) return;

            // Validate file size (2MB = 2 * 1024 * 1024 bytes)
            if (file.size > 2 * 1024 * 1024) {
                alert("File size must be less than 2MB");
                this.value = "";
                return;
            }

            // Hide existing file preview
            if (existingPreview) {
                existingPreview.style.display = "none";
            }

            const fileType = file.type;
            const fileName = file.name;

            // Check if it's an image
            if (fileType.startsWith("image/")) {
                const reader = new FileReader();

                reader.onload = function (event) {
                    imagePreview.src = event.target.result;
                    imagePreview.style.display = "block";
                    pdfPreview.style.display = "none";
                };

                reader.readAsDataURL(file);
            }
            // Check if it's a PDF
            else if (fileType === "application/pdf") {
                pdfFileName.textContent = fileName;
                pdfPreview.style.display = "block";
                imagePreview.style.display = "none";
            }
            // Invalid file type
            else {
                alert("Please upload a valid file (PDF, JPG, or PNG)");
                this.value = "";
                imagePreview.style.display = "none";
                pdfPreview.style.display = "none";
                if (existingPreview) {
                    existingPreview.style.display = "block";
                }
            }
        });
    }

    // Reset preview when modal is closed
    const modal = document.getElementById("uploadExtraRequirements");
    if (modal) {
        modal.addEventListener("hidden.bs.modal", function () {
            if (extraUpload) extraUpload.value = "";
            if (imagePreview) imagePreview.style.display = "none";
            if (pdfPreview) pdfPreview.style.display = "none";
            if (existingPreview) existingPreview.style.display = "block";
        });
    }
});
