"use client";
import { Rating } from "@mui/material";
import Image from "next/image";
import {
  Clock,
  CheckCircle,
  Play,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Folder,
  Video,
} from "lucide-react";
import React, { useState } from "react";

import CourseCard from "./CourseCard";
import AddReview from "./Reviews/AddReview";
import { useUserStore } from "@/store/userStore";
import { Course } from "@/types/course";

type Props = {
  course: Course;
};

export const CoursePage = ({ course }: Props) => {
  const { user } = useUserStore();
  const baseUrlVideo = `${process.env.NEXT_PUBLIC_BUNNY_BASE_URL}/${process.env.NEXT_PUBLIC_VIDEO_LIBRARY}`;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const instructor = course.instructor;

  function parseDuration(duration: string): number {
    const parts = duration.split(":").map(Number);

    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      return hours * 3600 + minutes * 60 + seconds;
    }

    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
    }
    if (parts.length === 1) {
      return parts[0] * 60;
    }
    return 0;
  }

  function formatDuration(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  }
  const duration = formatDuration(
    course.sections.reduce(
      (total, section) =>
        total +
        section.videos.reduce(
          (sectionTotal, video) => sectionTotal + parseDuration(video.duration),
          0
        ),
      0
    )
  );
  const videosNumber = course.sections.reduce((acc, section) => {
    return acc + (section.videos?.length || 0);
  }, 0);

  return (
    <div className="h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row-reverse justify-between gap-8 max-w-7xl mx-auto">
          {/* Course Card */}
          <CourseCard
            id={course._id}
            price={course.price}
            duration={duration}
            studentNumber={course.enrolledStudents.length}
            courseLink={course._id}
          />

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Course Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
              <div className="p-8">
                <h1 className="apply-fonts-medium text-3xl text-slate-800 mb-6 leading-tight">
                  {course.title}
                </h1>

                {/* Instructor Info */}
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="relative">
                    <Image
                      src={instructor.thumbnail || "/imgs/personImg.png"}
                      alt="teacher-username"
                      width={80}
                      height={80}
                      className="rounded-full ring-4 ring-blue-200/50 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-md"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-blue-600 font-medium text-sm bg-blue-100 px-3 py-1 rounded-full w-fit">
                      أستاذ الدورة
                    </span>
                    <h2 className="font-bold text-lg text-slate-800">
                      {instructor.username}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Video */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
              {course.sections[0].videos[0] ? (
                <div className="p-6">
                  <div
                    className="relative w-full rounded-xl overflow-hidden shadow-inner"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <iframe
                      src={`${baseUrlVideo}/${course.sections[0].videos[0]?.url}?autoplay=false&loop=false&muted=false&preload=false&responsive=false`}
                      loading="lazy"
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
                  <div className="p-6">
                    <div
                      className="relative w-full rounded-xl overflow-hidden shadow-inner bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center"
                      style={{ paddingTop: "56.25%" }}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        {/* أيقونة رئيسية */}
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                          <Video className="w-8 h-8 text-slate-400" />
                        </div>

                        {/* النص الرئيسي */}
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">
                          لا توجد فيديوهات متاحة
                        </h3>

                        <p className="text-slate-500 text-sm mb-6 max-w-sm">
                          لم يتم رفع أي فيديوهات لهذا القسم بعد
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
              <div className="p-8">
                <h2 className="apply-fonts-medium text-2xl text-slate-800 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  وصف الدورة
                </h2>
                <div className="bg-slate-50 rounded-xl p-6 border-r-4 border-blue-500">
                  <p className="apply-fonts-normal text-slate-700 leading-8 text-base">
                    {course.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Course Concepts */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
              <div className="p-8">
                <h2 className="apply-fonts-medium text-2xl text-slate-800 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                  المفاهيم التي سنتطرق إليها
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.concepts?.map((concept, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-colors duration-300"
                    >
                      <CheckCircle
                        size={20}
                        className="text-green-600 flex-shrink-0"
                      />
                      <span className="apply-fonts-normal text-slate-700 font-medium">
                        {concept}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="apply-fonts-medium text-2xl text-slate-800 flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full"></div>
                    المنهاج
                  </h2>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <PlayCircle size={20} className="text-blue-600" />
                      <span className="font-medium">{videosNumber} درس</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock size={20} className="text-orange-600" />
                      <span className="font-medium">{duration} </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {course.sections?.map((section, index) => (
                    <div
                      key={section._id}
                      className="border border-slate-200 rounded-xl overflow-hidden"
                    >
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(index)}
                        className="flex items-center justify-between w-full p-6 text-right hover:bg-slate-50 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="transform transition-transform duration-300 group-hover:scale-110">
                            {openIndex === index ? (
                              <ChevronUp className="text-blue-600" size={24} />
                            ) : (
                              <ChevronDown
                                className="text-slate-600 group-hover:text-blue-600"
                                size={24}
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <span
                              className={`text-lg font-bold ${
                                openIndex === index
                                  ? "text-blue-700"
                                  : "text-slate-800 group-hover:text-blue-700"
                              } transition-colors duration-300`}
                            >
                              {section.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-slate-500">
                          <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
                            <Folder size={16} />
                            <span className="text-sm font-medium">
                              {section.videos.length} درس
                            </span>
                          </div>
                        </div>
                      </button>

                      {/* Section Videos */}
                      {openIndex === index && (
                        <div className="border-t border-slate-200 bg-slate-50">
                          {section.videos.map((video) => (
                            <div
                              key={video._id}
                              className="flex items-center py-4 px-6 hover:bg-white transition-colors duration-300 cursor-pointer group border-b border-slate-100 last:border-b-0"
                            >
                              <div className="flex items-center gap-4 flex-1">
                                <button className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg group-hover:shadow-xl">
                                  <Play size={16} className="mr-0.5" />
                                </button>

                                <div className="flex-1">
                                  <h4 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 mb-1">
                                    {video.lessonTitle}
                                  </h4>
                                  <div className="flex items-center gap-2 text-slate-500">
                                    <Clock size={14} />
                                    <span className="text-sm font-medium">
                                      {video.duration}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Reviews */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="apply-fonts-medium text-2xl text-slate-800 flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-600 rounded-full"></div>
                    تقييم الدورة
                  </h2>
                  <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-3 rounded-xl border border-yellow-200">
                    <span className="font-bold text-xl text-slate-800">
                      {course.avgRatings}
                    </span>
                    <Rating
                      className="text-yellow-500"
                      dir="ltr"
                      name="half-rating-read"
                      value={course.avgRatings}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">
                    أراء التلاميذ ({course.reviews.length})
                  </h3>

                  {course.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {course.reviews.map((review) => (
                        <div
                          key={review._id}
                          className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                          <div className="flex items-center gap-4 p-6 border-b border-slate-200">
                            <div className="relative">
                              <Image
                                src={
                                  review.user.thumbnail || "/imgs/logoImg.png"
                                }
                                alt="user-username"
                                width={56}
                                height={56}
                                className="rounded-full ring-3 ring-blue-200/50 shadow-lg"
                              />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-md"></div>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-bold text-slate-800">
                                  {review.user.username}
                                </h3>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                  طالب
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-500">
                                <Clock size={16} />
                                <span className="text-sm font-medium">
                                  {review.createdAt.split("T")[0]}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="bg-white rounded-xl p-6 border-r-4 border-blue-500 shadow-inner">
                              <p className="apply-fonts-normal text-slate-700 leading-relaxed">
                                {review.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-dashed border-slate-300">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-200 rounded-full mb-6">
                        <svg
                          className="w-10 h-10 text-slate-400"
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
                      <h3 className="apply-fonts-normal text-slate-600 text-xl font-semibold mb-2">
                        لا توجد أراء بعد
                      </h3>
                      <p className="apply-fonts-normal text-slate-500">
                        كن أول من يشارك رأيه حول هذه الدورة
                      </p>
                    </div>
                  )}
                </div>

                {/* Add Review */}
                {user.role === "teacher" ? null : (
                  <AddReview courseId={course._id} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
