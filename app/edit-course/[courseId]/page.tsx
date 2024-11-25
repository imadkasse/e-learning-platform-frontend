import EditCourse from "@/components/dashboard-teacher/edit-course/EditCourse";
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
    <div>
      <EditCourse id={courseId} />
    </div>
  );
};

export default page;
