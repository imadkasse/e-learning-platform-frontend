"use client";
import { useLesson } from "@/store/lessonStore";
import showToast from "@/utils/showToast";
import { ChatBubbleOutline } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { FormEvent, useState } from "react";

const AddReply = ({ commentId }: { commentId: string }) => {
  const token = Cookies.get("token");
  const { lesson, setLesson } = useLesson();
  const [showAddReply, setShowAddReply] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const addReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/comments/${commentId}/replies`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newReplies = res.data.comment.replies;
      setLesson({
        ...lesson,
        comments: lesson.comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                replies: newReplies,
              }
            : comment
        ),
      });

      showToast("success", "تم إضافة الرد");

      setShowAddReply(false);
    } catch (error) {
      //@ts-expect-error : fix agin
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => {
          setShowAddReply(!showAddReply);
        }}
        className="flex items-center gap-1 border px-1 rounded-xl "
      >
        <p className="p-2 apply-fonts-normal text-[14px] text-courseTextSection">
          الرد
        </p>
        <ChatBubbleOutline
          fontSize="small"
          className="text-courseTextSection"
        />
      </button>
      {showAddReply && (
        <div className="fixed bg-black/40 w-full h-full top-0 right-0 flex justify-center items-center z-30">
          <form
            className="bg-white p-5 rounded-lg shadow-lg w-96"
            onSubmit={addReply}
          >
            <h1 className="apply-fonts-normal text-lg font-semibold mb-4">
              يمكنك إضافة رد
            </h1>
            <textarea
              className="apply-fonts-normal w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-mainColor"
              rows={4}
              onChange={(e) => {
                setText(e.target.value);
              }}
              placeholder="أضف ردك هنا..."
            ></textarea>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="apply-fonts-normal px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 hoverEle"
                onClick={() => setShowAddReply(false)}
              >
                إلغاء
              </button>
              <button
                className={`apply-fonts-normal px-4 py-2 text-sm  text-white rounded-md  hoverEle ${
                  loading
                    ? "bg-mainColorHoverLight cursor-not-allowed"
                    : "bg-mainColor hover:bg-mainColorHoverLight"
                }`}
              >
                {loading ? "جاري الإرسال..." : "إرسال"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddReply;
