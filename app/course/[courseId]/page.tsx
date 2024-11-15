import { CoursePage } from "@/components/coursePage/CoursePage";
import NavBarCourse from "@/components/coursePage/NavBarCourse";
import React from "react";

const page = ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  return (
    <div className="py-3 container mx-auto ">
      <NavBarCourse />
      <CoursePage />
    </div>
  );
};

export default page;
