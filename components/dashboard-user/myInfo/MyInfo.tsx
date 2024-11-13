"use client";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import React, { useEffect } from "react";

const MyInfo = () => {
  const fetchUserData = useUserStore((state) => state.fetchUser);

  const user = useUserStore((state) => state);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 min-h-screen  ">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">معلوماتي</h1>
      </div>
      <div className="hover:cursor-pointer">
        <div className="mt-5 flex items-center  justify-between bg-wygColor shadow-lg shadow-mainColor py-2 px-4 rounded-lg ">
          <div className="">
            <Image
              src={user.thumbnail}
              alt="personImg"
              width={100}
              height={100}
              className="rounded-full border-2 border-mainColor"
            />
          </div>
          <div>
            <h1 className="apply-fonts-medium text-xl">
              الإسم:{user.username}
            </h1>
          </div>
          <div>
            <p className=" text-sm text-gray-400">
              <span className="apply-fonts-normal"> رقم الهاتف : </span>
              066626468
            </p>
            <p className=" text-sm text-gray-400">
              <span className="apply-fonts-normal">البريد الإلكتروني : </span>
              {user.email}
            </p>
            <p className=" text-sm text-gray-400">
              <span className="apply-fonts-normal"> الدور : {user.role} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
