"use client";
import showToast from "@/utils/showToast";
import { CloseOutlined } from "@mui/icons-material";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useSearchUser } from "@/store/searchUser";

type UserData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
  thumbnail: string;
};

const AddUser = () => {
  const [showAdd, setshowAdd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { setUsers } = useSearchUser();

  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
    thumbnail:
      "https://res.cloudinary.com/dwnhria2i/image/upload/v1732471265/nt0nghzhiorwgrd4zrv9.png",
  });

  const handelAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users`,
        userData,
        {
          withCredentials: true,
        }
      );
      showToast("success", "تمت الإضافة بنجاح");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/users`, {
        credentials: "include",
      });
      const data = await res.json();
      setUsers(data.users);
      setUserData({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "user",
        thumbnail:
          "https://res.cloudinary.com/dwnhria2i/image/upload/v1732471265/nt0nghzhiorwgrd4zrv9.png",
      });

      setshowAdd(false);
    } catch (error) {
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setshowAdd(!showAdd);
        }}
        className="apply-fonts-normal  py-2.5   rounded-lg text-white px-6 bg-mainColor hover:bg-mainColorHoverLight hoverEle"
      >
        إضافة
      </button>
      {showAdd && (
        <div className=" fixed bg-black/40 w-full top-0 left-0     px-4 py-5 h-[100vh]  z-10 flex flex-col justify-center ">
          <button
            className="text-right "
            onClick={() => {
              setshowAdd(false);
            }}
          >
            <CloseOutlined className="text-redColor hoverEle hover:text-redColorHoverLight hover:rotate-180" />
          </button>
          <div className=" w-full p-4 bg-white shadow-md rounded-lg">
            <h2 className="apply-fonts-medium text-2xl font-semibold text-mainColor mb-4">
              إضافة عضو جديد
            </h2>
            <form onSubmit={handelAddUser}>
              {/* الاسم */}
              <div className="mb-1">
                <label
                  htmlFor="name"
                  className="apply-fonts-normal block text-sm font-medium text-gray-700 mb-2"
                >
                  الاسم
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={(e) => {
                    setUserData({ ...userData, username: e.target.value });
                  }}
                  placeholder="أدخل اسم المستخدم"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainColor focus:border-mainColor"
                />
              </div>

              {/* البريد الإلكتروني */}
              <div className="mb-1">
                <label
                  htmlFor="email"
                  className="apply-fonts-normal block text-sm font-medium text-gray-700 mb-2"
                >
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                  placeholder="أدخل البريد الإلكتروني"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainColor focus:border-mainColor"
                />
              </div>

              {/* كلمة المرور */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="apply-fonts-normal block text-sm font-medium text-gray-700 mb-2"
                >
                  كلمة المرور
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainColor focus:border-mainColor"
                />
              </div>
              {/* تأكيد كلمة المرور */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="apply-fonts-normal block text-sm font-medium text-gray-700 mb-2"
                >
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userData.passwordConfirm}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      passwordConfirm: e.target.value,
                    });
                  }}
                  placeholder="أعد إدخل كلمة المرور"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainColor focus:border-mainColor"
                />
              </div>

              {/* اختيار الدور */}
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="apply-fonts-normal block text-sm font-medium text-gray-700 mb-2"
                >
                  الدور
                </label>
                <select
                  id="role"
                  name="role"
                  value={userData.role}
                  onChange={(e) => {
                    setUserData({ ...userData, role: e.target.value });
                  }}
                  className="apply-fonts-normal w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mainColor focus:border-mainColor"
                >
                  <option value="student">طالب</option>
                  <option value="teacher">معلم</option>
                  <option value="admin">أدمن</option>
                </select>
              </div>

              {/* زر الإرسال */}
              <button
                type="submit"
                className={`apply-fonts-normal w-full px-4 py-2 text-white  font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-mainColor ${
                  loading
                    ? "bg-mainColorHoverLight cursor-not-allowed"
                    : "bg-mainColor hover:bg-mainColorHoverLight"
                }`}
              >
                {loading ? "جاري الإضافة ..." : "إضافة"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUser;
