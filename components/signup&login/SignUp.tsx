"use client";
import { Google, RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import showToast from "@/utils/showToast";
import * as z from "zod";
const UserSchema = z
  .object({
    username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
    email: z.string().email("البريد الإلكتروني غير صالح"),
    password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور وتأكيدها غير متطابقين",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [, setPasswordIsMatch] = useState(false);

  const [isValid, setIsValid] = useState(false);
  // errors
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    username?: string;
  }>({});

  const [, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    setPasswordIsMatch(passwordConfirm === e.target.value);
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
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);

    const result = UserSchema.pick({ username: true }).safeParse({
      username: value,
    });
    setErrors((prev) => ({
      ...prev,
      username: result.success ? undefined : result.error.issues[0].message,
    }));
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordConfirm(value);

    const result = UserSchema.safeParse({
      username,
      email,
      password,
      confirmPassword: value,
    });

    setErrors((prev) => ({
      ...prev,
      confirmPassword: result.success
        ? undefined
        : result.error.issues.find((i) => i.path[0] === "confirmPassword")
            ?.message,
    }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = UserSchema.safeParse({
      username,
      email,
      password,
      confirmPassword: passwordConfirm,
    });

    if (!result.success) {
      // اجمع الأخطاء من Zod وضعها في state
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof typeof errors;
        fieldErrors[fieldName] = issue.message;
      });
      setErrors(fieldErrors);
      return; // لا تكمل الإرسال
    }
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
            onChange={handleUsernameChange}
            placeholder="إسم المستخدم"
            className={`  w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent  rounded 
            ${errors.username ? "border-red-700" : "border-green-400"} `}
          />
          {errors.username && (
            <p className="text-red-600 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        {/* email */}
        <div>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="البريد الإلكتروني"
            className={`w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent rounded 
  ${errors.email ? "border-red-700" : "border-green-400"}`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
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

        <div>
          <input
            type="password"
            value={passwordConfirm}
            onChange={handleConfirmPasswordChange}
            placeholder="تأكيد كلمة المرور "
            className={` w-full px-4 py-3 bg-gray-100 text-md outline-none border-b-2 border-transparent  rounded 
            ${errors.confirmPassword ? "border-red-700" : "border-green-400"}`}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
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
          disabled={loading}
          className={`apply-fonts-normal !my-4 w-full px-4 py-2.5 mx-auto block text-sm bg-mainColor text-white hoverEle rounded hover:bg-mainColorHoverLight ${
            loading ? "bg-mainColorHoverLight" : "bg-mainColor"
          }`}
        >
          {loading ? "جاري التسجيل ..." : "التسجيل "}
        </button>

        <button
          type="button"
          onClick={handleSignupWithGoogle}
          disabled={loading}
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
