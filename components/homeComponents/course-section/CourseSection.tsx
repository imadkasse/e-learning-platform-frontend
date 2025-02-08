import React from "react";
import CourseCard from "./CourseCard";
import Link from "next/link";
import { Course } from "@/types/course";

const CourseSection = async () => {
  const res = await fetch(`${process.env.BACK_URL}/api/courses?page=1&limit=4`);
  const data = await res.json();
  const courses: Course[] = data.courses;

  return (
    <>
      <div
        className="w-full grid lg:grid-cols-4 md:grid-cols-3 md:gap-2   xs:grid-cols-1  "
        id="courses"
      >
        {courses.map((course) => {
          return (
            <CourseCard
              key={course._id}
              courseImg={course.imageCover}
              courseName={course.title}
              numberOfVideo={course.videos.length}
              courseUrl={course._id}
              studentsNumber={course.enrolledStudents.length}
            />
          );
        })}
      </div>

      <div className="apply-fonts-normal flex justify-center w-full mt-12">
        <Link
          href={`/courses`}
          className="bg-mainColor hoverEle hover:bg-mainColorHoverLight text-lg py-2 px-4 rounded-lg text-white"
        >
          تصفح الدورات
        </Link>
      </div>
    </>
  );
};

export default CourseSection;
