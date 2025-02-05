"use client";
import React, { useEffect } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import SearchCourse from "./SearchCourse";
import Link from "next/link";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";
import { useCoursesStore } from "@/store/coursesStore";
import Spinner from "@/components/spinner/Spinner";

const Courses = () => {
  const token = Cookies.get("token");
  const { user, loading } = useUserStore();

  const { courses, setCourses, setLoading } = useCoursesStore();
  const loadingCourses = useCoursesStore((state) => state.loading);
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const data = axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses`
        );
        setCourses((await data).data.courses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [setCourses, setLoading]);

  if (loading) {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
        <Spinner />
      </div>
    );
  }
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

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] overflow-y-scroll relative">
      <div className="mb-5 flex items-center gap-6">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الدورات</h1>
        <SearchCourse />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
        {loadingCourses ? (
          // Spinner أثناء التحميل
          <div className="lg:col-span-3 md:col-span-2">
            <Spinner />
          </div>
        ) : (
          <>
            {courses?.length > 0 ? (
              courses.map((course) => {
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
              // رسالة عند عدم وجود دورات
              <h1 className="apply-fonts-normal sm:text-3xl mt-5 w-full col-span-3 text-center text-mainColor h-[100vh]">
                لا توجد دورات
              </h1>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
