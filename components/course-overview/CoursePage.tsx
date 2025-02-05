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
import DynamicVideoPlyr from "./DynamicVideoPlyr";
import AddReview from "./Reviews/AddReview";
import { useEffect, useState } from "react";
import { useCourse } from "@/store/courseStore";
import Spinner from "../spinner/Spinner";
import { useUserStore } from "@/store/userStore";

type Props = {
  id: string;
};
export const CoursePage = ({ id }: Props) => {
  const { course, setCourse } = useCourse();
  const { user } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCourse = async (courseId: string) => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}`,
          {
            cache: "no-store",
          }
        );
        const data = await res.json();
        setCourse(data.course);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setLoading(false);
      }
    };
    getCourse(id);
  }, [id, setCourse]);
  const instructor = course.instructor;

  return (
    <div className="mt-6 flex  flex-row-reverse justify-between gap-7 px-3 ">
      {/* Course Card */}
      <CourseCard
        id={id}
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

        <DynamicVideoPlyr videoSrc={course.videos[0]?.url} />

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
                  {course.videos.length}
                  <span className="apply-fonts-normal text-[13px]">درس</span>
                </h1>
              </div>
              <div className="flex  items-center gap-1">
                <AccessTimeOutlined className="text-courseIconsSection" />
                <h1 className="flex  items-center">
                  {/* added after time */}
                  {(course.duration / 3600).toFixed(5)}
                  <span className="apply-fonts-normal text-[13px]">ساعة</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="">
            <table className="table-auto w-full  ">
              <tbody>
                {course.videos.map((video) => (
                  <tr
                    key={video._id}
                    className="bg-white hover:bg-gray-50 transition"
                  >
                    {/* زر التشغيل */}
                    <td className="px-4 py-2 text-right">
                      <button className="text-mainColor hover:text-mainColorHover transition">
                        <PlayArrow />
                      </button>
                    </td>

                    {/* اسم الدرس */}
                    <td className="px-4 py-2 text-right apply-fonts-normal">
                      {video.lessonTitle}
                    </td>

                    {/* مدة الدرس */}
                    <td className="px-4 py-2 text-right text-gray-600">
                      {(Number(video.duration) / 60).toFixed(3)} دقيقة
                    </td>
                  </tr>
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
            {loading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <Spinner />
              </div>
            ) : course.reviews.length > 0 ? (
              course.reviews.map((review) => {
                return (
                  <div key={review._id} className="border-b pb-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src={review.user.thumbnail || "/imgs/personImg.png"}
                        alt="teacher-username"
                        width={150}
                        height={150}
                        className="rounded-full xs:w-12 xs:h-12"
                      />
                      <div className="flex flex-col gap-1">
                        <h1 className="font-semibold">imad</h1>
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
                    <div dir="rtl" className="mt-1 mx-3">
                      <p className="p-2 apply-fonts-normal text-[14px] text-courseTextSection">
                        {review.content}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="apply-fonts-medium text-courseTextSection text-center lg:text-xl sm:text-lg xs:text-base">
                لا توجد تعليقات
              </h1>
            )}
          </div>
        </div>

        {/* add review */}

        {user.role === "teacher" ? <></> : <AddReview courseId={id} />}
      </div>
    </div>
  );
};
