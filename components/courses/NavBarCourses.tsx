"use client";
import { BookOutlined, HomeOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBarCourses = () => {
  const pathName = usePathname();
  return (
    <div className="sticky top-3 z-20 bg-sideBarBgColo text-white  rounded-3xl flex items-center flex-row-reverse justify-between px-5 py-1">
      <Link href={`/`} className="flex items-center flex-row-reverse  md:gap-3">
        <Image
          src="/imgs/dashboard-user-imgs/logoDashUser.png"
          alt="logoImg"
          className="md:w-14 md:h-14 xs:w-6 xs:h-6 sm:w-12 sm:h-12  "
          width={150}
          height={150}
        />
        <h1 className="md:text-xl xs:text-base font-semibold xs:hidden lg:block">
          Sience Academie
        </h1>
      </Link>

      <div className="flex sm:gap-5 xs:gap-1 ">
        <Link
          href={"/"}
          className={`flex items-center gap-2 hover:bg-mainColor/50 hoverEle sm:py-2 sm:px-3 xs:p-1 xs:text-[12px] sm:text-base rounded-md ${
            pathName === "/course/asd" ? "bg-mainColor/50" : ""
          } `}
        >
          <HomeOutlined />
          <p className="apply-fonts-normal">الرئيسية</p>
        </Link>
        <Link
          href={"/courses"}
          className={`flex items-center gap-2 ${
            pathName === "/courses"
              ? "bg-mainColorHoverLight"
              : "bg-mainColor hover:bg-mainColorHoverLight"
          }   hoverEle sm:py-2 sm:px-3 xs:p-1 xs:text-[12px] sm:text-base rounded-md `}
        >
          <BookOutlined />
          <p className="apply-fonts-normal">الدورات</p>
        </Link>
      </div>
    </div>
  );
};

export default NavBarCourses;
