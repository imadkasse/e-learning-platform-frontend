"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CloseOutlined, MenuOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
const NavBarHome = () => {
  const [menuToggle, setMenuToggle] = useState<boolean | null>(null);
  const handleColseToggle = () => {
    setMenuToggle(false);
  };
  const handleOpenToggle = () => {
    setMenuToggle(true);
  };
  return (
    <div className="h-[80px] flex items-center justify-around  ">
      <Link href={`/`} className="flex items-center flex-row-reverse  md:gap-3">
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

      <nav className="md:flex xs:hidden  apply-fonts-normal  items-center justify-center gap-6 flex-grow  ">
        <ScrollLink
          to="testimonials"
          smooth={true}
          duration={500}
          className="hover:custom-before-nav  relative cursor-pointer "
        >
          اراء التلاميذ
        </ScrollLink>
        <ScrollLink
          to="courses"
          smooth={true}
          duration={500}
          className="hover:custom-before-nav  relative cursor-pointer "
        >
          الدورات
        </ScrollLink>
        <Link href={"/"} className="hover:custom-before-nav  relative">
          تواصل معنا
        </Link>
      </nav>

      <div className="flex flex-row-reverse xs:gap-2 xs:flex-grow xs:justify-cneter md:flex-grow-0 ">
        <button className="md:hidden" onClick={handleOpenToggle}>
          <MenuOutlined fontSize="large" />
        </button>
        <button className="hoverEle hover:bg-mainColorHoverLight  bg-mainColor xs:text-base  md:text-[20px] apply-fonts-normal  text-white xs:py-2 xs:px-3 md:py-2 md:px-5 rounded-3xl text-center">
          تسجيل الدخول
        </button>
        <button className="xs:text-base   md:text-[20px] apply-fonts-normal font-light rounded-3xl text-center">
          إنشاء حساب
        </button>
      </div>

      {menuToggle && (
        <motion.div
          className="w-full h-screen fixed z-50 top-0 bg-black/75 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex p-7">
            <button onClick={handleColseToggle} className="">
              <CloseOutlined
                className="text-red-700 hoverEle hover:rotate-180"
                fontSize="large"
              />
            </button>
          </div>
          <motion.nav
            className="flex flex-col items-center justify-start h-full apply-fonts-normal gap-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={"/"}
              className="hover:custom-before-nav relative text-lg"
            >
              اراء التلاميذ
            </Link>
            <Link
              href={"/"}
              className="hover:custom-before-nav relative text-lg"
            >
              الدورات
            </Link>
            <Link
              href={"/"}
              className="hover:custom-before-nav relative text-lg"
            >
              تواصل معنا
            </Link>
          </motion.nav>
        </motion.div>
      )}
    </div>
  );
};

export default NavBarHome;
