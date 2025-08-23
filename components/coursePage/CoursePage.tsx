"use client";
import { DescriptionOutlined, LoginOutlined } from "@mui/icons-material";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import CourseCardDetails from "./CourseCardDetails";
import { Course } from "@/types/course";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import Spinner from "../spinner/Spinner";
import { useLesson } from "@/store/lessonStore";
import "react-toastify/dist/ReactToastify.css";
import { redirect, usePathname } from "next/navigation";
import { Reply } from "./comments and replies/Reply";
import AddComment from "./comments and replies/AddComment";
import AddReply from "./comments and replies/AddReply";
import VideoPlayer from "./VideoPlayer";
type Props = {
  course: Course;
};
const CoursePage = ({ course }: Props) => {
  const { lesson, setLesson } = useLesson();

  const [isEnrolled, setIsEnrolled] = useState<boolean | undefined>(undefined);
  const [isPublichedCourse, setIsPublichedCourse] = useState<
    boolean | undefined
  >(undefined);

  const checkIsEnrolledCourse = (
    userId: string,
    course: Course | undefined
  ) => {
    return course?.enrolledStudents.some((s) => s === userId);
  };

  const { user } = useUserStore();

  //set first lesson from first section
  useEffect(() => {
    if (course?.sections && course.sections.length > 0) {
      const firstSection = course.sections[0];
      if (firstSection.videos && firstSection.videos.length > 0) {
        setLesson(
          firstSection.videos[0] || {
            _id: "",
            lessonTitle: "",
            url: "",
            duration: 0,
            isCompleted: false,
            completedBy: [],
            comments: [],
          }
        );
      }
    }
  }, [setLesson, course]);

  useEffect(() => {
    const checkIsPublichedCourse = (
      userId: string,
      course: Course | undefined
    ) => {
      return (
        course?.instructor._id === userId &&
        user.publishedCourses.some((c) => c._id === course?._id)
      );
    };
    if (user._id && course) {
      const enrollmentStatus = checkIsEnrolledCourse(user._id, course);
      setIsEnrolled(enrollmentStatus);
      const publichedStatus = checkIsPublichedCourse(user._id, course);
      setIsPublichedCourse(publichedStatus);
    }
  }, [user, course]);

  //add spinner
  if (isEnrolled === undefined || isPublichedCourse === undefined) {
    return <Spinner />;
  }
  //check is user logged in
  if (!user._id) {
    return (
      <div className="my-5 flex flex-col items-center justify-center min-h-screen text-center bg-yellow-50 border border-yellow-300 rounded-lg p-6">
        <h2 className="apply-fonts-medium text-xl text-yellow-600">
          يرجى تسجيل الدخول للوصول إلى الدورة!
        </h2>
        <p className="apply-fonts-normal text-gray-700 mt-2">
          يجب تسجيل الدخول حتى تتمكن من مشاهدة محتوى الدورة.
        </p>
        <Link
          href={"/login"}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-lg shadow-md flex items-center gap-2 transition duration-300"
        >
          <LoginOutlined />
          تسجيل الدخول
        </Link>
      </div>
    );
  }
  //check is user buying course
  if (user.role === "student" && !isEnrolled) {
    redirect(`/course-overview/${course._id}`);
  }
  // check is the course uploaded by teacher
  if (user.role === "teacher" && !isPublichedCourse) {
    redirect(`/dashboard-teacher/courses`);
  }

  //section comments
  return (
    <div className="  flex  flex-row-reverse justify-between gap-7 sm:px-3  ">
      {/* Course Details */}

      <CourseCardDetails
        courseVideos={course?.sections[0].videos}
        courseId={course?._id}
        userId={user._id}
        sections={course?.sections}
      />

      {/* Show Course */}
      <div className="lg:custom-width-Course mx-auto">
        {/* first  video */}
        <VideoPlayer videoId={lesson?.url} />
        {/* Video Title */}
        <div className="my-4">
          <h1 className="apply-fonts-medium  xs:text-lg lg:text-2xl mb-2">
            {lesson?.lessonTitle}
          </h1>
        </div>
        {/* student number and  number of reviews */}
        <div className="my-4 flex justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-row-reverse -space-x-4 ">
              <Image
                width={150}
                height={150}
                className="w-10 h-10 border-2 rounded-full border-white"
                src="/imgs/personImg.png"
                alt="personImg"
              />
              <Image
                width={150}
                height={150}
                className="w-10 h-10 border-2 rounded-full border-white"
                src="/imgs/personImg.png"
                alt="personImg"
              />
              <Image
                width={150}
                height={150}
                className="w-10 h-10 border-2 rounded-full border-white"
                src="/imgs/personImg.png"
                alt="personImg"
              />
              <Image
                width={150}
                height={150}
                className="w-10 h-10 border-2 rounded-full border-white"
                src="/imgs/personImg.png"
                alt="personImg"
              />
            </div>
            <h2 className="flex flex-col -gap-2">
              <p className="font-semibold">{course?.enrolledStudents.length}</p>
              <span className="apply-fonts-normal text-[13px] text-courseTextSection">
                تلميذ
              </span>
            </h2>
          </div>
          <div>
            <h2 className="flex flex-col -gap-2">
              <p className="font-semibold">{course?.reviews.length}</p>
              <span className="apply-fonts-normal text-[13px] text-courseTextSection">
                تقييم
              </span>
            </h2>
          </div>
        </div>
        {/* description Course */}
        <div className="my-4">
          <h1 className="apply-fonts-medium xs:text-lg lg:text-2xl mb-2">
            وصف الدرس
          </h1>
          <p className="apply-fonts-normal text-[14px] text-courseTextSection leading-8 pl-5 xs:line-clamp-4  md:line-clamp-6">
            {lesson.description}
          </p>
        </div>
        {/* Course Fiels */}
        <div className="my-4">
          <h1 className="apply-fonts-medium  xs:text-lg lg:text-2xl mb-2">
            ملفات الدرس
          </h1>
          <div className="flex flex-col gap-3">
            {lesson?.files ? (
              lesson?.files.map((file) => {
                return (
                  <div
                    key={file._id}
                    className="bg-wygColor py-4 px-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <DescriptionOutlined
                        sx={{ fontSize: "44px" }}
                        className="text-courseIconsSection"
                      />
                      <div>
                        <h1 className="text-md font-medium line-clamp-2">
                          {file.filename}
                        </h1>
                        <p className="text-courseTextSection" dir="">
                          {(Number(file.size) / 1024 / 1024).toFixed(2)}MB
                        </p>
                      </div>
                    </div>

                    <div>
                      <a
                        href={file.url}
                        target="_blank"
                        download={true}
                        className="apply-fonts-normal py-2 px-3 bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white xs:text-sm"
                      >
                        تحميل
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>لا توجد اي ملفات</h1>
            )}
          </div>
        </div>
        {/* stduents comments */}
        <div className="mt-5">
          <h1 className="mb-8 flex items-center gap-1">
            <span className="apply-fonts-medium  xs:text-lg lg:text-2xl">
              التعليقات
            </span>
            <p className="font-bold text-courseTextSection">
              ({lesson?.comments.length})
            </p>
          </h1>

          <div className="flex flex-col gap-5">
            {lesson?.comments.length > 0 ? (
              <div className="space-y-6">
                {lesson?.comments.map((comment) => {
                  return (
                    <div
                      key={comment._id}
                      id={comment._id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                    >
                      {/* Comment Header */}
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                        <div className="relative">
                          <Image
                            src={comment.user.thumbnail || "/imgs/logoImg.png"}
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
                              {comment.user.username}
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
                              {comment.createdAt.split("T")[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Comment Content */}
                      <div dir="rtl" className="p-4">
                        <div className="bg-gray-50 rounded-xl p-4 border-r-4 border-[#3D45EE]">
                          <p className="apply-fonts-normal text-gray-700 leading-relaxed text-sm">
                            {comment.text}
                          </p>
                        </div>
                      </div>

                      {/* Reply Section */}
                      <div className="px-4 pb-4">
                        {user.role !== "student" && (
                          <div className="mb-3">
                            <AddReply commentId={comment._id} />
                          </div>
                        )}

                        {comment.replies && comment.replies.length > 0 && (
                          <Reply replys={comment.replies} />
                        )}
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
                  لا توجد تعليقات بعد
                </h3>
                <p className="apply-fonts-normal text-gray-400 text-sm mt-1">
                  كن أول من يشارك رأيه حول هذا الدرس
                </p>
              </div>
            )}
          </div>

          {/* add comment  */}
          {user.role === "teacher" || user.role === "admin" ? (
            <></>
          ) : (
            <AddComment courseId={course._id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
