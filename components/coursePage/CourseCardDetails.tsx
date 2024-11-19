"use client";
import React, { useState } from "react";
import {
  AccessTimeOutlined,
  ArrowBackIos,
  ArrowForwardIos,
  ContentCopyOutlined,
  Facebook,
  Instagram,
  PlayCircleOutlined,
  Twitter,
} from "@mui/icons-material";
import Link from "next/link";

const CourseCardDetails = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handelOpenAndColsed = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        onClick={handelOpenAndColsed}
        className={` transition-all duration-300 ease-in-out ${
          isOpen ? "xs:ml-0 lg:hidden" : "lg:ml-[402px] xs:ml-[302px] lg:hidden"
        } xs:fixed lg:hidden z-50 py-2 sm:px-4 xs:px-2  rounded-lg bg-mainColor text-white hover:bg-mainColorHoverLight hoverEle`}
      >
        {isOpen ? (
          <div className="flex items-center gap-3">
            <ArrowForwardIos />
            <h1 className="apply-fonts-normal text-[13px] xs:hidden sm:block">
              محتوى الدورة
            </h1>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <h1 className="apply-fonts-normal text-[13px]  xs:hidden sm:block">
              محتوى الدورة
            </h1>
            <ArrowBackIos />
          </div>
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "xs:hidden lg:flex" : "lg:w-[400px] xs:w-[300px]"
        } border shadow-sm max-h-[80vh]  lg:sticky lg:top-24 xs:fixed z-10 xs:bg-wygColor  w-[400px] py-3 px-4 flex flex-col justify-between gap-6`}
      >
        {/* Title & course Details (Videos and progress) */}
        <section className="flex flex-col gap-3">
          {/* Title */}
          <div className="w-full text-lg  ">
            <h1 className="border-b py-3 border-courseTextSection apply-fonts-normal ">
              محتوى الدورة
            </h1>
          </div>

          {/* course Details (Videos and progress)*/}
          <div className="border border-gray-300">
            <div className="flex items-center justify-between bg-gray-300 py-2 px-1">
              <div>
                <h1 className="apply-fonts-normal">الدروس</h1>
              </div>
              <div className="flex  gap-6 px-2">
                <div className="flex  items-center gap-1">
                  <PlayCircleOutlined className="text-mainColor" />
                  <h1 className="flex  items-center">
                    30
                    <span className="apply-fonts-normal text-[13px] mr-1">
                      محاضرة
                    </span>
                  </h1>
                </div>
              </div>
              <div>
                <h1 className="font-semibold text-green-400">1/13</h1>
              </div>
            </div>
            {/* Content  */}
            <div className="my-2 py-1 px-2 bg-mainColorHoverLight/60 group hoverEle">
              <div className="flex items-center justify-between text-white ">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-9" checked={true} readOnly  />
                  <h1 className="font-semibold text-base">المقدمة</h1>
                </div>

                <div className=" flex items-center gap-1 text-white">
                  <AccessTimeOutlined />
                  <p>05:00</p>
                </div>
              </div>
            </div>

            <div className="my-2 py-1 px-2 hover:bg-mainColorHoverLight/60 group hoverEle">
              <div className="flex items-center justify-between group-hover:text-white ">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-9" />
                  <h1 className="font-semibold text-base">الدرس 3</h1>
                </div>

                <div className="text-courseTextSection flex items-center gap-1 group-hover:text-white">
                  <AccessTimeOutlined />
                  <p>20:00</p>
                </div>
              </div>
            </div>

            <div className="my-2 py-1 px-2 hover:bg-mainColorHoverLight/60 group hoverEle">
              <div className="flex items-center justify-between group-hover:text-white ">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-9" />
                  <h1 className="font-semibold text-base">الدرس 2</h1>
                </div>

                <div className="text-courseTextSection flex items-center gap-1 group-hover:text-white">
                  <AccessTimeOutlined />
                  <p>19:15</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Share Course Links */}
        <div className="">
          <p className="apply-fonts-medium mb-3 ">شارك هذه الدورة :</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="#"
              className=" px-4 py-2 rounded-lg hover:border-gray-400 hoverEle bg-gray-100 border"
            >
              <Facebook className="text-courseTextSection" />
            </Link>
            <Link
              href="#"
              className="bg-gray-100 px-4 py-2 rounded-lg hover:border-gray-400 hoverEle border"
            >
              <Twitter className="text-courseTextSection" />
            </Link>
            <Link
              href="#"
              className="bg-gray-100 px-4 py-2 rounded-lg hover:border-gray-400 hoverEle border"
            >
              <Instagram className="text-courseTextSection" />
            </Link>
            <Link
              href="#"
              className="bg-gray-100 border px-3 py-2 rounded-lg hover:border-gray-400 hoverEle flex items-center gap-1"
            >
              <h1 className="apply-fonts-normal text-[11px] text-gray-700">
                نسخ الرابط
              </h1>

              <ContentCopyOutlined
                sx={{ fontSize: "14px" }}
                className="text-courseTextSection "
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCardDetails;
