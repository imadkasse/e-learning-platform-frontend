"use client";
import React, {  useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

const SearchCourseTeacher = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const [query, setQuery] = useState<string>(filter);

  
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
