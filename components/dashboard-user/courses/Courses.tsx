import React from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { Course } from "@/types/course";
import SearchCourse from "./SearchCourse";
import Link from "next/link";
import { User } from "@/types/user";
import { cookies } from "next/headers";

const Courses = async () => {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token")?.value;

  let user: User;

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data.user);
      user = res.data.user;
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

  const data = await axios.get(`${process.env.BACK_URL}/api/courses`);

  const allCourses: Course[] = data.data.courses;

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 relative">
      <div className="mb-5 flex items-center gap-6">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الدورات</h1>
        <SearchCourse />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
        {allCourses.length ? (
          allCourses.map((course) => {
            return (
              <div key={course._id}>
                <CourseCard
                  courseId={course._id}
                  courseDescription={course.description}
                  courseImg={course.imageCover}
                  courseName={course.title}
                  coursePrice={course.price}
                  courseRating={course.avgRatings}
                  students={course.studentsCount}
                  numberOfVideo={course.videos.length}
                />
              </div>
            );
          })
        ) : (
          <h1 className="apply-fonts-normal sm:text-3xl mt-5 w-full col-span-3 text-center text-mainColor h-[100vh]">
            ليس لديك أي دورات يمكنك إضافة دوراتك
          </h1>
        )}
      </div>
    </div>
  );
};

export default Courses;
