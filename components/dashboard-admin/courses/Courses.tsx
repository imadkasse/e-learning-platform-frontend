"use client";
import React, { useEffect } from "react";
import CourseCard from "./CourseCard";
import SearchCourse from "./SearchCourse";
import Spinner from "@/components/spinner/Spinner";
import { useSearchCourse } from "@/store/searchCourse";

const Courses = () => {
  const { courses, setCourses, loading, setLoading } = useSearchCourse();

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

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl h-[100vh] overflow-y-scroll px-4 py-5 ">
      <div className="mb-5 flex items-center gap-6">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الدورات</h1>
        <SearchCourse />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
        {loading ? (
          <div className="col-span-3">
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
