"use client";
import { useCoursesStore } from "@/store/coursesStore";
import showToast from "@/utils/showToast";
import React, { ChangeEvent, FormEvent, useState } from "react";

const SearchCourse = () => {
  const [searchData, setsearchData] = useState<string>("");
  const { setCourses, setLoading } = useCoursesStore();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchData(e.target.value);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (searchData !== "") {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/searchCourses?query=${searchData}`
        );
        const res = await data.json();
        setCourses(res.courses);
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses`
        );
        const data = await res.json();
        setCourses(data.courses);
      }
    } catch (error) {
      console.log(error);
      //@ts-expect-error:fix...
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form className="flex items-center flex-grow" onSubmit={handleSubmit}>
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
            value={searchData}
            onChange={handleSearchChange}
            className="apply-fonts-normal  block w-full ps-10 p-2.5  rounded-3xl   focus:border-red-400 "
            placeholder="البحث..."
          />
        </div>
        <button
          type="submit"
          className="apply-fonts-normal  py-2.5 mx-3 rounded-lg text-white px-4 bg-mainColor hover:bg-mainColorHoverLight hoverEle"
        >
          إبحث
        </button>
      </form>
    </>
  );
};

export default SearchCourse;
