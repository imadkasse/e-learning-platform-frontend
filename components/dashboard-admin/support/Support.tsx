"use client";
import React, { useEffect, useState } from "react";
import MsgCard from "./MsgCard";

import { io } from "socket.io-client";
import Cookies from "js-cookie";

//connect with server
const socket = io("http://localhost:5000");

const Support = () => {
  const token = Cookies.get("token");
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchedNotifications = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/faq`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setNotifications(data.data.faqs);
        console.log(data.data.faqs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedNotifications();

    // عند استقبال إشعار جديد
    socket.on("newFaq", (data) => {
      // إضافة الإشعار الجديد إلى قائمة الإشعارات
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        data.faq, // يتم استلام `faq` من الخادم
      ]);
    });

    // تنظيف الاتصال عند إلغاء التثبيت
    return () => {
      socket.off("newFaq");
    };
  }, [token]);

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 ">
      <h1 className="apply-fonts-normal text-2xl font-semibold ">الرسائل</h1>
      <div className=" grid grid-cols-1 mt-7">
        {notifications?.length === 0 ? (
          <p>لا توجد إشعارات حالياً</p>
        ) : (
          notifications?.map((no) => (
            <MsgCard
              key={no._id}
              username={no.user.username}
              subject={no.subject}
              date={no.createdAt.split("T")[0]}
              description={no.description}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Support;
