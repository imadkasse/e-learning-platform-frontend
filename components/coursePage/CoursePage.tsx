"use client";
import {
  ChatBubbleOutlineOutlined,
  DescriptionOutlined,
  LoginOutlined,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import CourseCardDetails from "./CourseCardDetails";
import { Course } from "@/types/course";
import DynamicVideoPlyr from "./DynamicVideoPlyr";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import Spinner from "../spinner/Spinner";
import { useLesson } from "@/store/lessonStore";
import "react-toastify/dist/ReactToastify.css";
import showToast from "@/utils/showToast";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const CoursePage = ({ courseId }: { courseId: string }) => {
  const token = Cookies.get("token");
  const { lesson, setLesson } = useLesson();

  const [isEnrolled, setIsEnrolled] = useState<boolean | undefined>(undefined);
  const [rating, setRating] = useState<number>();
  const [content, setContent] = useState<string>("");

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
      }
    );
  }, [setLesson, course]);

  useEffect(() => {
    if (user._id && course) {
      const enrollmentStatus = checkIsEnrolledCourse(user._id, course);
      setIsEnrolled(enrollmentStatus);
    } else {
      setIsEnrolled(undefined);
    }
  }, [user._id, course]);

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
  //add spinner
  if (isEnrolled === undefined) {
    return <Spinner />;
  }

  //check is user buying course
  if (!isEnrolled) {
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

  // section reviews (Add & delete)
  const handelAddReview = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/reviews/${courseId}`,
        {
          rating,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newReivew = res.data.review;
      showToast("success", "تم اضافة التعليق بنجاح");

      setContent("");
      setRating(0);

      setCourse((prevCourse) => {
        if (!prevCourse) return undefined;
        return {
          ...prevCourse,
          reviews: [...prevCourse.reviews, newReivew],
        };
      });

      await getCourse(courseId);
    } catch (error) {
      //@ts-expect-error:fix agin
      showToast("error", error.response.data.message);
    }
  };
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
                تعليق
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

        {/* stduents reviews */}
        <div className="mt-5">
          <h1 className="mb-8 flex items-center gap-1">
            <span className="apply-fonts-medium  xs:text-lg lg:text-2xl">
              التعليقات
            </span>
            <p className="font-bold text-courseTextSection">
              ({course?.reviews.length})
            </p>
          </h1>

          <div className="flex flex-col gap-5">
            {course?.reviews ? (
              course?.reviews.map((review) => {
                return (
                  <div key={review._id} className="border-b pb-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src={review.user.thumbnail}
                        alt="teacher-username"
                        width={150}
                        height={150}
                        className="rounded-full xs:w-12 xs:h-12"
                      />
                      <div className="flex flex-col gap-1 ">
                        <h1 className="font-semibold">
                          {review.user.username}
                        </h1>
                        <Rating
                          className="text-courseStarColor"
                          dir="ltr"
                          name="half-rating-read"
                          value={review.rating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                      </div>
                      <h1 className="text-xl px-1">|</h1>
                      <div>
                        <h1 className="font-bold">
                          {review.createdAt.split("T")[0]}
                        </h1>
                      </div>
                    </div>
                    <div dir="rtl" className=" mt-1 mx-3">
                      <p className="p-2 apply-fonts-normal text-[14px] text-courseTextSection">
                        {review.content}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="apply-fonts-normal">لاتوجد أي تعليقات </h1>
            )}
          </div>
          {/* add review  */}
          <form className="flex w-full gap-3 my-5" onSubmit={handelAddReview}>
            <button
              type="submit"
              className="apply-fonts-normal rounded-lg py-2 px-4 bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white "
            >
              نشر
            </button>
            <div className="flex-grow">
              <label className="relative ">
                <div className="absolute top-0">
                  <ChatBubbleOutlineOutlined className=" text-courseTextSection mx-1" />
                </div>
                <div className="absolute top-0 left-0">
                  <Rating
                    dir="ltr"
                    precision={0.5}
                    value={rating}
                    onChange={(e) => {
                      //@ts-expect-error:fix agin
                      setRating(e.target.value);
                    }}
                    className=" text-courseStarColor mx-1"
                  />
                </div>
                <input
                  type="text"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  className="w-full text-courseTextSection rounded-xl  px-7 py-2 border-2 border-gray-400 focus:border-mainColor focus:outline-none"
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
