import CoursePage from "@/components/coursePage/CoursePage";
import NavBarCourse from "@/components/coursePage/NavBarCourse";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  return (
    <div className="py-3 container mx-auto ">
      <NavBarCourse />
      <ToastContainer />
      <CoursePage courseId={params.courseId} />
    </div>
  );
};

export default page;
