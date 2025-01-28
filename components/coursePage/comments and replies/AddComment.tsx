"use client";
import { useLesson } from "@/store/lessonStore";
import { useUserStore } from "@/store/userStore";
import showToast from "@/utils/showToast";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { FormEvent, useState } from "react";

interface Props {
  courseId: string;
}

const AddComment = ({ courseId }: Props) => {
  const token = Cookies.get("token");
  const { lesson, setLesson } = useLesson();
  const { user } = useUserStore();
  console.log(user);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handelAddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}/lessons/${lesson?._id}`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newComment = res.data.comment;

      showToast("success", "تم إضافة التعليق بنجاح");
      setLesson({
        ...lesson,
        comments: [...(lesson?.comments || []), newComment],
      });
    } catch (error) {
      //@ts-expect-error:fix ading
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex w-full gap-3 my-5" onSubmit={handelAddComment}>
      <button
        type="submit"
        className={`apply-fonts-normal rounded-lg py-2 px-4  hoverEle text-white ${
          loading
            ? "bg-mainColorHoverLight cursor-not-allowed"
            : "bg-mainColor hover:bg-mainColorHoverLight"
        } `}
      >
        {loading ? "...جاري النشر" : "نشر"}
      </button>
      <div className="flex-grow">
        <label className="relative ">
          <div className="absolute top-0">
            <ChatBubbleOutlineOutlined className=" text-courseTextSection mx-1" />
          </div>
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="w-full text-courseTextSection rounded-xl  px-7 py-2 border-2 border-gray-400 focus:border-mainColor focus:outline-none"
          />
        </label>
      </div>
    </form>
  );
};

export default AddComment;
