"use client";
import React, { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";

import { useUserStore } from "@/store/userStore";
import { io } from "socket.io-client";
import { Notifcation } from "@/types/notification";
import Spinner from "@/components/spinner/Spinner";

const socket = io(process.env.NEXT_PUBLIC_BACK_URL);

const Notifcations = () => {
  const { user, loading } = useUserStore();
  const [notifcation, setNotifcation] = useState<Notifcation[]>([]);

  useEffect(() => {
    socket.on("newComment", (data) => {
      setNotifcation([...notifcation, data]);
    });
  }, [notifcation]);
  if (loading) {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
        <Spinner />
      </div>
    );
  }
  return (
    <div className=" lg:custom-width rounded-xl px-4 py-5 h-[94vh] overflow-y-scroll">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">إشعارتك</h1>
      </div>
      <div>
        {notifcation.length > 0 &&
          notifcation.map((notifcation, index) => {
            console.log(notifcation);
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
