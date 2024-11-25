import NavBarAddCourse from "@/components/dashboard-teacher/edit-course/navBar/NavBarAddCourse";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function EditCourseLayout({
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
