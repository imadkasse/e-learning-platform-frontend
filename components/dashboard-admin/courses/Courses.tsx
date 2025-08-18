import React, { useEffect } from "react";
import CourseCard from "./CourseCard";
import SearchCourse from "./SearchCourse";

import { Course } from "@/types/course";
interface CoursesProps {
  searchParams: {
    filter?: string;
  };
}
const Courses = async ({ searchParams }: CoursesProps) => {
  const { filter } = searchParams;

  const fetchCourse = async () => {
    try {
      if (filter) {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/searchCourses?query=${filter}`
        );
        const res = await data.json();
        return res.courses;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses`
      );
      const data = await res.json();
      return data.courses;
    } catch (error) {
      console.log(error);
    }
  };
  const courses: Course[] = await fetchCourse();
  return (
    <div className=" lg:custom-width rounded-xl h-[94vh] overflow-y-scroll px-4 py-5 relative ">
      <div className="mb-5 flex items-center gap-6">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الدورات</h1>
        <SearchCourse />
      </div>
      <div className="container mx-auto px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
          {courses?.length > 0 ? (
            courses.map((c) => {
              const videoNumber = c.sections.reduce((acc, section) => {
                return acc + (section.videos?.length || 0);
              }, 0);
              return (
                <div key={c._id} className="max-w[272px]">
                  <CourseCard
                    courseId={c._id}
                    courseImg={c.imageCover}
                    students={c.studentsCount}
                    numberOfVideo={videoNumber}
                    coursePrice={c.price}
                    courseName={c.title}
                  />
                </div>
              );
            })
          ) : (
            <h1 className="text-center col-span-3">لا توجد أي كورسات</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
