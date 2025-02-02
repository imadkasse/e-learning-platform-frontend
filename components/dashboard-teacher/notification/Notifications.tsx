"use client";
import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import Link from "next/link";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";
import { io } from "socket.io-client";
import { Notifcation } from "@/types/notification";
import Spinner from "@/components/spinner/Spinner";

const socket = io(process.env.NEXT_PUBLIC_BACK_URL);

const Notifcations = () => {
  const token = Cookies.get("token");
  const { user, fetchUser, loading } = useUserStore();
  const [notifcation, setNotifcation] = useState<Notifcation[]>([]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  useEffect(() => {
    socket.on("newComment", (data) => {
      setNotifcation([...notifcation, data]);
    });
  }, [notifcation]);
  if (loading) {
    return <Spinner />;
  }
  if (!token || user?.role !== "teacher") {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
        <h1 className="apply-fonts-normal sm:text-3xl mt-5 w-full col-span-3 text-center text-mainColor ">
          أنت غير مسجل أو لا تملك الصلاحية للوصول الى هذه الصفحة
        </h1>
        <div className="mt-5 flex justify-center ">
          <Link
            href={"/login"}
            className="apply-fonts-normal py-2 px-4  bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white rounded-lg"
          >
            سجل الدخول من هنا
          </Link>
        </div>
      </div>
    );
  }
  console.log(user.notifications);
  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 ">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">إشعارتك</h1>
      </div>
      <div>
        {notifcation.length > 0 &&
          notifcation.map((notifcation, index) => {
            return (
              <NotificationCard
                key={index}
                lessonNumber={notifcation.lessonNumber}
                notifcationDate={notifcation.comment.createdAt}
                notifcationImg={notifcation.courseImage}
                notifcationName={notifcation.message}
                courseId={notifcation.courseId}
              />
            );
          })}
        {user.notifications.length > 0 ? (
          user.notifications.map((notifcation, index) => {
            return (
              <NotificationCard
                key={index}
                lessonNumber={notifcation.lessonNumber}
                notifcationDate={notifcation.createdAt}
                notifcationImg={notifcation.courseImage}
                notifcationName={notifcation.message}
                courseId={notifcation.courseId}
              />
            );
          })
        ) : (
          <h1>لا توجد أي إشعارات</h1>
        )}
      </div>
    </div>
  );
};

export default Notifcations;
