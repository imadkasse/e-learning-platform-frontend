import SideBar from "@/components/dashboard-admin/sideBar/SideBar";
import { fetchUserServer } from "@/lib/fetchUserServer";
import UserProvider from "@/providers/UserProvider";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "dashboard-admin",
  description: "Generated by create next app",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserServer();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "admin") {
    redirect(`/dashboard-${user.role === "student" ? "user" : user.role}`);
  }
  return (
    <>
      <div className="flex gap-3 p-[20px] h-screen">
        <SideBar />
        <ToastContainer />
        <main className="flex-1">
          <UserProvider user={user}>{children}</UserProvider>
        </main>
      </div>
    </>
  );
}
