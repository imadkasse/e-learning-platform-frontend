import Image from "next/image";
import React from "react";

const MyInfo = () => {
  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 min-h-screen  ">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">معلوماتي</h1>
      </div>
      <div className="hover:cursor-pointer">
        <div className="mt-5 flex items-center  justify-between bg-wygColor shadow-lg shadow-mainColor py-2 px-4 rounded-lg ">
          <div className="">
            <Image
              src={"/imgs/personImg.png"}
              alt="personImg"
              width={100}
              height={100}
              className="rounded-full border-2 border-mainColor"
            />
          </div>
          <div>
            <h1 className="apply-fonts-medium text-xl"> الإسم: عبد الله </h1>
            <h1 className="apply-fonts-medium text-xl"> اللقب: عبد الله </h1>
          </div>
          <div>
            <p className=" text-sm text-gray-400">
              <span className="apply-fonts-normal">تاريخ الميلاد : </span>
              12/02/1990
            </p>
            <p className=" text-sm text-gray-400">
              <span className="apply-fonts-normal"> رقم الهاتف : </span>
              066626468
            </p>
            <p className=" text-sm text-gray-400">
              <span className="apply-fonts-normal">البريد الإلكتروني : </span>
              email@example.com
            </p>
            <p className=" text-sm text-gray-400">
              <span className="apply-fonts-normal"> الدور : أستاذ </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
