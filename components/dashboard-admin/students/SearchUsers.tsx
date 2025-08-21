"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchUsers = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const [searchData, setsearchData] = useState<string>(filter);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchData) params.set("filter", searchData);

    // حدّث الرابط بالمعلمات الجديدة
    router.push(`?${params.toString()}`);
  }, [searchData, router]);
  return (
    <>
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
            className="apply-fonts-normal bg-wygColor  block w-full ps-10 p-2.5  rounded-3xl   focus:border-red-400 "
            placeholder="إبحث بإستخدام الإسم..."
            value={searchData}
            onChange={(e) => setsearchData(e.target.value)}
          />
        </div>
      </form>
    </>
  );
};

export default SearchUsers;
