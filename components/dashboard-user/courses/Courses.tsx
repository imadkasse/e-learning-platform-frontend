import React from "react";
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

  const fetchCourses = async () => {
    try {
      if (filter) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/searchCourses?query=${filter}`
        );
        const data = await res.json();
        return data.courses;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses`// please add page and limit 
      );
      const data = await res.json();

      return data.courses;
    } catch (error) {
      console.log(error);
    }
  };
  const courses: Course[] = await fetchCourses();
  
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
            <>
              {courses?.length > 0 ? (
                courses.map((course) => {
                  const videoNumber = course.sections.reduce((acc, section) => {
                    return acc + (section.videos?.length || 0);
                  }, 0);

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
                        numberOfVideo={videoNumber} // edit to all videos
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
