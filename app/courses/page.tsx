import Courses from "@/components/courses/Courses";
import NavBarCourses from "@/components/courses/NavBarCourses";
import React from "react";

const page = () => {
  return (
    <div className="py-3 container mx-auto ">
      <NavBarCourses />
      <Courses />
    </div>
  );
};

export default page;
