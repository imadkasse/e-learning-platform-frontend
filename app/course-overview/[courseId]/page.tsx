import { CoursePage } from "@/components/course-overview/CoursePage";
import NavBarCourse from "@/components/course-overview/NavBarCourse";
import { Course } from "@/types/course";
import React from "react";
interface Props {
  params: Promise<{ courseId: string }>;
}
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/courses`, {
    cache: "no-store",
  });
  const data = await res.json();
  // لنفترض أن data.courses هي مصفوفة من الدورات وكل دورة تحتوي على _id
  return data.courses.map((course: { _id: string }) => ({
    courseId: course._id,
  }));
}


const page = async ({ params }: Props) => {
  const courseId = (await params).courseId;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const course: Course = data.course;

  return (
    <div className="py-3 container mx-auto ">
      <NavBarCourse />
      <CoursePage course={course} />
    </div>
  );
};

export default page;
