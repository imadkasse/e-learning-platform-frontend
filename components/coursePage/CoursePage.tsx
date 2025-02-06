"use client";
import { DescriptionOutlined, LoginOutlined } from "@mui/icons-material";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import CourseCardDetails from "./CourseCardDetails";
import { Course } from "@/types/course";
import DynamicVideoPlyr from "./DynamicVideoPlyr";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import Spinner from "../spinner/Spinner";
import { useLesson } from "@/store/lessonStore";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import { Reply } from "./comments and replies/Reply";
import AddComment from "./comments and replies/AddComment";
import AddReply from "./comments and replies/AddReply";

const CoursePage = ({ courseId }: { courseId: string }) => {
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

  const [course, setCourse] = useState<Course>();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const getCourse = async (courseId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    setCourse(data.course);
  };

  useEffect(() => {
    getCourse(courseId);
  }, [courseId]);

  //set first lesson
  useEffect(() => {
    setLesson(
      course?.videos[0] || {
        _id: "",
        lessonTitle: "",
        url: "",
        duration: 0,
        isCompleted: false,
        completedBy: [],
        comments: [],
      }
    );
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
    redirect(`/course-overview/${courseId}`);
    // return (
    //   <div className="my-5 flex flex-col items-center justify-center min-h-screen text-center bg-red-50 border border-red-300 rounded-lg p-6">
    //     <h2 className="apply-fonts-medium text-xl text-red-600">
    //       لم يتم تسجيلك في هذه الدورة!
    //     </h2>
    //     <p className="apply-fonts-normal text-gray-700 mt-2">
    //       يرجى شراء الدورة للوصول إلى محتواها.
    //     </p>
    //     <Link
    //       href={`/course-overview/${courseId}`}
    //       className="mt-4 bg-mainColor hover:bg-mainColorHoverLight text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-300"
    //     >
    //       شراء الدورة الآن
    //     </Link>
    //   </div>
    // );
  }
  if (user.role === "teacher" && !isPublichedCourse) {
    redirect(`/dashboard-teacher/courses`);
  }
  //section comments
  return (
    <div className="mt-6 flex  flex-row-reverse justify-between gap-7 px-3 ">
      {/* Course Details */}

      <CourseCardDetails
        courseVideos={course?.videos}
        courseId={course?._id}
        userId={user._id}
      />
      {/* Show Course */}
      <div className="lg:custom-width-Course ">
        {/* Welcome video */}
        <DynamicVideoPlyr videoSrc={lesson?.url || ""} />
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
            وصف الدورة
          </h1>
          <p className="apply-fonts-normal text-[14px] text-courseTextSection leading-8 pl-5 xs:line-clamp-4  md:line-clamp-6">
            {course?.description}
          </p>
        </div>
        {/* Course Fiels */}
        <div className="my-4">
          <h1 className="apply-fonts-medium  xs:text-lg lg:text-2xl mb-2">
            ملفات الدورة
          </h1>
          <div className="flex flex-col gap-3">
            {course?.files ? (
              course?.files.map((file) => {
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
                        <h1 className="text-md font-medium">{file.filename}</h1>
                        <p className="text-courseTextSection" dir="">
                          {(Number(file.size) / 1024 / 1024).toFixed(2)}MB
                        </p>
                      </div>
                    </div>

                    <div>
                      <a
                        href={file.url}
                        download={true}
                        className="apply-fonts-normal py-2 px-3 bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white "
                      >
                        تحميل الملف
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
            {lesson?.comments ? (
              lesson?.comments.map((comment) => {
                return (
                  <div key={comment._id} className="border-b pb-3">
                    {/* معلومات المستخدم */}
                    <div className="flex items-center gap-2">
                      <Image
                        src={comment.user.thumbnail || "/imgs/logoImg.png"}
                        alt="user-username"
                        width={40}
                        height={40}
                        className="rounded-full xs:w-12 xs:h-12"
                      />
                      <div className="flex flex-col gap-1">
                        <h1 className="font-semibold">
                          {comment.user.username}
                        </h1>
                      </div>
                      <h1 className="text-xl px-1">|</h1>
                      <div>
                        <h1 className="font-bold">
                          {comment.createdAt.split("T")[0]}
                        </h1>
                      </div>
                    </div>

                    {/* نص التعليق */}
                    <div dir="rtl" className="mt-1 mx-3">
                      <p className="p-2 apply-fonts-normal text-[14px] text-courseTextSection">
                        {comment.text}
                      </p>
                    </div>
                    {/* Add Reply to student */}

                    {user.role === "student" ? (
                      <></>
                    ) : (
                      <AddReply commentId={comment._id} />
                    )}
                    {/* عرض الردود */}

                    {comment.replies && comment.replies.length > 0 && (
                      <Reply replys={comment.replies} />
                    )}
                  </div>
                );
              })
            ) : (
              <h1 className="apply-fonts-normal">لاتوجد أي تعليقات </h1>
            )}
          </div>

          {/* add comment  */}
          {user.role === "teacher" || user.role === "admin" ? (
            <></>
          ) : (
            <AddComment courseId={courseId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
