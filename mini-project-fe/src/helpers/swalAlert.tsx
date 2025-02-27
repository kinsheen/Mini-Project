import Swal from "sweetalert2";

export const Loading = (title: string) => {
  Swal.fire({
    title: title,
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  Swal.showLoading();
};

export const loadingButton = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any,
  title: string,
  text: string,
  showCancel: boolean
) => {
  if (showCancel === false) {
    Swal.fire({
      icon: icon,
      width: 420,
      iconColor: "#0f4c5c",
      title: title,
      text: text,
      showConfirmButton: false,
      cancelButtonText: "Okay",
      showCancelButton: true,
      cancelButtonColor: "#0f4c5c",
    });
  } else {
    Swal.fire({
      icon: icon,
      width: 420,
      title: title,
      text: text,
      showConfirmButton: false,
      cancelButtonText: "Okay",
      showCancelButton: true,
      cancelButtonColor: "#dc2626",
    }).then(() => {
      window.location.href = "/";
    });
  }
};
