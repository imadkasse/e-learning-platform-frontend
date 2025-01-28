"use client";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Spinner from "@/components/spinner/Spinner";

const MyInfo = () => {
  const token = Cookies.get("token");
  const { fetchUser, loading } = useUserStore();

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <Spinner />;
  }
  if (!token || user.role !== "student") {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
        <h1 className="apply-fonts-normal sm:text-3xl mt-5 w-full col-span-3 text-center text-mainColor ">
          أنت غير مسجل أو لا تملك الصلاحية للوصول الى هذه الصفحة
        </h1>
        <div className="mt-5 flex justify-center ">
          <Link
            href={"/login"}
            className="apply-fonts-normal py-2 px-4  bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white rounded-lg"
          >
            سجل الدخول من هنا
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 min-h-screen  ">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">معلوماتي</h1>
      </div>
      <div className="hover:cursor-pointer">
        <div className="mt-5 flex items-center  justify-between bg-wygColor shadow-lg shadow-mainColor py-2 px-4 rounded-lg ">
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
