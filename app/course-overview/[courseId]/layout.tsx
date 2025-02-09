import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
    description: course.course.description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <ToastContainer />
        {children}
      </div>
    </>
  );
}
