"use client";
import showToast from "@/utils/showToast";
import { CloseOutlined } from "@mui/icons-material";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSearchUser } from "@/store/searchUser";
import { User } from "@/types/user";

type Props = {
  userName: string;
  userEmail: string;
  userJoinDate: string | undefined;
  userImg: string;
  userRole: string; // Admin, Teacher, student
  userId: string;
  userStatus: boolean;
};
const AdminCardPage = ({
  userName,
  userJoinDate,
  userEmail,
  userImg,
  userRole,
  userId,
  userStatus,
}: Props) => {
  const token = Cookies.get("token");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
  const [isActive, setisActive] = useState<boolean>();

  const { setUsers } = useSearchUser();
  const handelDeleteUser = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(
        data.users.filter(
          (user: User) => user.role === "admin" || user.role === "teacher"
        )
      );
      setShowDeleteModal(false);
      showToast("success", "تم حذف هذا المستخدم بنجاح");
      // update the list of users
    } catch (error) {
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    } finally {
      setShowDeleteModal(false);
    }
  };
  const handelActiveAccount = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoadingEdit(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/${userId}`,
        { active: isActive },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(
        data.users.filter(
          (user: User) => user.role === "admin" || user.role === "teacher"
        )
      );
      showToast("success", "تم تغيير حالة الحساب بنجاح");
      setShowEditModal(false);
    } catch (error) {
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    } finally {
      setLoadingEdit(false);
    }
  };
  return (
    <>
      <div className="xs:flex-col  xs:items-center xs:gap-3 sm:flex-row py-4 px-8 rounded-lg my-2 shadow-sm  shadow-mainColor flex items-center justify-between">
        <div className="w-full text-center ">
          <h1 className="apply-fonts-normal text-lg">{userRole}</h1>
        </div>

        <div className="flex xs:flex-col md:flex-row  items-center gap-3 w-full ">
          <div>
            <Image
              src={userImg}
              width={100}
              height={100}
              alt="userImg"
              className=" w-12 h-12    rounded-full"
            />
          </div>
          <div className="">
            <h1 className="apply-fonts-normal lg:text-lg">{userName}</h1>
            <h1 className="text-gray-500 xs:block sm:hidden xl:block">
              {userEmail}
            </h1>
          </div>
        </div>

        <div className="w-full ">
          <p className="md:text-xl ">{userJoinDate}</p>
        </div>

        <div className="flex gap-2 w-full justify-center">
          <button
            onClick={() => {
              setShowEditModal(!showEditModal);
            }}
            className="apply-fonts-normal text-white  bg-mainColor  hover:bg-mainColorHoverLight hoverEle  focus:ring-4 focus:outline-none focus:ring-mainColor  font-medium rounded-3xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            تعديل
          </button>
          <button
            onClick={() => {
              setShowDeleteModal(!showDeleteModal);
            }}
            className={`bg-redColor text-white hoverEle hover:bg-redColorHoverLight py-2 px-4 rounded-3xl apply-fonts-normal`}
          >
            حذف
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <div className="rounded-xl fixed bg-black/40 w-full h-full top-0 left-0 z-30 flex flex-col justify-center py-6 px-10">
          <div className="w-full bg-wygColor rounded-xl">
            
            <div className="my-4 flex flex-col gap-5">
              <p className="apply-fonts-normal text-center">
                هل أنت متأكد من حذف هذا المستخدم{" "}
                <span className="font-bold underline">({userName})</span> !
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                  }}
                  className="apply-fonts-normal  px-4 py-2 text-white  font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-mainColor bg-mainColor hover:bg-mainColorHoverLight hoverEle"
                >
                  إلغاء
                </button>
                <button
                  onClick={handelDeleteUser}
                  className="apply-fonts-normal  px-4 py-2 text-white  font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-redColor bg-redColor hover:bg-redColorHoverLight hoverEle"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="rounded-xl fixed bg-black/40 w-full h-full top-0 left-0 flex flex-col items-center justify-center gap-3 ">
          <div className="rounded-xl flex flex-col justify-center gap-4 bg-wygColor w-96 h-72  px-6">
            <button
              className="text-right mb-4"
              onClick={() => {
                setShowEditModal(false);
              }}
            >
              <CloseOutlined className="text-redColor hoverEle hover:text-redColorHoverLight hover:rotate-180" />
            </button>
            <div className="flex flex-col gap-3">
              <h1 className="apply-fonts-normal  ">
                الطالب : <span>{userName}</span>
              </h1>
              <select
                id="countries"
                onChange={(e) => setisActive(e.target.value === "true")}
                className="apply-fonts-normal text-sm rounded-lg  block w-full p-2.5 "
              >
                <option className="apply-fonts-normal">
                  {userStatus ? "مفعل" : "غير مفعل "}
                </option>
                <option value="true" className="apply-fonts-normal">
                  تنشيط
                </option>
                <option value="false" className="apply-fonts-normal">
                  إلغاء التنشيط
                </option>
              </select>
            </div>
            <button
              onClick={handelActiveAccount}
              className={`apply-fonts-normal text-white  bg-mainColor  hover:bg-mainColorHoverLight hoverEle  focus:ring-4 focus:outline-none focus:ring-mainColor  font-medium rounded-3xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                      ${loadingEdit && "opacity-50 cursor-not-allowed"}`}
            >
              {loadingEdit ? "جاري التعديل..." : "تعديل حالة الحساب"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCardPage;
