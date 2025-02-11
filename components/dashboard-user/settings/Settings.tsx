"use client";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import showToast from "@/utils/showToast";
import UpdatePassword from "@/components/utlisComponenets/UpdatePassword";
import Spinner from "@/components/spinner/Spinner";

const Settings = () => {
  const router = useRouter();
  const token = Cookies.get("token");

  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const { loading } = useUserStore();

  const user = useUserStore((state) => state.user);

  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [numPhone, setNumPhone] = useState(user.phoneNumber);
  const [image, setImage] = useState<File>();

  if (loading) {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[93vh] ">
        <Spinner />
      </div>
    );
  }



  const handelupdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("thumbnail", image);
    }
    formData.append("username", name);
    formData.append("email", email);
    formData.append("phoneNumber", numPhone);
    setLoadingUpdate(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/updateMe`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast("success", "تم تحديث البيانات بنجاح ");

      router.refresh();
    } catch (error) {
      console.log(error);
      //@ts-expect-error:fix error agin
      showToast("success", error.response.data.message);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div className=" lg:custom-width rounded-xl px-4 py-5 h-[93vh]  overflow-y-scroll">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold">
          إعدادات الحساب
        </h1>
      </div>
      {user && (
        <form onSubmit={handelupdate}>
          {/* Image */}
          <div className="flex flex-col  justify-center gap-3 ">
            <label className="apply-fonts-normal block mb-2 text-sm font-medium text-gray-900">
              الصورة
            </label>
            <Image
              src={user.thumbnail ? user.thumbnail : "/imgs/personImg.png"}
              width={150}
              height={150}
              alt="personImg"
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
            <div>
              <label className="apply-fonts-normal block mb-2 text-sm font-medium text-gray-900">
                رقم الهاتف
              </label>
              <input
                type="text"
                value={numPhone}
                placeholder={user.phoneNumber}
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
                  {user.role === "student"
                    ? "طالب"
                    : user.role === "admin"
                    ? "أدمن"
                    : "أستاذ"}
                </option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className={`apply-fonts-normal text-white ${
                loadingUpdate
                  ? "animate-pulse bg-mainColorHoverLight cursor-not-allowed"
                  : ""
              }  bg-mainColor  hover:bg-mainColorHoverLight hoverEle  focus:ring-4 focus:outline-none focus:ring-mainColor  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
            >
              {loadingUpdate ? "جاري التعديل..." : "التعديل"}
            </button>
          </div>
        </form>
      )}
      {/* Edit Password*/}
      <UpdatePassword />
    </div>
  );
};

export default Settings;
