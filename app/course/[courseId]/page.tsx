import CoursePage from "@/components/coursePage/CoursePage";
import NavBarCourse from "@/components/coursePage/NavBarCourse";
import React from "react";
import { ToastContainer } from "react-toastify";

type PageProps = { params: Promise<{ courseId: string }> };
const page = async ({ params }: PageProps) => {
  const courseId = (await params).courseId;
  return (
    <div className="py-3 container mx-auto relative">
      <NavBarCourse />
      <ToastContainer />
      <CoursePage courseId={courseId} />
    </div>
  );
};

export default page;
