import React from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { Course } from "@/types/course";

const Courses = async () => {
  const data = await axios.get(`${process.env.BACK_URL}/api/courses`);

  const allCourses: Course[] = data.data.courses;

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 ">
      <div className="mb-5 flex items-center gap-6">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الدورات</h1>

        <form className="flex items-center flex-grow">
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute  inset-y-0 start-0 flex items-center ps-3 pointer-events-none  ">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="apply-fonts-normal  block w-full ps-10 p-2.5  rounded-3xl   focus:border-red-400 "
              placeholder="البحث..."
              required
            />
          </div>
          <button className="apply-fonts-normal  py-2.5 mx-3 rounded-lg text-white px-4 bg-mainColor hover:bg-mainColorHoverLight hoverEle">
            إبحث
          </button>
        </form>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
        {allCourses.length ? (
          allCourses.map((course) => {
            return (
              <div key={course._id}>
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
          <h1 className="apply-fonts-normal sm:text-3xl mt-5 w-full col-span-3 text-center text-mainColor h-[100vh]">
            ليس لديك أي دورات يمكنك إضافة دوراتك
          </h1>
        )}
      </div>
    </div>
  );
};

export default Courses;
