"use client";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { X, Plus, MessageCircle, Send } from "lucide-react";
import showToast from "@/utils/showToast";
import MsgCard from "./MsgCard";
import { useFaq } from "@/store/faqStore";
import Spinner from "@/components/spinner/Spinner";
import { useUserStore } from "@/store/userStore";

// إنشاء اتصال مع الخادم
const socket = io("https://e-leraning-backend.onrender.com");

const Support = () => {
  const { loading } = useUserStore();
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
          withCredentials: true,
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
            credentials: "include",
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

    return () => {
      socket.off("ticketReply");
    };
  }, [setFaqs, faqs]);

  if (loading) {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="lg:custom-width rounded-xl px-4 h-[93vh] relative overflow-y-scroll bg-gray-50">
      {/* Header */}
      <div className="w-full border-b-2 border-gray-200 pb-4 mt-4 flex items-center justify-between sticky top-0 bg-gray-50 z-10">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-mainColor" />
          <h1 className="apply-fonts-normal text-2xl font-bold text-gray-800">
            الردود والاستفسارات
          </h1>
        </div>
        <button
          onClick={() => setShowAddFaq(!showAddFaq)}
          className="apply-fonts-normal bg-mainColor hoverEle hover:bg-mainColorHoverLight px-6 py-3 rounded-lg text-white flex items-center gap-2 shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          إضافة استفسار جديد
        </button>
      </div>

      {/* Content */}
      <div className="py-6">
        {faqs && faqs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <MsgCard
                key={faq._id}
                faqId={faq._id}
                subject={faq.subject}
                date={faq.createdAt}
                replies={faq.replies}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="apply-fonts-medium text-xl text-gray-600 mb-2">
              لا توجد ردود حالياً
            </h2>
            <p className="text-gray-500">
              قم بإضافة استفسار جديد للحصول على المساعدة
            </p>
          </div>
        )}
      </div>

      {/* Add FAQ Modal */}
      {showAddFaq && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl transform transition-all">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 apply-fonts-normal">
                إضافة استفسار جديد
              </h2>
              <button
                onClick={() => setShowAddFaq(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 apply-fonts-normal">
                    موضوع الاستفسار
                  </label>
                  <input
                    type="text"
                    placeholder="اكتب موضوع استفسارك هنا..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent transition-all duration-200 text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 apply-fonts-normal">
                    تفاصيل الاستفسار
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent transition-all duration-200 text-gray-700 resize-none"
                    placeholder="اكتب تفاصيل استفسارك بالتفصيل..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-mainColor hover:bg-mainColorHoverLight text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg apply-fonts-normal"
                >
                  <Send className="w-5 h-5" />
                  إرسال الاستفسار
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
