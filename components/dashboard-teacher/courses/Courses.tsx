"use client";
import React, { useEffect } from "react";
import CourseCard from "./CourseCard";

import Link from "next/link";
import SearchCourseTeacher from "./SearchCourseTeacher";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";
import { useCoursesStore } from "@/store/coursesStore";
import Spinner from "@/components/spinner/Spinner";
interface CoursesProps {
  searchParams: {
    filter?: string;
  };
}
const Courses = ({ searchParams }: CoursesProps) => {
  const token = Cookies.get("token");

  const { loading } = useUserStore();

  const { courses, setCourses, setLoading } = useCoursesStore();
  const loadingCourses = useCoursesStore((state) => state.loading);

  useEffect(() => {
    const getMyCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setCourses(data.user.publishedCourses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMyCourses();
  }, [setCourses, token, setLoading]);

  if (loading) {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
        <Spinner />
      </div>
    );
  }

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
          {loadingCourses ? (
            <div className="lg:col-span-3 md:col-span-2">
              <Spinner />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
