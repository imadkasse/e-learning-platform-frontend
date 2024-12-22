import EditCourse from "@/components/dashboard-teacher/edit-course/EditCourse";
import React from "react";

type PageProps = { params: Promise<{ courseId: string }> };
const page = async ({ params }: PageProps) => {
  const courseId = (await params).courseId;
  return (
    <div>
      <EditCourse id={courseId} />
    </div>
  );
};

export default page;
