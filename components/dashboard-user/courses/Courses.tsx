import React from "react";
import CourseCard from "./CourseCard";

const Courses = () => {
  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 ">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الدورات</h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
        <CourseCard
          coursePrice={1200}
          Almada={"علوم"}
          numberOfVideo={200}
          courseImg={"course1"}
          courseName={"الوحدة الأولى : تركيب البروتين"}
          courseUrl={"/"}
        />
        <CourseCard
          coursePrice={1200}
          Almada={"علوم"}
          numberOfVideo={200}
          courseImg={"course2"}
          courseName={"الوحدة الأولى : تركيب البروتين"}
          courseUrl={"/"}
        />
        <CourseCard
          coursePrice={1000}
          Almada={"علوم"}
          numberOfVideo={200}
          courseImg={"course3"}
          courseName={"الوحدة الأولى : تركيب البروتين"}
          courseUrl={"/"}
        />
        <CourseCard
          coursePrice={1200}
          Almada={"علوم"}
          numberOfVideo={200}
          courseImg={"course1"}
          courseName={"الوحدة الأولى : تركيب البروتين"}
          courseUrl={"/"}
        />
        <CourseCard
          coursePrice={1700}
          Almada={"علوم"}
          numberOfVideo={200}
          courseImg={"course3"}
          courseName={"الوحدة الأولى : تركيب البروتين"}
          courseUrl={"/"}
        />
        <CourseCard
          coursePrice={1700}
          Almada={"علوم"}
          numberOfVideo={200}
          courseImg={"course2"}
          courseName={"الوحدة الأولى : تركيب البروتين"}
          courseUrl={"/"}
        />
      </div>
    </div>
  );
};

export default Courses;
