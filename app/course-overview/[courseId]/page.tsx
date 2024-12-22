import { CoursePage } from "@/components/course-overview/CoursePage";
import NavBarCourse from "@/components/course-overview/NavBarCourse";
import React from "react";

type PageProps = { params: Promise<{ courseId: string }> };
const page = async ({ params }: PageProps) => {
  const courseId = (await params).courseId;

  return (
    <div className="py-3 container mx-auto ">
      <NavBarCourse />
      <CoursePage id={courseId} />
    </div>
  );
};

export default page;
