"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  CloseOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { useUserStore } from "@/store/userStore";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBarHome = () => {
  const [menuToggle, setMenuToggle] = useState<boolean | null>(null);
  const [userMenuToggle, setUserMenuToggle] = useState<boolean | null>(null);

  const handleColseToggle = () => {
    setMenuToggle(false);
  };
  const handleColseAndOpenUserToggle = () => {
    setUserMenuToggle(!userMenuToggle);
  };
  const handleOpenToggle = () => {
    setMenuToggle(true);
  };
  const loading = useUserStore((state) => state.loading);

  const user = useUserStore((state) => state.user);

  const role = user.role === "student" ? "user" : user.role;

  const handleLogout = () => {
    Cookie.remove("token");
    toast.success("logout succes ", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: "bg-white text-black dark:bg-gray-800 dark:text-white",
    });
    setUserMenuToggle(false);
    window.location.reload();
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

      {loading ? (
        <div className="flex justify-center items-center">
          {/* Spinner */}
          <div className="w-8 h-8 border-2 border-t-transparent border-mainColor rounded-full animate-spin"></div>
        </div>
      ) : user._id !== "" ? (
        <div className="relative flex gap-2">
          <div className="w-12 h-12 rounded-full border-2 border-mainColor">
            <button
              className="w-full h-full"
              onClick={handleColseAndOpenUserToggle}
            >
              <Image
                src={user.thumbnail ? user.thumbnail : "/imgs/personImg.png"}
                width={100}
                height={100}
                className="w-full h-full rounded-full"
                alt={`img-${user._id}`}
              />
            </button>
          </div>
          <button className="md:hidden" onClick={handleOpenToggle}>
            <MenuOutlined fontSize="large" />
          </button>
          {userMenuToggle && (
            <div className="absolute top-12 -left-5 flex flex-col gap-2 bg-mainColor py-2 px-2 rounded-md">
              <Link
                href={`/dashboard-${role}`}
                className="hoverEle rounded-2xl hover:bg-redColorHoverLight border px-2 py-1 border-redColor text-white hover:text-white text-[14px] apply-fonts-normal text-center"
              >
                الرئيسية
              </Link>
              <Link
                href={`/dashboard-${role}/courses`}
                className="hoverEle rounded-2xl hover:bg-redColorHoverLight border px-2 py-1 border-redColor text-white hover:text-white text-[14px] apply-fonts-normal text-center"
              >
                دوراتي
              </Link>
              <button
                onClick={handleLogout}
                className="hoverEle rounded-2xl hover:bg-redColorHoverLight bg-redColor text-white apply-fonts-normal text-[14px] text-center"
              >
                <LogoutOutlined />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row-reverse items-center xs:gap-2 xs:flex-grow xs:justify-cneter md:flex-grow-0">
          <button className="md:hidden" onClick={handleOpenToggle}>
            <MenuOutlined fontSize="large" />
          </button>
          <Link
            href={"/login"}
            className="hoverEle hover:bg-mainColorHoverLight bg-mainColor xs:text-base md:text-[20px] apply-fonts-normal text-white xs:py-2 xs:px-3 md:py-2 md:px-5 rounded-3xl text-center"
          >
            تسجيل الدخول
          </Link>
          <Link
            href={"/signup"}
            className="xs:text-base md:text-[20px] apply-fonts-normal font-light rounded-3xl text-center"
          >
            إنشاء حساب
          </Link>
        </div>
      )}

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
            <ScrollLink
              to={"testimonials"}
              className="hover:custom-before-nav relative text-lg cursor-pointer"
            >
              اراء التلاميذ
            </ScrollLink>
            <ScrollLink
              to={"courses"}
              className="hover:custom-before-nav relative text-lg cursor-pointer"
            >
              الدورات
            </ScrollLink>
            <Link
              href={"/"}
              className="hover:custom-before-nav relative text-lg cursor-pointer"
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
