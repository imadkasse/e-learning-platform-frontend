import NavBarAddCourse from "@/components/dashboard-teacher/edit-course/navBar/NavBarAddCourse";
import { fetchUserServer } from "@/lib/fetchUserServer";
import UserProvider from "@/providers/UserProvider";
import React from "react";
import { ToastContainer } from "react-toastify";
export const dynamic = "force-dynamic";
export default async function EditCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchUserServer();

  return (
    <div className="p-4 flex flex-col gap-4">
      <NavBarAddCourse />
      <ToastContainer />
      <div>
        <UserProvider user={user}>{children}</UserProvider>
      </div>
    </div>
  );
}
