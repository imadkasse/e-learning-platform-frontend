import React from "react";
import CardCourse from "./CardCourse";
import Image from "next/image";
import { Person, PlayLesson } from "@mui/icons-material";
import Link from "next/link";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { Course } from "@/types/course";

const HomePage = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  let myEnrolledCourses: Course[] | null = [];
  let user: User | null = null;

  const fetchMyEnrolledCourses = async () => {
    try {
      const res = await fetch(
        `${process.env.BACK_URL}/api/courses/my-courses`,
        {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const data = await res.json();

      myEnrolledCourses = data.course;
      const resUser = await fetch(`${process.env.BACK_URL}/api/users/me`, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const userData = await resUser.json();
      user = userData.user;
    } catch (err) {
      console.log("err", err);
    }
  };
  await fetchMyEnrolledCourses();
  const courses: Course[] | null = myEnrolledCourses;

  return (
    <div className=" lg:custom-width rounded-xl px-4 py-5 h-[93vh] overflow-y-scroll ">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold "> دوراتك</h1>
      </div>
      {/* My Courses */}
      <div className="container mx-auto px-8 py-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4  gap-6">
          {courses?.length > 0 ? (
            courses?.map((course: Course) => {
              const videoNumber = course.sections.reduce((acc, section) => {
                return acc + (section.videos?.length || 0);
              }, 0);

              return (
                <div
                  key={course._id}
                  className="w-full max-w-sm mx-auto h-auto min-h-[400px] flex-shrink-0"
                >
                  <CardCourse
                    key={course._id}
                    progresBar={
                      user?.progress.find((p) => p.course === course._id)
                        ?.percentage || 0
                    }
                    studentsNumber={course.enrolledStudents.length}
                    numberOfVideo={videoNumber}
                    courseImg={course.imageCover}
                    courseUrl={`/course/${course._id}`}
                    courseName={course.title}
                  />
                </div>
              );
            })
          ) : (
            <h1 className="apply-fonts-normal text-center  col-span-3">
              <p>
                <span className="text-mainColor text-xl ">
                  لاتوجد أي كورسات ،
                </span>
                <span className="mr-2 text-mainColor text-xl hover:text-mainColorHoverLight hoverEle">
                  <Link href={"/dashboard-user/courses"}>تصفح الكورسات</Link>
                </span>
              </p>
            </h1>
          )}
        </div>
      </div>

      {/* Other Courses */}
      <div className="my-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">
          دورات أخرى
        </h1>
      </div>
      <div className="container mx-auto px-8 py-4 ">
        <div className="flex  flex-col gap-5">
          <div className="w-full  drop-shadow-md border rounded-md flex md:flex-row xs:flex-col xs:gap-3 items-center justify-between p-3  ">
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

            <div className="flex flex-row-reverse  -space-x-4 rtl:space-x">
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
    </div>
  );
};

export default HomePage;
