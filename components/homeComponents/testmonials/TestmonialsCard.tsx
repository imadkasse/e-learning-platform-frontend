import { StarOutlined } from "@mui/icons-material";
import Image from "next/image";
import React from "react";

const TestmonialsCard = () => {
  return (
    <div className="border-2 border-mainColor w-[265px] h-[170px] px-5 py-4 rounded-lg flex flex-col gap-3" dir="rtl">
      <div className="flex flex-row-reverse justify-end gap-2">
        <div>
          <div className="flex  gap-2">
            <button className="apply-fonts-test  bg-mainColor text-white px-1  rounded-md text-[14px]">
              BAC 17
            </button>
            <button className="flex flex-row-reverse gap-1  bg-starColor items-center px-1 rounded-md">
              <StarOutlined className="text-starIconColor " fontSize="small" />
              <p className="text-startTextColor text-[14px]">4.9</p>
            </button>
          </div>
          <h1 className="apply-fonts-test font-semibold text-base">
            Cody Fisher
          </h1>
          <p className="apply-fonts-normal text-gray-400 text-[16px]">تلميذ</p>
        </div>
        <div className="w-16 h-16 ">
          <Image
            src={"/imgs/personImg.png"}
            alt="personImg"
            width={100}
            height={100}
            className="w-full h-full rounded-xl"
          />
        </div>
      </div>
      <p className="apply-fonts-normal font-extralight flex justify-end">
        “منصة جد مفيدة الخ الخالخ الخاخلخالخ”
      </p>
    </div>
  );
};

export default TestmonialsCard;
