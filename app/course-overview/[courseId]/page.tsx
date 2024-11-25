import { CoursePage } from "@/components/course-overview/CoursePage";
import NavBarCourse from "@/components/course-overview/NavBarCourse";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const { courseId } = await params;
  return (
    <div className="py-3 container mx-auto ">
      <NavBarCourse />
      <CoursePage id={courseId} />
    </div>
  );
};

export default page;
