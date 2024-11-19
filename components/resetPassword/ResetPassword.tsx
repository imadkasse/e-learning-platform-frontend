"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ResetPassword = () => {
  return (
    <div>
      <div className="container mx-auto py-4  h-[70vh] w-full flex items-center justify-center flex-col">
        <Link
          href={"/"}
          className="flex items-center flex-row-reverse  md:gap-3 mb-4"
        >
          <Image
            src="/imgs/logoImg.png"
            alt="logoImg"
            className="md:w-14 md:h-14 xs:w-12 xs:h-12 "
            width={150}
            height={150}
          />
          <h1 className="md:text-xl xs:text-base font-semibold xs:hidden lg:block">
            Sience Academie
          </h1>
        </Link>

        <form className="space-y-4 font-[sans-serif] max-w-md mx-auto  w-full ">
          <input
            type="email"
            required
            placeholder="البريد الإلكتروني"
            className={`  w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent  rounded 
            `}
          />

          <button
            type="submit"
            className={`apply-fonts-normal !my-4 w-full px-4 py-2.5 mx-auto block text-sm bg-mainColor  text-white hoverEle rounded hover:bg-mainColorHoverLight `}
          >
            إعادة كلمة السر
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
