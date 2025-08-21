import CoursePage from "@/components/coursePage/CoursePage";
import NavBarCourse from "@/components/coursePage/NavBarCourse";
import React from "react";
import { ToastContainer } from "react-toastify";
interface Props {
  params: Promise<{ courseId: string }>;
}
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/courses`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.courses.map((course: { _id: string }) => ({
    courseId: course._id,
  }));
}

const page = async ({ params }: Props) => {
  const courseId = (await params).courseId;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  console.log(data.course)
  return (
    <div className="py-3 container mx-auto relative">
      <NavBarCourse />
      <ToastContainer />
      <CoursePage course={data.course} />
    </div>
  );
};

export default page;
