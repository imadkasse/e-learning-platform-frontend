"use client";
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Home,
  LogOut,
  Bell,
  User,
  Play,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import showToast from "@/utils/showToast";

const SideBar = () => {
  const router = useRouter();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { fetchUser } = useUserStore();

  const handleToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const pathName = usePathname();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      showToast("success", "تم تسجيل الخروج بنجاح");
      Cookies.remove("token");
      await fetchUser();
      router.push("/");
    } catch (error) {
      console.log(error);
      showToast("error", "تم تسجيل الخروج بنجاح");
    }
  };

  const mainMenuItems = [
    {
      href: "/dashboard-user",
      icon: Home,
      label: "الرئيسية",
      exact: true,
    },
    {
      href: "/dashboard-user/courses",
      icon: Play,
      label: "الدورات",
    },
    {
      href: "/dashboard-user/notification",
      icon: Bell,
      label: "الإشعارات",
    },
  ];

  const bottomMenuItems = [
    {
      href: "/dashboard-user/support",
      icon: HelpCircle,
      label: "الدعم",
    },
    {
      href: "/dashboard-user/settings",
      icon: Settings,
      label: "الإعدادات",
    },
  ];

  const isActiveLink = (href: string, exact = false) => {
    if (exact) {
      return pathName === href;
    }
    return pathName.startsWith(href);
  };

  const NavLink = ({
    href,
    icon: Icon,
    label,
    exact = false,
  }: {
    href: string;
    icon: any;
    label: string;
    exact?: boolean;
  }) => (
    <Link
      href={href}
      className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 hover:bg-mainColor/50 hover:scale-[1.02] ${
        isActiveLink(href, exact)
          ? "bg-mainColor/50 shadow-sm"
          : "hover:shadow-sm"
      } my-2`}
    >
      <Icon size={20} className="flex-shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`bg-sideBarBgColo text-white py-4 mb-2 px-3 rounded-xl h-[94vh] transition-all duration-300 ease-in-out ${
          toggleSidebar ? "w-[300px] shadow-2xl" : "w-[60px]"
        } lg:hidden sm:sticky xs:fixed top-2 xs:right-1 z-10 flex flex-col justify-between`}
      >
        {/* Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleToggle}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            {toggleSidebar ? (
              <ChevronRight size={20} className="text-mainColor" />
            ) : (
              <ChevronLeft size={20} className="text-mainColor" />
            )}
          </button>
        </div>

        {/* Logo Section */}
        <div className={`${toggleSidebar ? "block" : "hidden"} flex-1`}>
          <div className="w-full flex justify-center mb-6">
            <Link
              href="/"
              className="flex items-center flex-row-reverse gap-3 hover:scale-105 transition-transform duration-200"
            >
              <Image
                src="/imgs/dashboard-user-imgs/logoDashUser.png"
                alt="logoImg"
                className="w-12 h-12 rounded-lg"
                width={48}
                height={48}
              />
              <h1 className="text-lg font-bold text-center">
                Science Academie
              </h1>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="apply-fonts-normal mb-8">
            <div className="space-y-1">
              {mainMenuItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  exact={item.exact}
                />
              ))}
            </div>
          </nav>
        </div>

        {/* Bottom Navigation */}
        <nav
          className={`apply-fonts-normal ${toggleSidebar ? "block" : "hidden"}`}
        >
          <div className="space-y-1 mb-4">
            {bottomMenuItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="group w-full flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 hover:bg-red-500/50 hover:scale-[1.02]"
          >
            <LogOut
              size={20}
              className="text-red-400 group-hover:text-white transition-colors duration-200 flex-shrink-0"
            />
            <span className="text-sm font-medium">تسجيل الخروج</span>
          </button>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="bg-sideBarBgColo text-white py-6 px-4 rounded-xl h-full w-[300px] xs:hidden lg:flex flex-col justify-between shadow-lg">
        {/* Logo Section */}
        <div>
          <div className="w-full flex justify-center mb-8">
            <Link
              href="/"
              className="flex items-center flex-row-reverse gap-3 hover:scale-105 transition-transform duration-200"
            >
              <Image
                src="/imgs/dashboard-user-imgs/logoDashUser.png"
                alt="logoImg"
                className="w-12 h-12 rounded-lg"
                width={48}
                height={48}
              />
              <h1 className="text-md font-bold">Science Academie</h1>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="apply-fonts-normal">
            <div className="space-y-2">
              {mainMenuItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  exact={item.exact}
                />
              ))}
            </div>
          </nav>
        </div>

        {/* Bottom Navigation */}
        <nav className="apply-fonts-normal">
          <div className="space-y-2 mb-4">
            {bottomMenuItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="group w-full flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 hover:bg-red-500/50 hover:scale-[1.02] border border-red-400/20"
          >
            <LogOut
              size={20}
              className="text-red-400 group-hover:text-white transition-colors duration-200 flex-shrink-0"
            />
            <span className="text-sm font-medium">تسجيل الخروج</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
