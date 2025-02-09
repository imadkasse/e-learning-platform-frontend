import "@/app/globals.css";
import { fetchUserServer } from "@/lib/fetchUserServer";
import UserProvider from "@/providers/UserProvider";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserServer();
  return (
    <>
      <div>
        <UserProvider user={user}>{children}</UserProvider>
      </div>
    </>
  );
}
