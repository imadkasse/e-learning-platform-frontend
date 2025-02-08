"use client";
import { ErrorOutline } from "@mui/icons-material";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100   ">
      <ErrorOutline className="text-red-500" sx={{ fontSize: 100 }} />
      <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
        يبدو أنك ضللت الطريق! 🚀
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 bg-mainColor hover:bg-mainColorHoverLight text-white font-semibold rounded-md shadow-md transition-all"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
}
