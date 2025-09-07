"use client";
import { useCourse } from "@/store/courseStore";
import { useUserStore } from "@/store/userStore";
import showToast from "@/utils/showToast";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import { Rating } from "@mui/material";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";

const AddReview = ({ courseId }: { courseId: string }) => {
  const [rating, setRating] = useState<number>();
  const [content, setContent] = useState<string>("");
  const { user } = useUserStore();
  const { course, setCourse } = useCourse();

  useEffect(() => {
    const getCourse = async (courseId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}`
      );
      const data = await res.json();
      setCourse(data.course);
    };
    getCourse(courseId);
  }, [courseId, setCourse]);

  // section reviews (Add & delete)
  const handelAddReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast("error", "يجب تسجيل الدخول أولا");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/reviews/${courseId}`,
        {
          rating,
          content,
        },
        {
          withCredentials: true,
        }
      );
      const newReivew = res.data.review;
      showToast("success", "تم اضافة التعليق بنجاح");

      setContent("");
      setRating(0);

      setCourse({
        ...course,
        reviews: [...(course.reviews || []), newReivew],
      });
    } catch (error) {
      //@ts-expect-error:fix agin
      showToast("error", error.response.data.message);
    }
  };
  return (
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
  );
};

export default AddReview;
