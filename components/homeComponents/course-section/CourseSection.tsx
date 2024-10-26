import React from "react";
import CourseCard from "./CourseCard";
import Link from "next/link";

const CourseSection = () => {
  return (
    <>
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 md:gap-2   xs:grid-cols-1  " id="courses">
        <CourseCard
          courseImg="course1"
          courseName="الوحدة الثالثة : دور البروتينات في التحفيز الإنزيمي"
          numberOfVideo={23}
          courseUrl="/"
          studentsNumber={400}
        />
        <CourseCard
          courseImg="course2"
          courseName="الوحدة الثانية : العلاقة بين بنية 
ووظيفة البروتين"
          numberOfVideo={40}
          courseUrl="/"
          studentsNumber={1100}
        />
        <CourseCard
          courseImg="course3"
          courseName="المنهجية"
          numberOfVideo={10}
          courseUrl="/"
          studentsNumber={2000}
        />
        <CourseCard
          courseImg="course4"
          courseName="الوحدة الأولى : تركيب البروتين"
          numberOfVideo={15}
          courseUrl="/"
          studentsNumber={1500}
        />
      </div>

      <div className="apply-fonts-normal flex justify-center w-full mt-12">
        <Link
          href={`/`}
          className="bg-mainColor hoverEle hover:bg-mainColorHoverLight text-lg py-2 px-4 rounded-lg text-white"
        >
          تصفح الدورات
        </Link>
      </div>
    </>
  );
};

export default CourseSection;
