import React from "react";
import { Loader2 } from "lucide-react";

const Loading = async () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl flex flex-col items-center transform hover:scale-105 transition-all duration-300 border border-gray-100">
        <div className="relative">
          <div className="absolute inset-0 bg-mainColor/10 rounded-full blur-xl animate-pulse"></div>
          <Loader2 className="w-16 h-16 text-mainColor animate-spin relative" />
        </div>
        <h2 className="text-2xl font-semibold bg-mainColor  bg-clip-text text-transparent mt-6 mb-2">
          جاري التحميل...
        </h2>
        <p className="text-gray-500 text-center">
          يرجى الانتظار بينما نقوم بتجهيز المحتوى
        </p>
      </div>
    </div>
  );
};

export default Loading;
