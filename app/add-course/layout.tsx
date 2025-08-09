import NavBarAddCourse from "@/components/dashboard-teacher/add-course/navBar/NavBarAddCourse";
import { fetchUserServer } from "@/lib/fetchUserServer";
import UserProvider from "@/providers/UserProvider";
import { redirect } from "next/navigation";
import React from "react";
import { ToastContainer } from "react-toastify";

export default async function AddCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchUserServer();
  if (!user) {
    redirect("/login");
  }

  if (user.role !== "teacher") {
    redirect(`/dashboard-${user.role === "student" ? "user" : user.role}`);
  }
  return (
    <div className="p-4 flex flex-col gap-4">
      <ToastContainer />
      <NavBarAddCourse />
      <div>
        <UserProvider user={user}>{children}</UserProvider>
      </div>
    </div>
  );
}
