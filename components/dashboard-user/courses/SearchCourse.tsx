"use client";
import React, { FormEvent, useState } from "react";
import { useCoursesStore } from "@/store/coursesStore";

//this search for (students , admins)
const SearchCourse = () => {
  const [query, setQuery] = useState<string>("");

  const { setCourses, setLoading } = useCoursesStore();
  const handelSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (query !== "") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/searchCourses?query=${query}`
        );
        const data = await res.json();
        setCourses(data.courses);
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses`
        );
        const data = await res.json();
        setCourses(data.courses);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form className="flex items-center flex-grow " onSubmit={handelSearch} >
        <label className="sr-only">Search</label>
        <div className="relative w-full ">
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
            className="apply-fonts-normal bg-wygColor  block w-full ps-10 p-2.5  rounded-3xl   focus:border-red-400 "
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="البحث..."
          />
        </div>
        <button
          type="submit"
          className="apply-fonts-normal  py-2.5 mx-3 rounded-lg text-white px-4 bg-mainColor hover:bg-mainColorHoverLight hoverEle"
        >
          بحث
        </button>
      </form>
    </>
  );
};

export default SearchCourse;
