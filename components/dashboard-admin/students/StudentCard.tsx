"use client";
import showToast from "@/utils/showToast";
import { CloseOutlined } from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { useSearchUser } from "@/store/searchUser";
type Props = {
  studentName: string;
  studentEmail: string;
  studentJoinDate: string | undefined;
  studentId: string; // "active" or "inactive"
  studentImg: string;
  studentStatus: boolean;
};

const StudentCard = ({
  studentName,
  studentId,
  studentJoinDate,
  studentEmail,
  studentImg,
  studentStatus,
}: Props) => {
  const token = Cookies.get("token");

  const { setUsers } = useSearchUser();

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const [isActive, setisActive] = useState<boolean>();

  const handelActiveAccount = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/${studentId}`,
        { active: isActive },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showToast("success", "تم تغيير حالة الحساب بنجاح");
      setShowEdit(false);
    } catch (error) {
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handelDeleteUser = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoadingDelete(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users?page=1&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setUsers(data.users);
      showToast("success", "تم حذف الحساب بنجاح");
      setShowDelete(false);
    } catch (error) {
      // @ts-expect-error:fix
      showToast("error", error.response.data.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <div className="xs:flex-col xs:gap-3 sm:flex-row py-4 px-8 rounded-lg shadow-sm shadow-mainColor flex items-center justify-between my-2">
        <div className="flex  items-center gap-4 justify-center w-full">
          <div>
            <Image
              src={studentImg}
              width={100}
              height={100}
              alt="StudentImg"
              className="w-14 h-14 rounded-full"
            />
          </div>
          <div>
            <h1 className="apply-fonts-normal text-lg">{studentName}</h1>
            <h1 className="text-gray-500">{studentEmail}</h1>
          </div>
        </div>

        <div className="w-full text-center">
          <p className="text-xl">{studentJoinDate}</p>
        </div>

        <div className="flex gap-2 w-full justify-center">
          <button
            onClick={() => {
              setShowDelete(!showDelete);
            }}
            className={`bg-redColor hoverEle hover:bg-redColorHoverLight apply-fonts-normal px-5 py-2.5 rounded-3xl text-white`}
          >
            حذف
          </button>
          <button
            onClick={() => {
              setShowEdit(!showEdit);
            }}
            className="apply-fonts-normal text-white  bg-mainColor  hover:bg-mainColorHoverLight hoverEle  focus:ring-4 focus:outline-none focus:ring-mainColor  font-medium rounded-3xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            تعديل
          </button>
        </div>
      </div>
      {/* Edit User  */}
      {showEdit && (
        <div className="rounded-xl absolute bg-black/40 w-full h-full   top-0 left-0 flex flex-col items-center justify-center gap-3 ">
          <div className="rounded-xl flex flex-col justify-center gap-4 bg-wygColor w-96 h-72  px-6">
            <button
              className="text-right mb-4"
              onClick={() => {
                setShowEdit(false);
              }}
            >
              <CloseOutlined className="text-redColor hoverEle hover:text-redColorHoverLight hover:rotate-180" />
            </button>
            <div className="flex flex-col gap-3">
              <h1 className="apply-fonts-normal  ">
                الطالب : <span>{studentName}</span>
              </h1>
              <select
                id="countries"
                className="apply-fonts-normal text-sm rounded-lg  block w-full p-2.5 "
                onChange={(e) => {
                  setisActive(e.target.value === "true" ? true : false);
                }}
              >
                <option className="apply-fonts-normal">
                  {studentStatus === true ? "مفعل" : "غير مفعل "}
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
                ${loading && "opacity-50 cursor-not-allowed"}`}
            >
              {loading ? "جاري التعديل..." : "تعديل حالة الحساب"}
            </button>
          </div>
        </div>
      )}
      {/* Delete User */}
      {showDelete && (
        <div className="rounded-xl fixed bg-black/40 lg:custom-width h-full top-0 left-0 flex flex-col items-center justify-center gap-3 ">
          <div className="rounded-xl flex flex-col justify-center gap-4 bg-wygColor py-2  px-6">
            <h1 className="apply-fonts-normal">
              هل أنت متأكد من حذف هذا المستخدم !
            </h1>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => {
                  setShowDelete(false);
                }}
                className={`apply-fonts-normal text-white  bg-mainColor  hover:bg-mainColorHoverLight hoverEle   rounded-3xl text-sm px-5 py-2.5 text-center 
                `}
              >
                إلغاء
              </button>
              <button
                onClick={handelDeleteUser}
                className={`apply-fonts-normal text-white  bg-redColor  hover:bg-redColorHoverLight hoverEle     rounded-3xl text-sm px-5 py-2.5 text-center 
                ${loadingDelete && "opacity-50 cursor-not-allowed"}`}
              >
                {loadingDelete ? "جاري الحذف ..." : "حذف"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentCard;
