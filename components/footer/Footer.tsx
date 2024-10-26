"use client";
import { FacebookRounded, Instagram, YouTube } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full  bg-mainColor text-white py-8 flex flex-col mt-12">
      <div className="container mx-auto flex items-center justify-between border-b-2 ">
        <Link
          href={`/`}
          className="flex items-center flex-row-reverse  md:gap-3"
        >
          <Image
            src="/imgs/logoImg.png"
            alt="logoImg"
            className="md:w-14 md:h-14 xs:w-12 xs:h-12 "
            width={150}
            height={150}
          />
          <h1 className="md:text-xl xs:text-base font-light xs:hidden lg:block">
            Sience Academie
          </h1>
        </Link>
        <div className="flex gap-5 ">
          <h1 className="apply-fonts-normal sm:block xs:hidden">
            تابعنا على مواقع التواصل الاجتماعي
          </h1>
          <div className="flex gap-1">
            <Link href={"/"}>
              <FacebookRounded />
            </Link>
            <Link href={"/"}>
              <YouTube />
            </Link>
            <Link href={"/"}>
              <Instagram />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto  mt-10 flex justify-center">
        <p className="text-gray-200 text-sm  " dir="ltr">
          © Sience Academie. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
