import React from "react";

import { Course } from "@/types/course";
import SlidesCourses from "./SlidesCourses";

type ShowCourse = {
  category: string;
  courses: Course[];
};

const Courses = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/getCategory`,
    {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    }
  );
  const coursesData = await data.json();

  const courses: ShowCourse[] = coursesData.courses;

  return (
    <div className="px-6">
      <SlidesCourses courses={courses} />
    </div>
  );
};

export default Courses;
