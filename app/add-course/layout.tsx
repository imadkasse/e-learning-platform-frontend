import NavBarAddCourse from "@/components/dashboard-teacher/add-course/navBar/NavBarAddCourse";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function AddCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <NavBarAddCourse />
      <ToastContainer />
      <div>{children}</div>
    </div>
  );
}
