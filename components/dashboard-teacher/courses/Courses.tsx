import React from "react";
import CourseCard from "./CourseCard";

import Link from "next/link";
import SearchCourseTeacher from "./SearchCourseTeacher";

import { Course } from "@/types/course";
import { cookies } from "next/headers";
interface CoursesProps {
  searchParams: {
    filter?: string;
  };
}
const Courses = async ({ searchParams }: CoursesProps) => {
  const { filter } = searchParams;
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  const getMyCourses = async () => {
    try {
      if (filter) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/searchCoursesByTeacher?query=${filter}`,
          {
            credentials: "include",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            cache: "no-store",
          }
        );
        const data = await res.json();
        return data.courses;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,

        {
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          cache: "no-store",
        }
      );
      const data = await res.json();

      return data.user.publishedCourses;
    } catch (error) {
      console.log(error);
    }
  };

  const courses: Course[] = await getMyCourses();

  return (
    <div className=" lg:custom-width rounded-xl px-4 py-5  overflow-y-scroll relative h-[93vh]">
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
      <div className="container mx-auto px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
          <>
            {courses?.length > 0 ? (
              courses.map((course) => {
                const videoNumber = course.sections.reduce((acc, section) => {
                  return acc + (section.videos?.length || 0);
                }, 0);

                return (
                  <div key={course._id} className=" max-w-[272px]">
                    <CourseCard
                      courseId={course._id}
                      courseDescription={course.description}
                      courseImg={course.imageCover}
                      courseName={course.title}
                      coursePrice={course.price}
                      courseRating={course.avgRatings}
                      students={course.studentsCount}
                      numberOfVideo={videoNumber}
                    />
                  </div>
                );
              })
            ) : (
              // ✅ **إظهار رسالة عند عدم وجود دورات**
              <h1 className="apply-fonts-normal sm:text-3xl mt-5 w-full col-span-3 text-center text-mainColor h-[100vh]">
                لا توجد دورات
              </h1>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Courses;
