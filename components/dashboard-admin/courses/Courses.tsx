"use client";
import React, { useEffect } from "react";
import CourseCard from "./CourseCard";
import SearchCourse from "./SearchCourse";
import Spinner from "@/components/spinner/Spinner";
import Link from "next/link";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";
import { useCoursesStore } from "@/store/coursesStore";

const Courses = () => {
  const { courses, setCourses, loading, setLoading } = useCoursesStore();
  const token = Cookies.get("token");
  const { user } = useUserStore();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses`
        );
        const data = await res.json();

        setCourses(data.courses);
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
  if (!token || user?.role !== "admin") {
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
    <div className="bg-wygColor lg:custom-width rounded-xl h-[100vh] overflow-y-scroll px-4 py-5 relative ">
      <div className="mb-5 flex items-center gap-6">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الدورات</h1>
        <SearchCourse />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
        {loading ? (
          <div className="lg:col-span-3 md:col-span-2">
            <Spinner />
          </div>
        ) : courses?.length > 0 ? (
          courses.map((c) => {
            return (
              <CourseCard
                key={c._id}
                courseId={c._id}
                courseImg={c.imageCover}
                students={c.studentsCount}
                numberOfVideo={c.videos.length}
                coursePrice={c.price}
                courseName={c.title}
              />
            );
          })
        ) : (
          <h1 className="text-center col-span-3">course Not Found</h1>
        )}
      </div>
    </div>
  );
};

export default Courses;
