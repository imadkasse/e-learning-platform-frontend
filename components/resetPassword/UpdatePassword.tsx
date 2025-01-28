"use client";
import showToast from "@/utils/showToast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

type Props = { resetToken: string };
const UpdatePassword = ({ resetToken }: Props) => {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/reset-password/${resetToken}`,
        { password, passwordConfirm }
      );
      showToast("success", "تم تغيير كلمة المرور بنجاح!");
      // redirect to login page
      router.push("/login");
    } catch (error) {
      //@ts-expect-error:fix agin
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-mainColor mb-4 apply-fonts-normal text-center">
          إعادة تعيين كلمة المرور
        </h1>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          {/* حقل كلمة المرور */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 apply-fonts-normal"
            >
              كلمة المرور الجديدة
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-mainColor focus:border-mainColor apply-fonts-normal"
              required
            />
          </div>
          {/* تأكيد كلمة المرور */}
          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-gray-700 apply-fonts-normal"
            >
              تأكيد كلمة المرور
            </label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-mainColor focus:border-mainColor apply-fonts-normal"
              required
            />
          </div>
          {/* زر الإرسال */}
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg text-white bg-mainColor shadow-md hover:bg-mainColor/90 focus:ring-2 focus:ring-offset-2 focus:ring-mainColor focus:outline-none ${
              loading && "opacity-75 cursor-not-allowed"
            } apply-fonts-normal`}
            disabled={loading}
          >
            {loading ? "جارٍ التحديث..." : "إعادة تعيين كلمة المرور"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
