import "@/app/globals.css";
import { fetchUserServer } from "@/lib/fetchUserServer";
import UserProvider from "@/providers/UserProvider";
import { ToastContainer } from "react-toastify";

interface Props {
  params: Promise<{ courseId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const courseData = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${
      (
        await params
      ).courseId
    }`,
    {
      cache: "no-store",
    }
  );
  const data = await courseData.json();
  return {
    title: data.course ? data.course.title : "Error",
    description: data.course ? data.course.description : "Error",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserServer();

  return (
    <>
      <div>
        <ToastContainer />
        <UserProvider user={user}>{children}</UserProvider>
      </div>
    </>
  );
}
