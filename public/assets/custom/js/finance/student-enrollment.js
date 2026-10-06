(() => {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.approve-partial-payment-btn').forEach(btn => {
            btn.onclick = () => {
                const enrollmentId = btn.dataset.enrollmentId;
                const studentName = btn.dataset.studentName;

                Swal.fire({
                    title: 'Approve Student?',
                    html: `You are about to approve ${studentName}.`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Approve',
                    cancelButtonText: 'Cancel',
                    customClass: {
                        popup: 'swal2-modal-above-modal'
                    },
                    didOpen: () => {
                        $('.swal2-container').css('z-index', 200000);
                        $('.swal2-popup').css('z-index', 200001);
                    }
                }).then((result) => {
                    if (!result.isConfirmed) return;

                    $.ajax({
                        url: `/finance/financial-clearance/allow-no-dp/${enrollmentId}`,
                        method: "PATCH",
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
                                .getAttribute('content'),
                            'Content-Type': 'application/json',
                        },
                        data: {
                        },
                        success: function(response) {
                            if (!response.success) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Failed',
                                    text: response.message,
                                    didOpen: () => {
                                        $('.swal2-container').css('z-index',
                                            200000);
                                        $('.swal2-popup').css('z-index',
                                            200001);
                                    }
                                });
                                return;
                            }
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfully Approved',
                                text: response.message,
                                showConfirmButton: false,
                                showCancelButton: false,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                didOpen: () => {
                                    $('.swal2-container').css('z-index',
                                        200000);
                                    $('.swal2-popup').css('z-index',
                                        200001);
                                }
                            })

                            window.location.reload();
                        },
                        error: function(xhr) {
                            let errorMessage = "An unexpected error occurred.";

                            if (xhr.responseJSON && xhr.responseJSON.message) {
                                errorMessage = xhr.responseJSON.message;
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: errorMessage,
                                customClass: {
                                    popup: 'swal2-modal-above-modal'
                                },
                                didOpen: () => {
                                    $('.swal2-container').css('z-index',
                                        200000);
                                    $('.swal2-popup').css('z-index',
                                        200001);
                                }
                            });
                        }
                    });
                })
            }
        })

        document.querySelectorAll('.allow-nodp-btn').forEach(btn => {
            btn.onclick = () => {
                const enrollmentId = btn.dataset.enrollmentId;
                const studentName = btn.dataset.studentName;

                Swal.fire({
                    title: 'Allow Student?',
                    html: `You are about to allow no Down Payment for ${studentName}.`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Allow',
                    cancelButtonText: 'Cancel',
                    customClass: {
                        popup: 'swal2-modal-above-modal'
                    },
                    didOpen: () => {
                        $('.swal2-container').css('z-index', 200000);
                        $('.swal2-popup').css('z-index', 200001);
                    }
                }).then((result) => {
                    if (!result.isConfirmed) return;

                    $.ajax({
                        url: `/finance/financial-clearance/allow-no-dp/${enrollmentId}`,
                        method: "PATCH",
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
                                .getAttribute('content'),
                            'Content-Type': 'application/json',
                        },
                        data: {
                        },
                        success: function(response) {
                            if (!response.success) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Failed',
                                    text: response.message,
                                    didOpen: () => {
                                        $('.swal2-container').css('z-index',
                                            200000);
                                        $('.swal2-popup').css('z-index',
                                            200001);
                                    }
                                });
                                return;
                            }
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfully Allowed',
                                text: response.message,
                                showConfirmButton: false,
                                showCancelButton: false,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                didOpen: () => {
                                    $('.swal2-container').css('z-index',
                                        200000);
                                    $('.swal2-popup').css('z-index',
                                        200001);
                                }
                            })

                            window.location.reload();
                        },
                        error: function(xhr) {
                            let errorMessage = "An unexpected error occurred.";

                            if (xhr.responseJSON && xhr.responseJSON.message) {
                                errorMessage = xhr.responseJSON.message;
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: errorMessage,
                                customClass: {
                                    popup: 'swal2-modal-above-modal'
                                },
                                didOpen: () => {
                                    $('.swal2-container').css('z-index',
                                        200000);
                                    $('.swal2-popup').css('z-index',
                                        200001);
                                }
                            });
                        }
                    });
                })
            }
        })

        document.querySelectorAll('.cancel-allow-nodp-btn').forEach(btn => {
            btn.onclick = () => {
                const enrollmentId = btn.dataset.enrollmentId;
                const studentName = btn.dataset.studentName;

                Swal.fire({
                    title: 'Are you sure?',
                    html: `You are about to cancel allow no Down payment for ${studentName}.`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Cancel Allow no DP',
                    cancelButtonText: 'Close',
                    customClass: {
                        popup: 'swal2-modal-above-modal'
                    },
                    didOpen: () => {
                        $('.swal2-container').css('z-index', 200000);
                        $('.swal2-popup').css('z-index', 200001);
                    }
                }).then((result) => {
                    if (!result.isConfirmed) return;

                    $.ajax({
                        url: `/finance/financial-clearance/cancel-allow-no-dp/${enrollmentId}`,
                        method: "PATCH",
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
                                .getAttribute('content'),
                            'Content-Type': 'application/json',
                        },
                        data: {
                        },
                        success: function(response) {
                            if (!response.success) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Failed',
                                    text: response.message,
                                    didOpen: () => {
                                        $('.swal2-container').css('z-index',
                                            200000);
                                        $('.swal2-popup').css('z-index',
                                            200001);
                                    }
                                });
                                return;
                            }
                            Swal.fire({
                                icon: 'success',
                                title: 'Cancelled Successfully',
                                text: response.message,
                                showConfirmButton: false,
                                showCancelButton: false,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                didOpen: () => {
                                    $('.swal2-container').css('z-index',
                                        200000);
                                    $('.swal2-popup').css('z-index',
                                        200001);
                                }
                            })

                            window.location.reload();
                        },
                        error: function(xhr) {
                            let errorMessage = "An unexpected error occurred.";

                            if (xhr.responseJSON && xhr.responseJSON.message) {
                                errorMessage = xhr.responseJSON.message;
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: errorMessage,
                                customClass: {
                                    popup: 'swal2-modal-above-modal'
                                },
                                didOpen: () => {
                                    $('.swal2-container').css('z-index',
                                        200000);
                                    $('.swal2-popup').css('z-index',
                                        200001);
                                }
                            });
                        }
                    });
                })
            }
        })
    });
})()