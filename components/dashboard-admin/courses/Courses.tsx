"use client";
import React, { useEffect } from "react";
import CourseCard from "./CourseCard";
import SearchCourse from "./SearchCourse";
import Spinner from "@/components/spinner/Spinner";

import { useCoursesStore } from "@/store/coursesStore";

const Courses = () => {
  const { courses, setCourses, loading, setLoading } = useCoursesStore();

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

  return (
    <div className=" lg:custom-width rounded-xl h-[94vh] overflow-y-scroll px-4 py-5 relative ">
      <div className="mb-5 flex items-center gap-6">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الدورات</h1>
        <SearchCourse />
      </div>
      <div className="container mx-auto px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
          {loading ? (
            <div className="lg:col-span-3 md:col-span-2">
              <Spinner />
            </div>
          ) : courses?.length > 0 ? (
            courses.map((c) => {
              return (
                <div key={c._id} className="max-w[272px]">
                  <CourseCard
                    courseId={c._id}
                    courseImg={c.imageCover}
                    students={c.studentsCount}
                    numberOfVideo={c.videos.length}
                    coursePrice={c.price}
                    courseName={c.title}
                  />
                </div>
              );
            })
          ) : (
            <h1 className="text-center col-span-3">course Not Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
