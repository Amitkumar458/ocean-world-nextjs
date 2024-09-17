import SweetAlert, { SweetAlertOptions } from "sweetalert2";
import AlertWrapper from "sweetalert2-react-content";
import styles from "./alert.module.css"



const Swal = AlertWrapper(SweetAlert);

export function SuccessAlert(
  successType: "create" | "update" | "delete",
  onSuccess?: () => void
) {
  let type = "";
  if (successType === "create") type = "Created";
  if (successType === "update") type = "Updated";
  if (successType === "delete") type = "Deleted";
  return Swal.fire({
    title: "Success",
    text: `${type} Successfully`,
    showCancelButton: true,
    showConfirmButton: true,
    backdrop: true,
    allowEnterKey: true,
    // allowOutsideClick: true,
    didOpen: (popup) => {
      const confirmNode = popup.getElementsByClassName(
        "swal2-confirm"
      )[0] as HTMLButtonElement;
      confirmNode.focus();
    },
    customClass: {
      title: styles.title,
      closeButton: "",
      confirmButton: styles.SuccessConfirmButton,
      actions: styles.actionsRight,
      popup: styles.popupSuccess,
    },
  }).then(() => {
    onSuccess && onSuccess();
  });
};

export function SuccessAlertWithCustomMessage(
  text: string,
  onSuccess?: () => void
) {
  return Swal.fire({
    title: "Success",
    text: text,
    showCancelButton: true,
    showConfirmButton: true,
    backdrop: true,
    allowEnterKey: true,
    // allowOutsideClick: true,
    didOpen: (popup) => {
      const confirmNode = popup.getElementsByClassName(
        "swal2-confirm"
      )[0] as HTMLButtonElement;
      confirmNode.focus();
    },
    customClass: {
      title: styles.title,
      closeButton: "",
      confirmButton: styles.SuccessConfirmButton,
      actions: styles.actionsRight,
      popup: styles.popupSuccess,
    },
  }).then(() => {
    onSuccess && onSuccess();
  });
};






export function ErrorAlert(
  error: string,
  onConfirmed?: () => void,
  options?: SweetAlertOptions
) {
  return Swal.fire({
    title: "Error",
    text: error,
    showConfirmButton: true,
    showCloseButton: false,
    backdrop: true,
    allowEnterKey: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: (popup) => {
      const confirmNode = popup.getElementsByClassName(
        "swal2-confirm"
      )[0] as HTMLButtonElement;
      confirmNode.focus();
    },
    customClass: {
      title: styles.title,
      confirmButton: styles.ErrorConfirmButton,
      actions: styles.actionsRight,
      popup: styles.popupError,
      htmlContainer: styles.htmlContainer,
    },
    ...options,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirmed && onConfirmed();
    }
  });
}

export function WarnningAlert(
  message: string,
  onConfirmed?: () => void,
  onCancel?: () => void,
  options?: SweetAlertOptions
) {
  return Swal.fire({
    title: "Warning",
    text: message,
    showCancelButton: true,
    showConfirmButton: true,
    showCloseButton: true,
    backdrop: true,
    allowEnterKey: true,
    allowOutsideClick: true,
    didOpen: (popup) => {
      const confirmNode = popup.getElementsByClassName(
        "swal2-confirm"
      )[0] as HTMLButtonElement;
      confirmNode.focus();
    },
    customClass: {
      title: styles.title,
      confirmButton: styles.WarningConfirmButton,
      actions: styles.actionsRight,
      popup: styles.popupWarning,
      htmlContainer: styles.htmlContainer,
    },
    ...options,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirmed && onConfirmed();
    } else if (result.isDenied || result.isDismissed) {
      onCancel && onCancel();
    }
  });
}

export function InfoAlert({ ...options }: SweetAlertOptions) {
  return Swal.fire({
    showCancelButton: true,
    showConfirmButton: true,
    showCloseButton: true,
    backdrop: true,
    allowEnterKey: true,
    allowOutsideClick: true,
    didOpen: (popup) => {
      const confirmNode = popup.getElementsByClassName(
        "swal2-confirm"
      )[0] as HTMLButtonElement;
      confirmNode.focus();
    },
    ...options,
  });
}

export function InfoToast({ ...options }: SweetAlertOptions) {
  Swal.fire({
    ...options,
    toast: true,
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 3000, // Close after 3 seconds
    timerProgressBar: true,
    icon: 'info' // You can change this to 'success', 'warning', 'error', etc.
  });
}
