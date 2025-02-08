"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  AccessTimeOutlined,
  ArrowBackIos,
  ArrowForwardIos,
  ContentCopyOutlined,
  Facebook,
  FileDownloadOutlined,
  Instagram,
  OnlinePredictionOutlined,
  PeopleAltOutlined,
  Twitter,
} from "@mui/icons-material";
import Link from "next/link";
import showToast from "@/utils/showToast";
import Cookies from "js-cookie";
import axios from "axios";
import { useUserStore } from "@/store/userStore";

// add this on other time
type Props = {
  id: string;
  price: number;
  duration: number;
  studentNumber: number;
  courseLink: string;
};

const CourseCard = ({
  price,
  duration,
  studentNumber,
  courseLink,
  id,
}: Props) => {
  const token = Cookies.get("token");
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}course-overview/${id}`;
  const { user, fetchUser } = useUserStore();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handelOpenAndColsed = () => {
    setIsOpen(!isOpen);
  };
  const enrollmentCourse = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!token) {
      showToast("error", "يجب تسجيل الدخول أولا");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/enrolled/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showToast("success", res.data.message);
    } catch (error) {
      //@ts-expect-error:fix agin
      showToast("error", error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <button
        onClick={handelOpenAndColsed}
        className={` transition-all duration-300 ease-in-out ${
          isOpen ? "xs:ml-0 lg:hidden" : "xs:ml-[402px] lg:hidden"
        } xs:fixed lg:hidden z-50 py-2 px-4 rounded-lg bg-mainColor text-white hover:bg-mainColorHoverLight hoverEle`}
      >
        {isOpen ? (
          <div className="flex items-center gap-3">
            <ArrowForwardIos />
            <h1 className="apply-fonts-normal text-[13px]">تفاصيل الدورة</h1>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <h1 className="apply-fonts-normal text-[13px]">تفاصيل الدورة</h1>
            <ArrowBackIos />
          </div>
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "xs:hidden lg:flex" : "w-[400px]"
        } border shadow-sm h-[606px] lg:sticky lg:top-24 xs:fixed z-10 xs:bg-wygColor  w-[400px]  py-3 px-4 flex flex-col gap-6`}
      >
        {/* price */}
        <div className="w-full text-lg text-center">
          <h1 className="border-b border-courseTextSection font-bold">
            {price === 0 ? "مجاناً الأن" : price}
            {price === 0 ? "" : "DA"}
          </h1>
        </div>
        <div className=" flex flex-col gap-1 py-2">
          {/* duration */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="apply-fonts-normal ">مدة الدورة </p>
              <AccessTimeOutlined className="text-courseTextSection" />
            </div>
            <h1 className="text-courseTextSection">
              {(duration / 3600).toFixed(5)}
              <span className="text-[17px] apply-fonts-normal ">ساعة</span>
            </h1>
          </div>
          {/* student number */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="apply-fonts-normal ">عدد الطلاب </p>
              <PeopleAltOutlined className="text-courseTextSection" />
            </div>
            <h1 className="text-courseTextSection">{studentNumber}</h1>
          </div>
        </div>

        <div className="">
          {user.role === "teacher" || user.role === "admin" ? (
            <hr />
          ) : (
            <button
              onClick={enrollmentCourse}
              className={`apply-fonts-normal w-full p-2  text-white rounded-sm  hoverEle ${
                user.enrolledCourses.some((c) => c._id === id)
                  ? "bg-mainColorHoverLight cursor-not-allowed  "
                  : "bg-mainColor hover:bg-mainColorHoverLight"
              }`}
            >
              {user.enrolledCourses.some((c) => c._id === id)
                ? "أنت منضم بالفعل"
                : "الانضمام"}
            </button>
          )}
        </div>
        {/* course features */}
        <div className=" ">
          <p className="apply-fonts-medium mb-3">تتضمن هذه الدورة :</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 cursor-pointer">
              <AccessTimeOutlined className="text-courseIconsSection" />
              <p className="apply-fonts-normal text-[15px] text-courseTextSection">
                وصول الى دورة مدى الحياة
              </p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <FileDownloadOutlined className="text-courseIconsSection" />
              <p className="apply-fonts-normal text-[15px] text-courseTextSection">
                تحميل مجاني للملفات والتمارين
              </p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <OnlinePredictionOutlined className="text-courseIconsSection" />
              <p className=" text-[15px] text-courseTextSection">
                <span className="apply-fonts-normal">الدورة أونلاين</span> 100%
              </p>
            </div>
          </div>
        </div>
        {/* Share Course Links */}
        <div className="">
          <p className="apply-fonts-medium mb-3 ">شارك هذه الدورة :</p>
          <div className="flex gap-4 justify-center">
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                link
              )}`}
              target="_blank"
              className=" px-4 py-2 rounded-lg hover:border-gray-400 hoverEle bg-gray-100"
            >
              <Facebook className="text-courseTextSection" />
            </Link>
            <Link
              href={`https://twitter.com/intent/tweet?url=${link}`}
              className="bg-gray-100 px-4 py-2 rounded-lg hover:border-gray-400 hoverEle"
            >
              <Twitter className="text-courseTextSection" />
            </Link>
            <Link
              href={`/${courseLink}`}
              className="bg-gray-100 px-4 py-2 rounded-lg hover:border-gray-400 hoverEle"
            >
              <Instagram className="text-courseTextSection" />
            </Link>
            <button
              onClick={() => {
                navigator.clipboard.writeText(link);
                showToast("success", "تم نسخ الرابط الى الحافظة");
              }}
              className="bg-gray-100 px-3 py-2 rounded-lg hover:border-gray-400 hoverEle flex items-center gap-1"
            >
              <h1 className="apply-fonts-normal text-[11px] text-gray-700">
                نسخ الرابط
              </h1>
              <ContentCopyOutlined className="text-courseTextSection" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
