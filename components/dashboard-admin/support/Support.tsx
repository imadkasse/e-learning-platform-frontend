"use client";
import React, { useEffect } from "react";
import MsgCard from "./MsgCard";

import { io } from "socket.io-client";
import { useFaq } from "@/store/faqStore";

//connect with server
const socket = io("https://e-leraning-backend.onrender.com");

const Support = () => {
  const { faqs, setFaqs } = useFaq();

  useEffect(() => {
    const fetchedFaqs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/faq`, {
          credentials: "include",
        });
        const data = await res.json();
        setFaqs(data.data.faqs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedFaqs();

    socket.on("newFaq", (data) => {
      setFaqs([...faqs, data.faq]);
    });
    socket.on("deleteFaq", (data) => {
      setFaqs(faqs.filter((faq) => faq._id !== data.faq._id));
    });

    // تنظيف الاتصال عند إلغاء التثبيت
    return () => {
      socket.off("newFaq");
      socket.off("deleteFaq");
    };
  }, [faqs, setFaqs]);

  return (
    <div className=" lg:custom-width rounded-xl px-4 py-5 h-[94vh] overflow-y-scroll relative">
      <h1 className="apply-fonts-normal text-2xl font-semibold ">الرسائل</h1>
      <div className=" grid grid-cols-1 mt-7">
        {faqs?.length === 0 ? (
          <p>لا توجد إشعارات حالياً</p>
        ) : (
          faqs?.map((no) => (
            <MsgCard
              key={no._id}
              username={no.user.username}
              subject={no.subject}
              date={no.createdAt.split("T")[0]}
              description={no.description}
              ticketId={no._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Support;
