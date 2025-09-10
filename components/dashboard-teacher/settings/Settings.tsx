"use client";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import showToast from "@/utils/showToast";
import UpdatePassword from "@/components/utlisComponenets/UpdatePassword";
import Spinner from "@/components/spinner/Spinner";
import { User } from "@/types/user";
interface Props {
  userFetcher: User | null;
}

const Settings = ({ userFetcher }: Props) => {
  const router = useRouter();
  const [loading, setloading] = useState<boolean>(false);

  const loadingUser = useUserStore((state) => state.loading);

  const { user, setUser } = useUserStore();

  const [name, setName] = useState(userFetcher?.username || "");
  const [email, setEmail] = useState(userFetcher?.email || "");
  const [numPhone, setNumPhone] = useState(userFetcher?.phoneNumber || "");
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    if (userFetcher) setUser(userFetcher);
  }, [userFetcher, setUser]);

  if (loadingUser) {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
        <Spinner />
      </div>
    );
  }

  const handelupdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name?.trim()) {
      showToast("error", "الاسم مطلوب");
      return;
    }

    if (!email?.trim()) {
      showToast("error", "البريد الإلكتروني مطلوب");
      return;
    }
    if (!numPhone?.trim()) {
      showToast("error", "رقم الهاتف مطلوب");
      return;
    }
    const formData = new FormData();
    if (image) {
      formData.append("thumbnail", image);
    }
    formData.append("username", name);
    formData.append("email", email);
    formData.append("phoneNumber", numPhone);
    setloading(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/updateMe`,
        formData,
        {
          withCredentials: true,
        }
      );
      showToast("success", "تم تحديث البيانات بنجاح ");
      router.refresh();
    } catch (error) {
      //@ts-expect-error:fix error agin
      showToast("error", error.response.data.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className=" lg:custom-width rounded-xl px-4 py-5 h-[94vh] overflow-y-scroll">
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
              value={name}
              placeholder={user.username}
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
              value={email}
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            />
          </div>

          {/* Phone Number */}
          <div className="col-span-2">
            <label className="apply-fonts-normal  block mb-2 text-sm font-medium text-gray-900">
              رقم الهاتف
            </label>
            <input
              type="text"
              value={numPhone}
              placeholder={user.phoneNumber}
              onChange={(e) => setNumPhone(e.target.value)}
              name="phone"
              id="phone"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            />
          </div>

          {/* Role */}
          {/* <div>
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
          </div> */}
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
