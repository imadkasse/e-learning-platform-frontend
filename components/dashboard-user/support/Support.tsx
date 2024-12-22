"use client";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import showToast from "@/utils/showToast";
import { CloseOutlined } from "@mui/icons-material";
import MsgCard from "./MsgCard";
import { useFaq } from "@/store/faqStore";

// إنشاء اتصال مع الخادم
const socket = io("https://e-leraning-backend.onrender.com"); // تأكد من استبدال الرابط برابط الخادم الخاص بك

const Support = () => {
  const token = Cookies.get("token");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showAddFaq, setShowAddFaq] = useState<boolean>(false);

  const { faqs, setFaqs } = useFaq();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!subject || !message) {
        showToast("error", "يجب ملء جميع الحقول!");
        return;
      }
      const faq = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/faq`,
        {
          subject: subject,
          description: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // إرسال البيانات إلى الخادم
      socket.emit("newFaq", { subject: subject, description: message });

      setSubject("");
      setMessage("");
      showToast("success", "تم الإرسال بنجاح!");

      setFaqs([...faqs, faq.data.faq]);
      setShowAddFaq(false);
    } catch (error) {
      console.log(error);
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/faq/myFaqs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setFaqs(data.faqs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFaqs();

    socket.on("ticketReply", (data) => {
      const faqIndex = faqs.findIndex((faq) => faq._id === data.faqId);
      if (faqIndex !== -1) {
        faqs[faqIndex].replies = [...faqs[faqIndex].replies, data.reply];
        setFaqs([...faqs]);
      }
    });

    // تنظيف الاستماع عند تدمير المكون
    return () => {
      socket.off("ticketReply");
    };
  }, [token, setFaqs, faqs]);

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 min-h-screen relative">
      <div className="w-full border-b-2 pb-3 flex items-center justify-between sticky top-0 bg-wygColor">
        <h1 className="apply-fonts-normal text-xl">الردود</h1>
        <button
          onClick={() => {
            setShowAddFaq(!showAddFaq);
          }}
          className="apply-fonts-normal bg-mainColor hoverEle hover:bg-mainColorHoverLight px-4 py-3 mt-1 rounded-md text-white"
        >
          إضافة إستفسار
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {faqs?.length > 0 ? (
          faqs?.map((faq) => {
            return (
              <MsgCard
                key={faq._id}
                faqId={faq._id}
                subject={faq.subject}
                date={faq.createdAt}
                replies={faq.replies}
              />
            );
          })
        ) : (
          <h1 className="apply-fonts-medium text-center text-lg my-5">
            لايوجد ردود لك حاليا
          </h1>
        )}
      </div>
      {/* Add Faq */}
      {showAddFaq && (
        <div className="rounded-xl  bg-black/40 w-full h-screen fixed top-0  left-0 flex  justify-center ">
          <div className="w-full h-full flex flex-col justify-center items-center   ">
            <form
              className="flex flex-col gap-4 w-96 px-2 py-3"
              onSubmit={handleSubmit}
            >
              <button
                className="text-right "
                onClick={() => {
                  setShowAddFaq(false);
                }}
              >
                <CloseOutlined className="text-redColor hoverEle hover:text-redColorHoverLight hover:rotate-180" />
              </button>
              <div>
                <input
                  type="text"
                  placeholder="الموضوع"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
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
        </div>
      )}
    </div>
  );
};

export default Support;
