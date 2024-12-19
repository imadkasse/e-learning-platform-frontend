"use client";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import showToast from "@/utils/showToast";

// إنشاء اتصال مع الخادم
const socket = io("http://localhost:5000"); // تأكد من استبدال الرابط برابط الخادم الخاص بك

const Support = () => {
  const token = Cookies.get("token");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!name || !message) {
        showToast("error", "يجب ملء جميع الحقول!");
        return;
      }
       await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/faq`,
        {
          subject: name,
          description: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // إرسال البيانات إلى الخادم
      socket.emit("newFaq", { subject: name, description: message });

      setName("");
      setMessage("");
      showToast("success", "تم الإرسال بنجاح!");
    } catch (error) {
      console.log(error);
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    }
  };

  useEffect(() => {
    // الاستماع للإشعارات من الخادم
    socket.on("newFaq", (data) => {
      // عرض الرسالة في واجهة المستخدم
      console.log("Received message:", data); // تحقق من البيانات المرسلة
    });

    // تنظيف الاستماع عند تدمير المكون
    return () => {
      socket.off("newFaq");
    };
  }, []);

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 min-h-screen flex justify-center items-center">
      <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="الإسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 text-md rounded-md"
          />
        </div>
        <div>
          <textarea
            className="w-full px-4 py-3 text-gray-700 text-md rounded-md h-36"
            placeholder="الرسالة"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 text-sm font-medium text-white bg-mainColor rounded-md hover:bg-mainColorHoverLight hoverEle"
        >
          إرسال
        </button>
      </form>
    </div>
  );
};

export default Support;
