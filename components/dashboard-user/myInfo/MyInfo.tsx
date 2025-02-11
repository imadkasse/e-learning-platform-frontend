"use client";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Spinner from "@/components/spinner/Spinner";

const MyInfo = () => {
  const { loading } = useUserStore();

  const user = useUserStore((state) => state.user);

  if (loading) {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-full ">
        <Spinner />
      </div>
    );
  }


  return (
    <div className=" lg:custom-width rounded-xl px-4 py-5 h-[93vh] overflow-y-scroll  ">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">معلوماتي</h1>
      </div>
      <div className="hover:cursor-pointer">
        <div className="mt-5 flex items-center  justify-between bg-wygColor shadow shadow-gray-400 py-2 px-4 rounded-lg ">
          <div className="">
            <Image
              src={user.thumbnail ? user.thumbnail : "/imgs/personImg.png"}
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
              {user.phoneNumber}
            </p>
            <p className=" text-sm text-gray-400">
              <span className="apply-fonts-normal">البريد الإلكتروني : </span>
              {user.email}
            </p>
            <p className=" text-sm text-gray-400">
              <span className="apply-fonts-normal">
                الدور :
                {user.role === "student"
                  ? "طالب"
                  : user.role === "admin"
                  ? "أدمن"
                  : "أستاذ"}
              </span>
            </p>
          </div>
          <div>
            <Link
              href={"/dashboard-user/settings"}
              className="apply-fonts-normal border-2 border-mainColor hover:bg-mainColorHoverLight hoverEle text-courseTextSection hover:text-white rounded-md py-1 px-3"
            >
              تعديل
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
