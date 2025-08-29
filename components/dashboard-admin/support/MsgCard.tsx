"use client";
import showToast from "@/utils/showToast";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import {
  X,
  Reply,
  Trash2,
  User,
  Calendar,
  MessageCircle,
  Send,
} from "lucide-react";

type Props = {
  username: string;
  subject: string;
  description: string;
  date: string;
  ticketId: string;
};

const MsgCard = ({ username, subject, ticketId, date, description }: Props) => {
  const [replay, setReplay] = useState<string>("");
  const [showReplay, setShowReplay] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handelReplay = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/faq/${ticketId}/reply`,
        {
          message: replay,
        },
        {
          withCredentials: true,
        }
      );
      showToast("success", "تم الرد بنجاح");
      setReplay("");
      setShowReplay(false);
    } catch (error) {
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 h-full flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <MessageCircle className="w-4 h-4 text-blue-600" />
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              جديد
            </span>
          </div>
          <div className="text-xs text-gray-400">#{ticketId.slice(-6)}</div>
        </div>

        {/* Subject */}
        <div className="mb-4">
          <h3 className="apply-fonts-normal text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
            {subject}
          </h3>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium">{username}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 mb-6">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={() => setShowReplay(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            <Reply className="w-4 h-4" />
            رد
          </button>
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-200">
            <Trash2 className="w-4 h-4" />
            حذف
          </button>
        </div>
      </div>

      {/* Reply Modal */}
      {showReplay && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Reply className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="apply-fonts-normal text-lg font-bold text-gray-900">
                    الرد على الاستفسار
                  </h3>
                  <p className="text-sm text-gray-500">
                    رد على المستخدم:{" "}
                    <span className="font-medium text-gray-700">
                      {username}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowReplay(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Original Message */}
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-2">
                الرسالة الأصلية:
              </h4>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-2">{subject}</h5>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {description}
                </p>
              </div>
            </div>

            {/* Reply Form */}
            <form onSubmit={handelReplay} className="p-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="reply"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    ردك:
                  </label>
                  <textarea
                    id="reply"
                    name="reply"
                    value={replay}
                    onChange={(e) => setReplay(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 resize-none"
                    placeholder="اكتب ردك هنا..."
                    required
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-1 rounded-lg">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-sm text-blue-700">
                      <p className="font-medium mb-1">نصائح للرد:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• كن مهذباً ومساعداً في ردك</li>
                        <li>• قدم حلول واضحة ومفصلة</li>
                        <li>• تأكد من الإجابة على جميع النقاط المطروحة</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReplay(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !replay.trim()}
                    className={`flex-1 px-4 py-3 font-medium rounded-xl text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                      loading || !replay.trim()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        جاري الإرسال...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        إرسال الرد
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MsgCard;
