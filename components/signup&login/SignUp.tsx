"use client";
import { Google, RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import showToast from "@/utils/showToast";

const SignUp = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordIsMatch, setPasswordIsMatch] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    // تحقق من صحة كلمة المرور (مثلاً، يجب أن تكون أطول من 6 حروف)
    setIsPasswordValid(value.length >= 6);
    setPasswordIsMatch(passwordConfirm === e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // تحقق من صحة البريد باستخدام تعبير منتظم بسيط
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (image) {
      formData.append("thumbnail", image);
    }

    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("passwordConfirm", passwordConfirm);


    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/signup`,
        formData
      );
      const role = res.data.user.role === "student" ? "user" : "";
      const token = res.data.token;
      Cookies.set(`token`, token, { expires: 7 });
      router.push(`/dashboard-${role}`);
    } catch (error) {
      // @ts-expect-error: fix after time
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupWithGoogle = () => {
    const googleAuthUrl = `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/google`;
    window.location.href = googleAuthUrl;
  };

  return (
    <div className="container mx-auto py-4   w-full flex items-center justify-center flex-col">
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
        onSubmit={handleSignUp}
      >
        {/* username */}
        <div>
          <input
            type="tetx"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="إسم المستخدم"
            className={`  w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent  rounded 
            ${username.length <= 2 ? "border-red-700" : "border-green-400"} `}
          />
        </div>
        {/* email */}
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="البريد الإلكتروني"
            className={`  w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent rounded 
            ${isValid ? "border-green-400" : "border-red-700"}`}
          />
        </div>
        {/* image */}
        <div className="flex gap-4 ">
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }
            }}
            placeholder="البريد الإلكتروني"
            required
            className={`  w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent rounded 
            ${isValid ? "border-green-400" : "border-red-700"}`}
          />
          <Image
            src={imageUrl || "/imgs/logoImg.png"}
            alt="user-image"
            className="md:w-14 md:h-14 xs:w-12 xs:h-12 rounded-full "
            width={150}
            height={150}
          />
        </div>
        {/* password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="كلمة المرور"
            className={` w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent  rounded 
            ${isPasswordValid ? "border-green-400" : "border-red-700"}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 left-3 flex items-center text-gray-500"
          >
            {showPassword ? <VisibilityOff /> : <RemoveRedEye />}
          </button>
        </div>

        <div>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              setIsPasswordValid(e.target.value.length >= 6);
              setPasswordIsMatch(password === e.target.value);
            }}
            placeholder="تأكيد كلمة المرور "
            className={` w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent  rounded 
            ${
              isPasswordValid && passwordIsMatch
                ? "border-green-400"
                : "border-red-700"
            }`}
          />
        </div>

        <div>
          <Link
            href={"/login"}
            className="apply-fonts-normal text-[12px] group  "
          >
            <p className="group-hover:underline  text-gray-600 cursor-pointer">
              هل لديك حساب؟ إضغط هنا للتسجيل الدخول
            </p>
          </Link>
        </div>

        <button
          type="submit"
          className={`apply-fonts-normal !my-4 w-full px-4 py-2.5 mx-auto block text-sm bg-mainColor text-white hoverEle rounded hover:bg-mainColorHoverLight ${
            loading ? "bg-mainColorHoverLight" : "bg-mainColor"
          }`}
        >
          {loading ? "جاري التسجيل ..." : "التسجيل "}
        </button>

        <button
          type="button"
          onClick={handleSignupWithGoogle}
          className="group flex justify-between items-center  apply-fonts-normal !mt-5 w-full  px-4 py-2.5 mx-auto  text-sm border-mainColor border-2 hoverEle rounded hover:bg-mainColor hover:text-white"
        >
          <p>التسجيل بإستخدام Google </p>
          <Google className="" />
        </button>
      </form>
    </div>
  );
};

export default SignUp;
