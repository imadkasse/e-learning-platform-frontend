import { toast } from "react-toastify";

export default function showToast(
  type: "success" | "error" | "info",
  message: string
) {
  // تحديد الألوان والأنماط لكل نوع
  const getToastClassName = (toastType: "success" | "error" | "info") => {
    const baseClasses = "rounded-lg shadow-lg font-medium border-l-4";

    const typeClasses = {
      success:
        " bg-green-50 text-green-800 border-green-500 dark:bg-green-900 dark:text-green-100 dark:border-green-400",
      error:
        " bg-red-50 text-red-800 border-red-500 dark:bg-red-900 dark:text-red-100 dark:border-red-400",
      info: " bg-blue-50 text-blue-800 border-blue-500 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-400",
    };

    return `${baseClasses} ${typeClasses[toastType]}`;
  };

  toast[type](message, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: getToastClassName(type),
    progressClassName: "bg-current opacity-30 ",
    bodyClassName: "text-sm font-medium p-1 ",
  });
}
