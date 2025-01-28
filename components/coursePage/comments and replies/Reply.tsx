"use client";
import { User } from "@/types/user";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";

interface Replay {
  _id: string;
  user: User;
  createdAt: string;
  text: string;
}

export const Reply = ({ replys }: { replys: Replay[] }) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  console.log(replys);
  return (
    <>
      <button
        onClick={() => {
          setShowComments(!showComments);
        }}
        className="p-2 apply-fonts-normal text-[14px] text-courseTextSection flex gap-1"
      >
        {showComments ? (
          <>
            <KeyboardArrowUpRounded />
            <p>إخفاء الردود</p>
          </>
        ) : (
          <>
            <KeyboardArrowDownRounded />
            <p>عرض الردود</p>
          </>
        )}
      </button>
      {showComments && (
        <div className="mt-3 ml-10 space-y-4">
          {replys.map((reply) => (
            <div key={reply._id} className="flex items-start gap-2 mt-3 mr-10">
              <Image
                src={reply.user.thumbnail || "/imgs/logoImg.png"}
                alt="user-username"
                width={40}
                height={40}
                className="rounded-full xs:w-8 xs:h-8"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold">{reply.user.username}</h1>
                  <span className="text-sm text-gray-500">
                    {reply.createdAt.split("T")[0]}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{reply.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
