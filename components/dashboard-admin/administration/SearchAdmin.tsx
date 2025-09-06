"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchAdmin = () => {
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
    <div className="relative w-full">
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none z-10">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={searchData}
        onChange={(e) => setsearchData(e.target.value)}
        className="apply-fonts-normal w-full pr-12 pl-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md placeholder-gray-400"
        placeholder="البحث عن المستخدمين..."
      />
      {searchData && (
        <button
          onClick={() => setsearchData("")}
          className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchAdmin;
