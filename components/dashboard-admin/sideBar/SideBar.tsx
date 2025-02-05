"use client";
import {
  ArrowBackIos,
  ArrowForwardIos,
  ContactSupportOutlined,
  GroupsOutlined,
  HomeOutlined,
  LogoutOutlined,
  NotificationsOutlined,
  PlayLessonOutlined,
  SettingsOutlined,
  SupervisorAccountOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SideBar = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const handleToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };
  const pathName = usePathname();
  console.log(pathName);
  return (
    <>
      {/* in the small screen */}
      <div
        className={`bg-sideBarBgColo text-white py-4   mb-2 px-3 rounded-xl h-screen transition-all duration-300 ease-in-out ${
          toggleSidebar ? `w-[300px] ` : `w-[0px]`
        }  lg:hidden sm:sticky xs:fixed xs:z-50 top-2 xs:right-0  xs:flex flex-col justify-between`}
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
            <div className="list-none text-base w-[200px]">
              <Link
                href={`/dashboard-admin`}
                className={` flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-admin" ? "bg-mainColor/50" : ""
                }  my-2`}
              >
                <HomeOutlined />
                <p>الرئيسية</p>
              </Link>
              <Link
                href={`/dashboard-admin/courses`}
                className={` flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-admin/courses"
                    ? "bg-mainColor/50"
                    : ""
                }  my-2`}
              >
                <PlayLessonOutlined />
                <p>الدورات</p>
              </Link>
              <Link
                href={`/dashboard-admin/students`}
                className={` flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-admin/students"
                    ? "bg-mainColor/50"
                    : ""
                }  my-2`}
              >
                <GroupsOutlined />
                <p>الطلاب</p>
              </Link>
              <Link
                href={`/dashboard-admin/administration`}
                className={` flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-admin/administration"
                    ? "bg-mainColor/50"
                    : ""
                }  my-2`}
              >
                <SupervisorAccountOutlined />
                <p>الإدارة</p>
              </Link>
              <Link
                href={`/dashboard-admin/notification`}
                className={` flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-admin/notification"
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
            <Link
              href={`/dashboard-admin/support`}
              className={` flex items-center justify-between py-2 px-2 rounded-xl hoverEle hover:bg-mainColor/50 ${
                pathName === "/dashboard-admin/support" ? "bg-mainColor/50" : ""
              } my-2`}
            >
              <ContactSupportOutlined />
              <p>الدعم</p>
            </Link>
            <Link
              href={`/`}
              className=" flex items-center justify-between py-2 px-2 rounded-xl hoverEle hover:bg-mainColor/50 my-2"
            >
              <SettingsOutlined />
              <p>الإعدادات</p>
            </Link>
            <Link
              href={`/`}
              className=" flex items-center justify-between py-2 px-2 rounded-xl hoverEle hover:bg-red-800/50 my-2"
            >
              <LogoutOutlined className="text-red-700" />
              <p>تسجيل الخروج</p>
            </Link>
          </ul>
        </nav>
      </div>
      {/* in the large screen */}
      <div className="bg-sideBarBgColo text-white py-2  px-3 rounded-xl h-screen lg:w-[300px]  xs:hidden lg:sticky lg:top-2  lg:flex flex-col justify-between">
        <div>
          <div className="w-full flex justify-center mb-1">
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
            <div className="list-none text-base w-[200px]">
              <Link
                href={`/dashboard-admin`}
                className={` flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-admin" ? "bg-mainColor/50" : ""
                }  my-2`}
              >
                <HomeOutlined />
                <p>الرئيسية</p>
              </Link>
              <Link
                href={`/dashboard-admin/courses`}
                className={` flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-admin/courses"
                    ? "bg-mainColor/50"
                    : ""
                } my-2`}
              >
                <PlayLessonOutlined />
                <p>الدورات</p>
              </Link>
              <Link
                href={`/dashboard-admin/students`}
                className={` flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-admin/students"
                    ? "bg-mainColor/50"
                    : ""
                } my-2`}
              >
                <GroupsOutlined />
                <p>الطلاب</p>
              </Link>
              <Link
                href={`/dashboard-admin/administration`}
                className={` flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-admin/administration"
                    ? "bg-mainColor/50"
                    : ""
                } my-2`}
              >
                <SupervisorAccountOutlined />
                <p>الإدارة</p>
              </Link>
              <Link
                href={`/dashboard-admin/notification`}
                className={`flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                  pathName === "/dashboard-admin/notification"
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
          <div className="list-none text-base w-[200px] ">
            <Link
              href={`/dashboard-admin/support`}
              className={` flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                pathName === "/dashboard-admin/support" ? "bg-mainColor/50" : ""
              } my-2`}
            >
              <ContactSupportOutlined />
              <p>الدعم</p>
            </Link>
            <Link
              href={`/dashboard-admin/settings`}
              className={` flex items-center justify-between py-3 px-3 rounded-xl hoverEle hover:bg-mainColor/50 ${
                pathName === "/dashboard-admin/settings"
                  ? "bg-mainColor/50"
                  : ""
              } my-2`}
            >
              <SettingsOutlined />
              <p>الإعدادات</p>
            </Link>
            <Link
              href={`/`}
              className="group flex items-center justify-between py-2 px-2 rounded-xl hoverEle hover:bg-red-800/50 my-2"
            >
              <LogoutOutlined className="text-red-700 hoverEle group-hover:text-white" />
              <p>تسجيل الخروج</p>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
