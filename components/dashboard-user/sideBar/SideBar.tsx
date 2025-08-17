"use client";
import {
  ArrowBackIos,
  ArrowForwardIos,
  ContactSupportOutlined,
  HomeOutlined,
  LogoutOutlined,
  NotificationsOutlined,
  PersonOutlineOutlined,
  PlayLessonOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";

const SideBar = () => {
  const router = useRouter();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { setUser } = useUserStore();
  const handleToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };
  const pathName = usePathname();

  const handleLogout = () => {
    Cookies.remove("token");
    setUser({
      _id: "",
      username: "",
      email: "",
      role: null,
      active: false,
      progress: [],
      thumbnail: "",
      enrolledCourses: [],
      phoneNumber: "",
      publishedCourses: [],
      notifications: [],
    });
    router.push("/");
  };

  return (
    <>
      {/* in the small screen */}
      <div
        className={`bg-sideBarBgColo text-white py-4   mb-2 px-3 rounded-xl h-[94vh] transition-all duration-300 ease-in-out ${
          toggleSidebar ? `w-[300px] ` : `w-[0px]`
        }  lg:hidden sm:sticky xs:fixed  top-2 xs:right-1   z-10  xs:flex flex-col justify-around`}
      >
        <button
          onClick={handleToggle}
          className="lg:hidden  rounded-full text-black   flex items-center justify-center  "
        >
          {toggleSidebar ? (
            <ArrowForwardIos className="text-xl font-bold text-mainColor m-2 " />
          ) : (
            <ArrowBackIos className=" m-2 text-xl font-bold text-mainColor" />
          )}
        </button>
        <div className={`${toggleSidebar ? "block" : "hidden"} `}>
          <div className="w-full flex justify-center mb-5">
            <Link
              href={`/`}
              className="flex items-center flex-row-reverse   md:gap-3"
            >
              <Image
                src="/imgs/dashboard-user-imgs/logoDashUser.png"
                alt="logoImg"
                className="md:w-14 md:h-14 xs:w-12 xs:h-12 "
                width={150}
                height={150}
              />
              <h1 className="md:text-xl xs:text-base font-semibold xs:hidden lg:block">
                Sience Academie
              </h1>
            </Link>
          </div>
          <nav className="apply-fonts-normal w-full  flex justify-center">
            <div className="list-none text-[14px] w-[200px]">
              <Link
                href={`/dashboard-user`}
                className={` flex items-center gap-4 py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-user" ? "bg-mainColor/50" : ""
                }  my-2`}
              >
                <HomeOutlined />
                <p>الرئيسية</p>
              </Link>
              <Link
                href={`/dashboard-user/courses`}
                className={` flex items-center gap-5 py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-user/courses"
                    ? "bg-mainColor/50"
                    : ""
                }  my-2`}
              >
                <PlayLessonOutlined />
                <p>الدورات</p>
              </Link>
              <Link
                href={`/dashboard-user/notification`}
                className={` flex items-center gap-5 py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-user/notification"
                    ? "bg-mainColor/50"
                    : ""
                }  my-2`}
              >
                <NotificationsOutlined />
                <p>الإشعارات</p>
              </Link>
            </div>
          </nav>
        </div>
        <nav
          className={`apply-fonts-normal w-full  flex justify-center ${
            toggleSidebar ? "block" : "hidden"
          }`}
        >
          <ul className="list-none text-base w-[200px]">
            {/* user info (remove in this time) */}
            {/* <Link
              href={`/dashboard-user/my-info`}
              className={` flex items-center gap-5 py-2 px-2 rounded-xl hoverEle hover:bg-mainColor/50 my-2 ${
                pathName === "/dashboard-user/my-info" ? "bg-mainColor/50" : ""
              } `}
            >
              <PersonOutlineOutlined />
              <p>معلوماتي</p>
            </Link> */}
            <Link
              href={`/dashboard-user/support`}
              className={` flex items-center gap-5 py-2 px-2 rounded-xl hoverEle hover:bg-mainColor/50 my-2 ${
                pathName === "/dashboard-user/support" ? "bg-mainColor/50" : ""
              } `}
            >
              <ContactSupportOutlined />
              <p>الدعم</p>
            </Link>
            <Link
              href={`/dashboard-user/settings`}
              className=" flex items-center gap-5 py-2 px-2 rounded-xl hoverEle hover:bg-mainColor/50 my-2"
            >
              <SettingsOutlined />
              <p>الإعدادات</p>
            </Link>
            <button
              onClick={handleLogout}
              className="group w-full flex items-center gap-5 py-2 px-2 rounded-xl hoverEle hover:bg-red-800/50 my-2"
            >
              <LogoutOutlined className="text-red-700 group-hover:text-white hoverEle" />
              <p>تسجيل الخروج</p>
            </button>
          </ul>
        </nav>
      </div>
      {/* in the large screen */}
      <div className="bg-sideBarBgColo text-white py-4  px-3 rounded-xl h-full lg:w-[300px]  xs:hidden lg:sticky lg:top-2  lg:flex flex-col justify-between">
        <div>
          <div className="w-full flex justify-center mb-5">
            <Link
              href={`/`}
              className="flex items-center flex-row-reverse   md:gap-3"
            >
              <Image
                src="/imgs/dashboard-user-imgs/logoDashUser.png"
                alt="logoImg"
                className="md:w-12 md:h-12 xs:w-12 xs:h-12 "
                width={150}
                height={150}
              />
              <h1 className="lg:text-[15px]  font-semibold xs:hidden lg:block">
                Sience Academie
              </h1>
            </Link>
          </div>
          <nav className="apply-fonts-normal w-full  flex justify-center">
            <div className="list-none text-[14px] w-[200px]">
              <Link
                href={`/dashboard-user`}
                className={` flex items-center gap-5 py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-user" ? "bg-mainColor/50" : ""
                }  my-2`}
              >
                <HomeOutlined />
                <p>الرئيسية</p>
              </Link>
              <Link
                href={`/dashboard-user/courses`}
                className={` flex items-center gap-5 py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-user/courses"
                    ? "bg-mainColor/50"
                    : ""
                } my-2`}
              >
                <PlayLessonOutlined />
                <p>الدورات</p>
              </Link>
              <Link
                href={`/dashboard-user/notification`}
                className={`flex items-center gap-5 py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-user/notification"
                    ? "bg-mainColor/50"
                    : ""
                } my-2`}
              >
                <NotificationsOutlined />
                <p>الإشعارات</p>
              </Link>
            </div>
          </nav>
        </div>
        <nav className="apply-fonts-normal w-full  flex justify-center">
          <div className="list-none text-[14px] w-[200px]">
            {/* user info (remove in this time) */}
            {/* <Link
              href={`/dashboard-user/my-info`}
              className={` flex items-center gap-5 py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                pathName === "/dashboard-user/my-info" ? "bg-mainColor/50" : ""
              } my-2`}
            >
              <PersonOutlineOutlined />
              <p>معلوماتي</p>
            </Link> */}
            <Link
              href={`/dashboard-user/support`}
              className={` flex items-center gap-5 py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                pathName === "/dashboard-user/support" ? "bg-mainColor/50" : ""
              } my-2`}
            >
              <ContactSupportOutlined />
              <p>الدعم</p>
            </Link>
            <Link
              href={`/dashboard-user/settings`}
              className={` flex items-center gap-5 py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                pathName === "/dashboard-user/settings" ? "bg-mainColor/50" : ""
              } my-2`}
            >
              <SettingsOutlined />
              <p>الإعدادات</p>
            </Link>
            <button
              onClick={handleLogout}
              className="group w-full flex items-center gap-5 py-2 px-2 rounded-xl hoverEle hover:bg-red-800/50 my-2"
            >
              <LogoutOutlined className="text-red-700 hoverEle group-hover:text-white" />
              <p>تسجيل الخروج</p>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
