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

export const swalWarning = async (title: string) => {
  const result = await Swal.fire({
    title: title,
    icon: "warning",
    draggable: true,
    confirmButtonColor: "#0f4c5c",
    showCancelButton: true,
  });

  if (result.isConfirmed) {
    return true;
  } else if (result.isDismissed) {
    return false;
  }
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
      cancelButtonColor: "#0f4c5c",
    }).then(() => {
      window.location.href = "/";
    });
  }
};
