"use client";
import React, { useEffect } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import SearchCourse from "./SearchCourse";

import { useUserStore } from "@/store/userStore";
import { useCoursesStore } from "@/store/coursesStore";
import Spinner from "@/components/spinner/Spinner";

const Courses = () => {
  const { loading } = useUserStore();

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

  return (
    <>
      <div className="  lg:custom-width rounded-xl px-4 py-5  overflow-y-scroll relative h-[93vh]">
        <div className="mb-5 flex items-center gap-6">
          <h1 className="apply-fonts-normal text-2xl font-semibold ">
            الدورات
          </h1>
          <SearchCourse />
        </div>
        <div className="container mx-auto px-8 py-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
            {loadingCourses ? (
              // Spinner أثناء التحميل
              <div className="">
                <Spinner />
              </div>
            ) : (
              <>
                {courses?.length > 0 ? (
                  courses.map((course) => {
                    return (
                      <div key={course._id} className=" max-w-[272px] ">
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
      </div>
    </>
  );
};

export default Courses;
