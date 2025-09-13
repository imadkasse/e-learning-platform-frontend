import React from "react";

interface Props {
  params: Promise<{ courseId: string }>;
}
export async function generateMetadata({ params }: Props) {
  const courseData = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACK_URL
    }/api/courses/courseTitleAndDescription/${(await params).courseId}`
  );

  const data = await courseData.json();
  return {
    title: data.course ? data.course.title : "Error",
    description: data.course ? data.course.description : "Error",
  };
}

export default function EditCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
