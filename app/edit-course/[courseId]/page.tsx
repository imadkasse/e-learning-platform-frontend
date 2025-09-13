import EditCourse from "@/components/dashboard-teacher/edit-course/EditCourse";
import React from "react";

const fetchCourse = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data.course;
};
type PageProps = { params: Promise<{ courseId: string }> };
const page = async ({ params }: PageProps) => {
  const courseId = (await params).courseId;
  const course = await fetchCourse(courseId);
  return (
    <div>
      <EditCourse courseFetcher={course} />
    </div>
  );
};

export default page;
