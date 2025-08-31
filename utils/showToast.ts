import { toast } from "react-toastify";

export default function showToast(
  type: "success" | "error" | "info",
  message: string
) {
  toast[type](message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "bg-white text-black dark:bg-gray-800 dark:text-white",
  });
}
