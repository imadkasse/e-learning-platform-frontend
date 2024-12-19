import { PlayLesson } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

type Props = {
  notifcationImg: string;
  notifcationName: string;
  notifcationDate: string;
  lessonNumber: number;
};

const NotificationCard = ({
  notifcationImg,
  notifcationName,
  notifcationDate,
  lessonNumber,
}: Props) => {
  return (
    <div className="w-full my-3 shadow-lg shadow-mainColor/60 bg-wygColor  flex gap-4 items-center  px-3 py-4 rounded-lg">
      <div>
        <Image
          src={notifcationImg}
          alt="NotifactionImg"
          width={250}
          height={250}
          className="rounded-lg w-32 h-24"
        />
      </div>
      <div className="flex flex-col justify-between h-20 ">
        <div>
          <h1 className="apply-fonts-medium text-base">{notifcationName}</h1>
        </div>
        <div className="flex  items-center gap-4">
          <div className="flex gap-1 items-center">
            <div className="text-mainColor">
              <PlayLesson />
            </div>
            <div className="flex items-center">
              <span className="apply-fonts-normal">درس</span>
              <p>:{lessonNumber}</p>
            </div>
          </div>
          <div>
            <p>{notifcationDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
