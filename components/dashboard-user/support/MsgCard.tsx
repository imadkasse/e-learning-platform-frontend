"use client";
import axios from "axios";
import React, {  useState } from "react";
import showToast from "@/utils/showToast";
import { useFaq } from "@/store/faqStore";
import { replie } from "@/types/faq";

type Props = {
  subject: string;
  faqId: string;
  date: string;
  replies: replie[];
};
const MsgCard = ({ subject, date, faqId, replies }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { faqs, setFaqs } = useFaq();
  const handelDeleteFaq = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/faq/${faqId}`,
        {
                   withCredentials:true
        }
      );
      showToast("success", "تم حذف الرسالة بنجاح");
      setFaqs(faqs.filter((f) => f._id !== faqId));
    } catch (error) {
      console.error(error);
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    }
  };


  return (
    <>
      {replies.length > 0 ? (
        replies.map((reply, i) => {
          return (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4 "
            >
              <h2 className="text-lg font-semibold apply-fonts-normal">
                الرد على <span className="text-">{subject}</span>
              </h2>

              <p className="text-sm text-gray-500">التاريخ:{date}</p>
              <p className="mt-2 text-gray-700 line-clamp-3">{reply.message}</p>
              <div className="flex justify-between apply-fonts-normal">
                <button
                  onClick={() => {
                    setExpanded(!expanded);
                  }}
                  className="mt-4 border-2 border-redColor text-black py-1 px-3 rounded hover:bg-redColorHoverLight hoverEle hover:text-white"
                >
                  حذف
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
      {expanded && (
        <div className="rounded-xl  bg-black/40 w-full h-screen fixed top-0  left-0 flex flex-col items-center justify-center  ">
          <div className="rounded-xl w-96  bg-wygColor py-3 px-5 flex flex-col gap-8">
            <h1 className="text-center apply-fonts-normal">
              هل تريد حذف هذه الرسالة ؟؟
            </h1>
            <div className="flex justify-center gap-4">
              <button
                className="px-3 py-2 apply-fonts-normal rounded-lg text-white hoverEle bg-mainColor  hover:bg-mainColorHoverLight "
                onClick={() => {
                  setExpanded(false);
                }}
              >
                إلغاء
              </button>
              <button
                className="px-3 py-2 apply-fonts-normal rounded-lg text-white hoverEle bg-redColor  hover:bg-redColorHoverLight "
                onClick={handelDeleteFaq}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MsgCard;
