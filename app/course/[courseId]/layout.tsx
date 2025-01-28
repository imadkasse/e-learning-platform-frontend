import "@/app/globals.css";

interface Props {
  params: Promise<{ courseId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const courseData = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${(await params).courseId}`
  );
  const course = await courseData.json();
  return {
    title: course.course.title,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}
