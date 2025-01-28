import React from "react";

interface Props {
  params: Promise<{ courseId: string }>;
}
export async function generateMetadata({ params }: Props) {
  const courseData = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${(await params).courseId}`
  );
  const course = await courseData.json();
  console.log(course.course.title)
  return {
    title: course.course.title,
  };
}

export default function EditCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
