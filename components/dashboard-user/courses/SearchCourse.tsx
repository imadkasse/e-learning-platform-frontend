"use client";
import { useSearchCourse } from "@/store/searchCourse";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import CourseCard from "./CourseCard";

//this search for (students , admins)
const SearchCourse = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchStr, setSearchStr] = useState<string>("");
  const { courses, setCourses } = useSearchCourse();
  const handelSearch = async (
    e: FormEvent<HTMLInputElement>,
    query: string
  ) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/searchCourses?query=${query}`
      );
      setCourses(res.data.courses);
      console.log(res.data.courses);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center flex-grow">
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
            onChange={(e) => {
              if (e.target.value === "") {
                setIsOpen(false);
              } else {
                handelSearch(e, e.target.value);
                setIsOpen(true);
                setSearchStr(e.target.value);
              }
            }}
            placeholder="البحث..."
            required
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-xl px-4 py-5  z-10">
          <div className="">
            <button
              className="text-red-700 mb-3 font-bold"
              onClick={() => {
                setIsOpen(false);
                setCourses([]);
              }}
            >
              X
            </button>
            <div className="mb-5 flex items-center gap-6 ">
              <h1 className="apply-fonts-normal text-2xl font-semibold text-white ">
                البحث عن : {searchStr}
              </h1>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
              {courses.length > 0 ? (
                courses.map((course) => {
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
                <h1 className="apply-fonts-normal sm:text-3xl mt-5 w-full col-span-3 text-center text-white h-[100vh]">
                  لا توجد دورات تطالق هذا البحث
                </h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCourse;
