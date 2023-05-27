
import Swal from "sweetalert2";

export const showAlertError = (msg = "Ocurrio un error") => {
  return Swal.fire({
    title: msg,
    icon: 'error',
    timer: 5000,
    confirmButtonColor: "#ff5d73",
    iconColor: "#dc2626"
  });
}

export const showAlertSuccess = (msg = "Accion Realizada correctamente") => {
  return Swal.fire({
    title: msg,
    icon: 'success',
    timer: 5000,
    confirmButtonColor: "#0B4A75",
    iconColor: "#c3d730"
  });
}


export const showAlertSuccessToast = (msg = "Accion Realizada correctamente") => {
  return Swal.fire({
    title: msg,
    icon: 'success',
    timer: 5000,
    toast: true,
    position: 'bottom-right',
    showConfirmButton: false,
    iconColor: "#c3d730"
  });
}