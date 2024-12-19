"use client";
import { useSearchUser } from "@/store/searchUser";
import React, { FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "@/types/user";

const SearchAdmin = () => {
  const token = Cookies.get("token");
  const [searchData, setsearchData] = useState<string>("");
  const { setUsers, setLoading } = useSearchUser();
  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(searchData);
      if (searchData !== "") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/searchUsers?query=${searchData}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setUsers(
          data.users.filter(
            (user: User) => user.role === "admin" || user.role === "teacher"
          ) || []
        );
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setUsers(
          data.users.filter(
            (user: User) => user.role === "admin" || user.role === "teacher"
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  return (
    <form className="flex items-center flex-grow" onSubmit={handleSearch}>
      <label className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 pointer-events-none  ">
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
          value={searchData}
          onChange={(e) => setsearchData(e.target.value)}
          className="apply-fonts-normal  block w-full ps-10 p-2.5  rounded-3xl   focus:border-red-400 "
          placeholder="البحث..."
        />
      </div>
      <button className="apply-fonts-normal  py-2.5 mx-3 rounded-lg text-white px-4 bg-mainColor hover:bg-mainColorHoverLight hoverEle">
        إبحث
      </button>
    </form>
  );
};

export default SearchAdmin;
