"use client";
import {
  AccessTimeOutlined,
  CheckCircle,
  PlayArrow,
  PlayCircleOutlined,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";

import CourseCard from "./CourseCard";
import AddReview from "./Reviews/AddReview";
import { useUserStore } from "@/store/userStore";
import { Course } from "@/types/course";
import { ChevronDown, ChevronUp, Clock, Folder, Play } from "lucide-react";
import React, { Fragment, useState } from "react";

type Props = {
  course: Course;
};
export const CoursePage = ({ course }: Props) => {
  const { user } = useUserStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const instructor = course.instructor;

  return (
    <div className="mt-6 flex  flex-row-reverse justify-between gap-7 px-3 ">
      {/* Course Card */}
      <CourseCard
        id={course._id}
        price={course.price}
        duration={course.duration}
        studentNumber={course.enrolledStudents.length}
        courseLink={course._id}
      />
      {/* Show Course  */}
      <div className="lg:custom-width-Course ">
        {/* title Of Course  */}
        <div>
          <h1 className="apply-fonts-medium text-lg">{course.title}</h1>
        </div>
        {/* Teacher Information */}
        <div className="my-5 border-b-2 py-4 flex items-center gap-3">
          <Image
            src={instructor.thumbnail || "/imgs/personImg.png"}
            alt="teacher-username"
            width={150}
            height={150}
            className="rounded-full xs:w-14 xs:h-14"
          />
          <div className="flex flex-col gap-1">
            <h3 className="apply-fonts-normal text-courseTextSection text-[14px]">
              أستاذ الدورة
            </h3>
            <h1 className="font-medium">{instructor.username}</h1>
          </div>
        </div>
        {/* Welcome video */}

        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            src={`https://iframe.mediadelivery.net/embed/476506/${course.sections[0].videos[0]?.url}?autoplay=false&loop=false&muted=false&preload=false&responsive=false`}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-md"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* description Course */}
        <div className="my-4">
          <h1 className="apply-fonts-medium  text-lg mb-2">وصف الدورة</h1>
          <p className="apply-fonts-normal text-[14px] text-courseTextSection leading-8 pl-5 xs:line-clamp-4  md:line-clamp-6">
            {course.description}
          </p>
        </div>
        {/* Consepts Course */}
        <div className="my-4  px-5 py-2 bg-courseConseptColor">
          <h1 className="apply-fonts-medium text-lg ">
            المفاهيم التي سنتطرق إليها
          </h1>
          <div className="mt-2 py-2 grid grid-cols-2  gap-2">
            {course.concepts?.map((concept, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle fontSize="small" className="text-green-500" />
                <h1 className="apply-fonts-normal text-[14px] text-courseTextSection">
                  {concept}
                </h1>
              </div>
            ))}
          </div>
        </div>
        {/* all videos */}
        <div>
          <div className="flex justify-between border-b">
            <h1 className="apply-fonts-medium  text-lg mb-2">المنهاج</h1>
            <div className="flex  gap-6 px-2">
              <div className="flex  items-center gap-1">
                <PlayCircleOutlined className="text-mainColor" />
                <h1 className="flex  items-center">
                  {course.sections.length}
                  <span className="apply-fonts-normal text-[13px]">درس</span>
                </h1>
              </div>
              <div className="flex  items-center gap-1">
                <AccessTimeOutlined className="text-courseIconsSection" />
                <h1 className="flex  items-center">
                  {/* added after time */}
                  {(course.duration / 3600).toFixed(2)}
                  <span className="mr-1 apply-fonts-normal text-[13px]">
                    ساعة
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div className="">
            <table className="table-auto w-full border-collapse">
              <tbody>
                {course.sections?.map((section, index) => (
                  <Fragment key={section._id}>
                    {/* عنوان القسم */}
                    <tr className="border-b border-gray-200">
                      <td colSpan={3} className="p-0">
                        <button
                          onClick={() => toggleSection(index)}
                          className="flex items-center justify-between w-full py-4 px-6 text-right   transition-all duration-300 ease-in-out group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="transform transition-all duration-300 ease-in-out group-hover:scale-110">
                              {openIndex === index ? (
                                <ChevronUp
                                  className="text-blue-700 transition-all duration-300"
                                  size={20}
                                />
                              ) : (
                                <ChevronDown
                                  className="text-gray-600 group-hover:text-blue-600 transition-all duration-300"
                                  size={20}
                                />
                              )}
                            </div>
                            <span
                              className={`text-lg font-semibold  ${
                                openIndex === index
                                  ? "text-blue-700"
                                  : "text-gray-800 group-hover:text-blue-700 transition-all duration-300"
                              }`}
                            >
                              {section.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* <div className="flex items-center gap-2 text-gray-500">
                              <Clock size={14} />
                              <span className="text-sm font-medium">21م</span>
                            </div> */}
                            <div className="flex items-center gap-2 text-gray-500">
                              {/* <span className="w-2 h-2 bg-gray-400 rounded-full"></span> */}
                              <span className="text-sm font-medium">
                                {section.videos.length} درس
                              </span>
                            </div>
                          </div>
                        </button>
                      </td>
                    </tr>

                    {/* فيديوهات القسم */}
                    {openIndex === index && (
                      <tr>
                        <td colSpan={3} className="p-0 bg-white">
                          <div className="border-l-4 border-blue-500 bg-blue-50/30">
                            {section.videos.map((video, videoIndex) => (
                              <div
                                key={video._id}
                                className={`flex items-center py-3 px-6 hover:bg-blue-50 transition-all duration-300 ease-in-out cursor-pointer group animate-slideDown border-b border-gray-100 last:border-b-0`}
                                style={{
                                  animationDelay: `${videoIndex * 80}ms`,
                                }}
                              >
                                {/* زر التشغيل */}
                                <div className="flex items-center justify-center w-8 h-8 ml-4">
                                  <button className="flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 group-hover:shadow-md">
                                    <Play
                                      size={12}
                                      className="mr-0.5 transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                  </button>
                                </div>

                                {/* اسم الدرس */}
                                <div className="flex-1 text-right px-4">
                                  <h4 className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                                    {video.lessonTitle}
                                  </h4>
                                </div>

                                {/* مدة الدرس */}
                                <div className="text-gray-500 text-sm font-medium min-w-[80px] text-center">
                                  {(Number(video.duration) / 60).toFixed(0)}{" "}
                                  دقيقة
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* course reviews */}
        <div className="mt-5 flex  items-center justify-between">
          <h1 className="apply-fonts-medium  text-lg mb-2">تقييم الدورة</h1>
          <div className="flex items-center gap-1 px-3">
            <p className="font-bold text-[15px]">{course.avgRatings}</p>
            <Rating
              className="text-courseStarColor"
              dir="ltr"
              name="half-rating-read"
              value={course.avgRatings}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
        {/* stduents reviews */}
        <div className="mt-5">
          <h1 className="  text-lg mb-8">
            <span className="apply-fonts-medium">أراء التلاميذ </span>(
            {course.reviews.length})
          </h1>

          <div className="flex flex-col gap-5">
            {course.reviews.length > 0 ? (
              <div className="space-y-6">
                {course.reviews.map((review) => {
                  return (
                    <div
                      key={review._id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                    >
                      {/* Review Header */}
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                        <div className="relative">
                          <Image
                            src={review.user.thumbnail || "/imgs/logoImg.png"}
                            alt="user-username"
                            width={48}
                            height={48}
                            className="rounded-full ring-2 ring-[#B9BCFF]/20"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#45DA10] rounded-full border-2 border-white"></div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-800 text-sm">
                              {review.user.username}
                            </h3>
                            <span className="px-2 py-1 bg-[#B9BCFF]/20 text-[#3D45EE] text-xs rounded-full font-medium">
                              طالب
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-xs text-gray-500 font-medium">
                              {review.createdAt.split("T")[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Review Content */}
                      <div dir="rtl" className="p-4">
                        <div className="bg-gray-50 rounded-xl p-4 border-r-4 border-[#3D45EE]">
                          <p className="apply-fonts-normal text-gray-700 leading-relaxed text-sm">
                            {review.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="apply-fonts-normal text-gray-600 text-lg font-medium">
                  لا توجد أراء بعد
                </h3>
                <p className="apply-fonts-normal text-gray-400 text-sm mt-1">
                  كن أول من يشارك رأيه حول هذه الدورة
                </p>
              </div>
            )}
          </div>
        </div>

        {/* add review */}

        {user.role === "teacher" ? <></> : <AddReview courseId={course._id} />}
      </div>
    </div>
  );
};
<style jsx>{`
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slideDown {
    animation: slideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .group:hover .animate-pulse-hover {
    animation: pulse 2s infinite;
  }
`}</style>;
