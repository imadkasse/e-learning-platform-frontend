import React from "react";
import CardCourse from "./CardCourse";
import Image from "next/image";
import { Person, PlayLesson } from "@mui/icons-material";
import Link from "next/link";
import { cookies } from "next/headers";
import { User } from "@/types/user";

const HomePage = async () => {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token")?.value;

  let user: User;

  const fetchUser = async () => {
    try {
      const res = await fetch(`${process.env.BACK_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // console.log(res.data.user);
      user = data.user;
    } catch (err) {
      console.log(err);
    }
  };

  await fetchUser();

  //@ts-expect-error:fix
  if (!token || user.role !== "student") {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
        <h1 className="apply-fonts-normal sm:text-3xl mt-5 w-full col-span-3 text-center text-mainColor ">
          أنت غير مسجل أو لا تملك الصلاحية للوصول الى هذه الصفحة
        </h1>
        <div className="mt-5 flex justify-center ">
          <Link
            href={"/login"}
            className="apply-fonts-normal py-2 px-4  bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white rounded-lg"
          >
            سجل الدخول من هنا
          </Link>
        </div>
      </div>
    );
  }
  //@ts-expect-error:fix agin
  const courses = user.enrolledCourses;

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] overflow-y-scroll ">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold "> دوراتك</h1>
      </div>
      {/* My Courses */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
        {courses.length > 0 ? (
          courses.map((course) => {
            return (
              <CardCourse
                key={course._id}
                progresBar={
                  user.progress.find((p) => p.course === course._id)
                    ?.percentage || 0
                }
                studentsNumber={course.enrolledStudents.length}
                numberOfVideo={course.videos.length}
                courseImg={course.imageCover}
                courseUrl={`/course/${course._id}`}
                courseName={course.title}
              />
            );
          })
        ) : (
          <h1>لاتوجد أي كورسات</h1>
        )}
      </div>
      {/* Other Courses */}
      <div className="my-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">
          دورات أخرى
        </h1>
      </div>
      <div className="flex flex-col gap-5">
        <div className="w-full bg-wygColor shadow-md shadow-mainColor/60 rounded-md flex md:flex-row xs:flex-col xs:gap-3 items-center justify-between p-3  ">
          <div className="flex  md:flex-row xs:flex-col items-center gap-3">
            <div className="md:w-28 md:h-20 flex ">
              <Image
                src={`/imgs/course1.png`}
                alt="course1"
                width={300}
                height={200}
                className="rounded-lg w-full h-full"
              />
            </div>

            <div className="flex flex-col justify-between">
              <h1 className="apply-fonts-normal text-md">
                الوحدة الثالثة : دور البروتينات في التحفيز الإنزيمي
              </h1>
              <div className="flex items-center gap-5 my-3 ">
                <div className="flex gap-1 items-center">
                  <div className="text-mainColor">
                    <PlayLesson fontSize="small" />
                  </div>
                  <div className="flex items-center">
                    <span className="apply-fonts-normal">دروس</span>
                    <p>:12</p>
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="text-mainColor">
                    <Person fontSize="small" />
                  </div>
                  <div className="flex items-center">
                    <span className="apply-fonts-normal">تلاميذ</span>
                    <p>:1200</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row-reverse -space-x-4 rtl:space-x">
            <Image
              width={150}
              height={150}
              className="w-10 h-10 border-2 rounded-full border-white"
              src="/imgs/personImg.png"
              alt="personImg"
            />
            <Image
              width={150}
              height={150}
              className="w-10 h-10 border-2 rounded-full border-white"
              src="/imgs/personImg.png"
              alt="personImg"
            />
            <Image
              width={150}
              height={150}
              className="w-10 h-10 border-2 rounded-full border-white"
              src="/imgs/personImg.png"
              alt="personImg"
            />
            <Link
              className="flex items-center justify-center w-10 h-10 z-50 text-xs font-medium text-white bg-mainColor border-2  rounded-full hoverEle hover:bg-mainColor/95 "
              href="/"
            >
              99+
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
