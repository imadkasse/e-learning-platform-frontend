"use client";
import showToast from "@/utils/showToast";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSentEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/forget-password`,
        { email }
      );
      showToast("success", res.data.message);
    } catch (error) {
      //@ts-expect-error:fix agin
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="container mx-auto py-4  h-[70vh] w-full flex items-center justify-center flex-col">
        <Link
          href={"/"}
          className="flex items-center flex-row-reverse  md:gap-3 mb-4"
        >
          <Image
            src="/imgs/logoImg.png"
            alt="logoImg"
            className="md:w-14 md:h-14 xs:w-12 xs:h-12 "
            width={150}
            height={150}
          />
          <h1 className="md:text-xl xs:text-base font-semibold xs:hidden lg:block">
            Sience Academie
          </h1>
        </Link>

        <form
          className="space-y-4 font-[sans-serif] max-w-md mx-auto  w-full "
          onSubmit={handleSentEmail}
        >
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="البريد الإلكتروني"
            className={`  w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent  rounded 
            `}
          />

          <button
            type="submit"
            className={`apply-fonts-normal !my-4 w-full px-4 py-2.5 mx-auto block text-sm   text-white hoverEle rounded ${
              loading
                ? "bg-mainColorHoverLight"
                : "bg-mainColor hover:bg-mainColorHoverLight "
            }`}
          >
            {loading ? 'جاري الإرسال...' : "إعادة كلمة السر"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
