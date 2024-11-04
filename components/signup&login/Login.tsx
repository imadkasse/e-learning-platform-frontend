"use client";
import {
  GitHub,
  Google,
  RemoveRedEye,
  VisibilityOff,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    // تحقق من صحة كلمة المرور (مثلاً، يجب أن تكون أطول من 6 حروف)
    setIsPasswordValid(value.length >= 6);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // تحقق من صحة البريد باستخدام تعبير منتظم بسيط
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };
  return (
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

      <form className="space-y-4 font-[sans-serif] max-w-md mx-auto  w-full ">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="البريد الإلكتروني"
          className={`  w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent  rounded 
            ${isValid ? "border-green-400" : "border-red-700"}`}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="كلمة المرور"
            className={` w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent  rounded 
            ${
              isPasswordValid
                ? "border-green-400"
                : "border-red-700"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 left-3 flex items-center text-gray-500"
          >
            {showPassword ? <VisibilityOff /> : <RemoveRedEye />}
          </button>
        </div>

        <div className="flex justify-between">
          <Link href={"/"} className="apply-fonts-normal text-[12px] group  ">
            <p className="group-hover:underline  text-gray-600 cursor-pointer">
              نسيت كلمة السر ؟
            </p>
          </Link>
          <Link href={"/signup"} className="apply-fonts-normal text-[12px] group  ">
            <p className="group-hover:underline  text-gray-600 cursor-pointer">
              ليس لديك حساب؟ سجل هنا
            </p>
          </Link>
        </div>

        <button
          type="submit"
          className="apply-fonts-normal !my-4 w-full px-4 py-2.5 mx-auto block text-sm bg-mainColor text-white hoverEle rounded hover:bg-mainColorHoverLight"
        >
          التسجيل
        </button>

        <button
          type="button"
          className="group flex justify-between items-center  apply-fonts-normal !mt-5 w-full  px-4 py-2.5 mx-auto  text-sm border-mainColor border-2 hoverEle rounded hover:bg-mainColor hover:text-white"
        >
          <p>التسجيل بإستخدام Google </p>
          <Google className="" />
        </button>

        <button
          type="button"
          className="group flex justify-between items-center  apply-fonts-normal !mt-5 w-full  px-4 py-2.5 mx-auto  text-sm border-mainColor border-2 hoverEle rounded hover:bg-mainColor hover:text-white"
        >
          <p>التسجيل بإستخدام Github </p>
          <GitHub className="" />
        </button>
      </form>
    </div>
  );
};

export default Login;
