"use client";
import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import { io } from "socket.io-client";
import { User } from "@/types/user";
import { Comment } from "@/types/lesson";
import { useUserStore } from "@/store/userStore";
import Cookies from "js-cookie";
import Link from "next/link";
import Spinner from "@/components/spinner/Spinner";
// import { useUserStore } from "@/store/userStore";
// import Link from "next/link";

const socket = io(process.env.NEXT_PUBLIC_BACK_URL);

type Notifcation = {
  message: string;
  comment: Comment;
  courseImage: string;
  courseId: string;
  user: User;
  lessonNumber: number;
};
const Notifcations = () => {
  const token = Cookies.get("token");
  const { user, loading } = useUserStore();

  console.log(user);
  const [notifcation, setNotifcation] = useState<Notifcation[]>([]);

  useEffect(() => {
    socket.on("newReply", (data) => {
      setNotifcation([...notifcation, data]);
      console.log(data);
    });
  }, [notifcation]);

  if (loading) {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
        <Spinner />
      </div>
    );
  }

  if (!token || user?.role !== "student") {
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

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] overflow-y-scroll ">
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
                notifcationDate={notifcation.comment.createdAt.split("T")[0]}
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
                notifcationDate={notifcation.createdAt.split("T")[0]}
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
