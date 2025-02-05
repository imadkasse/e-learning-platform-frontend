"use client";
import React, { FormEvent, useState } from "react";
import Cookies from "js-cookie";
// import CourseCard from "./CourseCard";
import { Search } from "@mui/icons-material";
import { useCoursesStore } from "@/store/coursesStore";

const SearchCourseTeacher = () => {
  const [query, setQuery] = useState<string>("");

  const { setCourses, setLoading } = useCoursesStore();
  const token = Cookies.get("token");
  const handelSearchCourses = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (query !== "") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/searchCoursesByTeacher?query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setCourses(data.courses);
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setCourses(data.user.publishedCourses);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handelSearchCourses}>
        <div className="relative ">
          <input
            type="text"
            className="w-full py-2.5 px-3 rounded-xl border-courseTextSection"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="إبحث ..."
          />
          <button
            type="submit"
            className="absolute top-1 -left-1  apply-fonts-normal  py-1.5 mx-3 rounded-lg text-white px-2 bg-mainColor hover:bg-mainColorHoverLight hoverEle"
          >
            <Search />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchCourseTeacher;
