import React from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { cookies } from "next/headers";
import { Course } from "@/types/course";
import { User } from "@/types/user";
import Link from "next/link";
import SearchCourseTeacher from "./SearchCourseTeacher";

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
      //@ts-expect-error:fix agin
      console.log(err.response.data.message);
    }
  };

  await fetchUser();

  //@ts-expect-error:fix in After time
  if (!token || user?.role !== "teacher") {
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

  const myCourses: Course[] = user.publishedCourses;

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] overflow-y-scroll relative">
      <div className="mb-5 flex items-center gap-6 ">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الدورات</h1>
        <section className="flex items-center flex-grow ">
          <div className="flex-grow ">
            <SearchCourseTeacher />
          </div>
          <Link
            href={"/add-course"}
            className="apply-fonts-normal  py-2.5 mx-3 rounded-lg text-white px-4 bg-mainColor hover:bg-mainColorHoverLight hoverEle"
          >
            إضافة
          </Link>
        </section>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
        {myCourses.length ? (
          myCourses.map((course) => {
            console.log(course.videos);
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
