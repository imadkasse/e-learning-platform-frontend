"use client";
import { useSearchCourse } from "@/store/searchCourse";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import CourseCard from "./CourseCard";

const SearchCourseTeacher = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchStr, setSearchStr] = useState<string>("");

  const { courses, setCourses } = useSearchCourse();
  const token = Cookies.get("token");
  const handelSearch = async (
    e: FormEvent<HTMLInputElement>,
    query: string
  ) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/searchCoursesByTeacher?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses(res.data.courses);
      console.log(res.data.courses);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <input
        type="text"
        className="w-full py-2.5 px-3 rounded-xl border-courseTextSection "
        onChange={(e) => {
          if (e.target.value === "") {
            setIsOpen(false);
          } else {
            handelSearch(e, e.target.value);
            setIsOpen(true);
            setSearchStr(e.target.value)
          }
        }}
        placeholder="إبحث ..."
      />
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

export default SearchCourseTeacher;
