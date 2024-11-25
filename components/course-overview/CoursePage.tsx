import { AccessTimeOutlined, PlayCircleOutlined } from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";

import React from "react";
import CourseCard from "./CourseCard";
import DynamicVideoPlyr from "./DynamicVideoPlyr";
import { Course } from "@/types/course";

type Props = {
  id: string;
};
export const CoursePage = async ({ id }: Props) => {
  const res = await fetch(`${process.env.BACK_URL}/api/courses/${id}`);
  const data = await res.json();
  const course: Course = data.course;
  const instructor = course.instructor;

  console.log(3600/60)


  return (
    <div className="mt-6 flex  flex-row-reverse justify-between gap-7 px-3 ">
      {/* Course Card */}
      <CourseCard />
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
        <DynamicVideoPlyr videoSrc={course.videos[0].url}/>
        {/* description Course */}
        <div className="my-4">
          <h1 className="apply-fonts-medium  text-lg mb-2">وصف الدورة</h1>
          <p className="apply-fonts-normal text-[14px] text-courseTextSection leading-8 pl-5 xs:line-clamp-4  md:line-clamp-6">
            {course.description}
          </p>
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
                  30
                  <span className="apply-fonts-normal text-[13px]">ساعة</span>
                </h1>
              </div>
            </div>
          </div>
          <div>video overView</div>
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
              course.reviews.map((review) => {
                return (
                  <div key={review.id} className="border-b pb-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src={review.user.thumbnail || "/imgs/personImg.png"}
                        alt="teacher-username"
                        width={150}
                        height={150}
                        className="rounded-full xs:w-12 xs:h-12"
                      />
                      <div className="flex flex-col gap-1 ">
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
                    <div dir="rtl" className=" mt-1 mx-3">
                      <p className="p-2 apply-fonts-normal text-[14px] text-courseTextSection">
                        {review.content}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className=" apply-fonts-medium text-courseTextSection text-center lg:text-xl sm:text-lg xs:text-base">
                لا توجد تعليقات
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
