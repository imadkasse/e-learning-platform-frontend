"use client";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import showToast from "@/utils/showToast";
import UpdatePassword from "@/components/utlisComponenets/UpdatePassword";
import Spinner from "@/components/spinner/Spinner";

const Settings = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const [loading, setloading] = useState<boolean>(false);

  const fetchUser = useUserStore((state) => state.fetchUser);
  const loadingUser = useUserStore((state) => state.loading);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const user = useUserStore((state) => state.user);

  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [numPhone, setNumPhone] = useState(user.phoneNumber);
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");

  if (loadingUser) {
    return <Spinner />;
  }

  if (!token || user?.role !== "teacher") {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh]  overflow-y-scroll ">
        <h1 className="apply-fonts-normal sm:text-3xl mt-5 w-full col-span-3 text-center text-mainColor ">
          أنت غير مسجل أو لا تملك الصلاحية للوصول الى هذه الصفحة
        </h1>
        <div className="mt-5 flex justify-center ">
          <Link
            href={"/login"}
            className="apply-fonts-normal py-2 px-4  bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white rounded-lg"
          >
            سجل الدخول من هنا
          </Link>
        </div>
      </div>
    );
  }

  const handelupdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("thumbnail", image);
    }
    formData.append("usernam", name);
    formData.append("email", email);
    formData.append("phoneNumber", numPhone);
    setloading(true);
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/updateMe`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      showToast("success", "تم تحديث البيانات بنجاح ");
      router.refresh();
    } catch (error) {
      console.log(error);
      //@ts-expect-error:fix error agin
      showToast("error", error.response.data.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] overflow-y-scroll">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold">
          إعدادات الحساب
        </h1>
      </div>
      <form onSubmit={handelupdate}>
        {/* Image */}
        <div className="flex flex-col  justify-center gap-3 ">
          <label className="apply-fonts-normal block mb-2 text-sm font-medium text-gray-900">
            الصورة
          </label>
          <Image
            src={
              user.thumbnail ? user.thumbnail : imageUrl || "/imgs/person.png"
            }
            width={150}
            height={150}
            alt="personImg"
            unoptimized
            className="w-36 h-36  rounded-xl"
          />
          <div className="flex flex-col  items-start w-36 ">
            <label
              htmlFor="image"
              className="cursor-pointer text-sm w-full text-center font-medium text-white bg-mainColor hover:bg-mainColorHoverLight  rounded-lg px-4 py-2 hoverEle"
            >
              اختر صورة
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImage(file);
                  setImageUrl(URL.createObjectURL(file));
                }
              }}
              className="hidden" // اجعل حقل الإدخال غير مرئي
            />
          </div>
        </div>

        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label className="apply-fonts-normal block mb-2 text-sm font-medium text-gray-900">
              الإسم
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder={user.username}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            />
          </div>

          {/* Email */}
          <div>
            <label className=" apply-fonts-normal block mb-2 text-sm font-medium text-gray-900">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              placeholder={user.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="apply-fonts-normal block mb-2 text-sm font-medium text-gray-900">
              رقم الهاتف
            </label>
            <input
              type="text"
              placeholder={user.phoneNumber}
              value={numPhone}
              onChange={(e) => setNumPhone(e.target.value)}
              name="price"
              id="price"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            />
          </div>

          {/* Role */}
          <div>
            <label className=" apply-fonts-normal block mb-2 text-sm font-medium text-gray-900">
              الدور
            </label>
            <select
              id="role"
              className="apply-fonts-normal bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              defaultValue="user"
            >
              <option value="user" className="apply-fonts-normal">
                {user.role === "teacher"
                  ? "أستاذ"
                  : user.role === "admin"
                  ? "أدمن"
                  : "طالب"}
              </option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className={`apply-fonts-normal text-white  bg-mainColor  hover:bg-mainColorHoverLight hoverEle  focus:ring-4 focus:outline-none focus:ring-mainColor  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
              loading
                ? "animate-pulse bg-mainColorHoverLight cursor-not-allowed"
                : ""
            }`}
          >
            {loading ? "جاري التعديل " : "التعديل"}
          </button>
        </div>
      </form>
      {/* Edit Password */}
      <UpdatePassword />
    </div>
  );
};

export default Settings;
