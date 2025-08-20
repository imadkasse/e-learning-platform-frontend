"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
// import CourseCard from "./CourseCard";
import { Search } from "@mui/icons-material";
import { useCoursesStore } from "@/store/coursesStore";
import { useRouter, useSearchParams } from "next/navigation";

const SearchCourseTeacher = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const [query, setQuery] = useState<string>(filter);

  const token = Cookies.get("token");
  const handelSearchCourses = async () => {
    try {
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
        return data.courses;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data.courses;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams();

    if (query) params.set("filter", query);

    // حدّث الرابط بالمعلمات الجديدة
    router.push(`?${params.toString()}`);
  }, [query, router]);
  return (
    <>
      <form>
        <div className="relative ">
          <input
            type="text"
            className="w-full py-2.5 px-3 rounded-xl border-courseTextSection bg-wygColor "
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="إبحث ..."
          />
        </div>
      </form>
    </>
  );
};

export default SearchCourseTeacher;
