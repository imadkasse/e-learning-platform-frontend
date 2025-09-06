"use client";
import { Google, RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import showToast from "@/utils/showToast";
import { useUserStore } from "@/store/userStore";
import * as z from "zod";

const UserSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [, setIsValid] = useState(false);

  const [password, setPassword] = useState("");
  const [, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // errors
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const { fetchUser } = useUserStore();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const result = UserSchema.pick({ password: true }).safeParse({
      password: value,
    });
    setErrors((prev) => ({
      ...prev,
      password: result.success ? undefined : result.error.issues[0].message,
    }));
    // تحقق من صحة كلمة المرور (مثلاً، يجب أن تكون أطول من 6 حروف)
    setIsPasswordValid(value.length >= 6);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const result = UserSchema.pick({ email: true }).safeParse({ email: value });
    setErrors((prev) => ({
      ...prev,
      email: result.success ? undefined : result.error.issues[0].message,
    }));
    // تحقق من صحة البريد باستخدام تعبير منتظم بسيط
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };
  const handleLoginWithGoogle = () => {
    const googleAuthUrl = `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/google`;
    window.location.href = googleAuthUrl;
  };
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = UserSchema.safeParse({ email, password });
    if (!result.success) {
      showToast("error", result.error.issues[0].message);
      setLoading(false);
      return;
    }
    try {
      const data = { email: email, password: password };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );
      if (!res.data.user.active) {
        showToast(
          "error",
          "الحساب غير مفعل حاليا الرجاء التواصل مع الدعم لتفعيله"
        );
        return;
      }

      const role =
        res.data.user.role === "student" ? "user" : res.data.user.role;
      await fetchUser();
      console.log(res.data);
      router.push(`/dashboard-${role}`);
    } catch (error) {
      // @ts-expect-error: fix after time
      showToast("error", error.response.data.error);
    } finally {
      setLoading(false);
    }
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

      <form
        className="space-y-4 font-[sans-serif] max-w-md mx-auto  w-full "
        onSubmit={handleLogin}
      >
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          placeholder="البريد الإلكتروني"
          className={`w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 rounded ${
            errors.email ? "border-red-700" : "border-green-400"
          }`}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
        {/* passsword */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="كلمة المرور"
            required
            className={` w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 rounded
            ${errors.password ? "border-red-700" : "border-green-400"}`}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 left-3 flex items-center text-gray-500"
          >
            {showPassword ? <VisibilityOff /> : <RemoveRedEye />}
          </button>
        </div>

        <div className="flex justify-between">
          <Link
            href={"/forget-password"}
            className="apply-fonts-normal text-[12px] group  "
          >
            <p className="group-hover:underline  text-gray-600 cursor-pointer">
              نسيت كلمة السر ؟
            </p>
          </Link>
          <Link
            href={"/signup"}
            className="apply-fonts-normal text-[12px] group  "
          >
            <p className="group-hover:underline  text-gray-600 cursor-pointer">
              ليس لديك حساب؟ سجل هنا
            </p>
          </Link>
        </div>

        <button
          type="submit"
          className={`apply-fonts-normal !my-4 w-full px-4 py-2.5 mx-auto block text-sm  text-white hoverEle rounded hover:bg-mainColorHoverLight ${
            loading ? "bg-mainColorHoverLight" : "bg-mainColor"
          }`}
        >
          {loading ? "جاري تسجيل الدخول ..." : "تسجيل الدخول "}
        </button>

        <button
          type="button"
          onClick={handleLoginWithGoogle}
          className="group flex justify-between items-center  apply-fonts-normal !mt-5 w-full  px-4 py-2.5 mx-auto  text-sm border-mainColor border-2 hoverEle rounded hover:bg-mainColor hover:text-white"
        >
          <p>التسجيل بإستخدام Google </p>
          <Google className="" />
        </button>
      </form>
    </div>
  );
};

export default Login;
