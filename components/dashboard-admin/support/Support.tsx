"use client";
import React, { useEffect } from "react";
import MsgCard from "./MsgCard";
import { io } from "socket.io-client";
import { useFaq } from "@/store/faqStore";
import { MessageSquare, Inbox, Users } from "lucide-react";

//connect with server
const socket = io("https://e-leraning-backend.onrender.com");

const Support = () => {
  const { faqs, setFaqs } = useFaq();

  useEffect(() => {
    const fetchedFaqs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/faq`, {
          credentials: "include",
          cache: "no-store",
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
    <>
      <div className="lg:custom-width  rounded-xl px-4 py-5  overflow-y-scroll">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="apply-fonts-normal text-3xl font-bold text-gray-800">
                  مركز الدعم
                </h1>
                <p className="text-gray-600 mt-1">
                  إدارة رسائل واستفسارات المستخدمين
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="lg:custom-width  rounded-xl px-4 py-5  overflow-y-scroll">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  إجمالي الرسائل
                </p>
                <p className="text-3xl font-bold mt-2">{faqs?.length || 0}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Inbox className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  رسائل اليوم
                </p>
                <p className="text-3xl font-bold mt-2">
                  {faqs?.filter(
                    (faq) =>
                      new Date(faq.createdAt).toDateString() ===
                      new Date().toDateString()
                  ).length || 0}
                </p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <MessageSquare className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">
                  المستخدمين النشطين
                </p>
                <p className="text-3xl font-bold mt-2">
                  {new Set(faqs?.map((faq) => faq.user._id)).size || 0}
                </p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Users className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Messages Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Inbox className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="apply-fonts-normal text-2xl font-bold text-gray-800">
                الرسائل الواردة
              </h2>
            </div>
          </div>

          <div className="p-6">
            {faqs?.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="apply-fonts-normal text-xl font-semibold text-gray-600 mb-2">
                  لا توجد رسائل
                </h3>
                <p className="text-gray-500">
                  لم يتم استلام أي رسائل من المستخدمين بعد
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {faqs?.map((faq) => (
                  <div
                    key={faq._id}
                    className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
                  >
                    <MsgCard
                      username={faq.user.username}
                      subject={faq.subject}
                      date={faq.createdAt.split("T")[0]}
                      description={faq.description}
                      ticketId={faq._id}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
