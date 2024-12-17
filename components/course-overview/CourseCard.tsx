"use client";
import React, { useState } from "react";
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

// add this on other time
type Props = {
  price: number;
  duration: number;
  studentNumber: number;
  courseLink: string;
};

const CourseCard = ({ price, duration, studentNumber, courseLink }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handelOpenAndColsed = () => {
    setIsOpen(!isOpen);
  };
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
        } border shadow-sm h-[80vh] lg:sticky lg:top-24 xs:fixed z-10 xs:bg-wygColor  w-[400px] py-3 px-4 flex flex-col gap-6`}
      >
        {/* price */}
        <div className="w-full text-lg text-center">
          <h1 className="border-b border-courseTextSection">{price}DA</h1>
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
          <button className="apply-fonts-normal w-full p-2 bg-mainColor text-white rounded-sm hover:bg-mainColorHoverLight hoverEle">
            الانضمام
          </button>
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
              href={`/${courseLink}`}
              className=" px-4 py-2 rounded-lg hover:border-gray-400 hoverEle bg-gray-100"
            >
              <Facebook className="text-courseTextSection" />
            </Link>
            <Link
              href={`/${courseLink}`}
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
            <Link
              href={`/${courseLink}`}
              className="bg-gray-100 px-3 py-2 rounded-lg hover:border-gray-400 hoverEle flex items-center gap-1"
            >
              <h1 className="apply-fonts-normal text-[11px] text-gray-700">
                نسخ الرابط
              </h1>
              <ContentCopyOutlined className="text-courseTextSection" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
