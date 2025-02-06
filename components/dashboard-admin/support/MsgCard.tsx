"use client";
import showToast from "@/utils/showToast";
import { CloseOutlined } from "@mui/icons-material";
import axios from "axios";
import React, { FormEvent, useState } from "react";

import Cookies from "js-cookie";

type Props = {
  username: string;
  subject: string;
  description: string;
  date: string;
  ticketId: string;
};

const MsgCard = ({ username, subject, ticketId, date, description }: Props) => {
  const token = Cookies.get("token");
  const [replay, setReplay] = useState<string>("");
  const [showReplay, setShowReplay] = useState<boolean>(false);

  const handelReplay = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/faq/${ticketId}/reply`,
        {
          message: replay,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast("success", "تم الرد بنجاح");
    } catch (error) {
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    }
  };
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4 ">
        <h2 className="text-lg font-semibold apply-fonts-normal">{subject}</h2>

        <p className="text-sm text-gray-500 ">من:{username}</p>
        <p className="text-sm text-gray-500">التاريخ:{date}</p>
        <p className="mt-2 text-gray-700 line-clamp-3">{description}</p>
        <div className="flex justify-between apply-fonts-normal">
          <button className="mt-4 bg-redColor text-white py-1 px-3 rounded hover:bg-redColorHoverLight hoverEle ">
            حذف
          </button>
          <button
            onClick={() => {
              setShowReplay(!showReplay);
            }}
            className="mt-4 border-2 border-mainColor text-black py-1 px-3 rounded hover:bg-mainColorHoverLight hoverEle hover:text-white"
          >
            رد
          </button>
        </div>
      </div>
      {showReplay && (
        <div className="rounded-xl absolute bg-black/40 w-full h-full top-0 left-0 flex flex-col items-center justify-center  ">
          <div className="rounded-xl w-96  bg-wygColor py-3 px-5 flex flex-col gap-8">
            <button
              className="text-right "
              onClick={() => {
                setShowReplay(false);
              }}
            >
              <CloseOutlined className="text-redColor hoverEle hover:text-redColorHoverLight hover:rotate-180" />
            </button>
            <h1 className="text-center apply-fonts-normal">
              رد على الإستفسار المستخدم
              <span className="mx-2">({username})</span>
            </h1>
            <form onSubmit={handelReplay}>
              <div className="rounded-xl flex flex-col justify-center  gap-3 ">
                <textarea
                  id="replay-input"
                  name="replay-input"
                  value={replay}
                  onChange={(e) => setReplay(e.target.value)}
                  className="apply-fonts-normal border-2 border-gray-400 rounded-lg p-3 w-full"
                  placeholder="اكتب ردك هنا..."
                />
                <button
                  className="apply-fonts-normal mt-4 bg-mainColor text-white py-1 px-3 rounded hover:bg-mainColorHoverLight hoverEle"
                  type="submit"
                >
                  ارسل رد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MsgCard;
