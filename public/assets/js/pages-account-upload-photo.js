document.addEventListener("DOMContentLoaded", function () {
    const uploadedAvatar = document.getElementById("uploadedAvatar");
    const fileInput = document.querySelector(".account-file-input");
    const resetButton = document.querySelector(".account-image-reset");

    if (uploadedAvatar && fileInput && resetButton) {
        const originalSrc = uploadedAvatar.src;

        // Handle image preview when new file is selected
        fileInput.addEventListener("change", function () {
            if (fileInput.files && fileInput.files[0]) {
                const file = fileInput.files[0];
                const reader = new FileReader();

                reader.onload = function (e) {
                    uploadedAvatar.src = e.target.result;
                };

                reader.readAsDataURL(file);
            }
        });

        // Handle image reset to original
        resetButton.addEventListener("click", function () {
            uploadedAvatar.src = originalSrc;
            fileInput.value = ""; // clear the file input
        });
    }
});
