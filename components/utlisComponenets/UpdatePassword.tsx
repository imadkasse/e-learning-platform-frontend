"use client";
import showToast from "@/utils/showToast";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

const UpdatePassword = () => {
  const token = Cookies.get("token");

  const [loadingUpdatePassword, setloadingUpdatePassword] =
    useState<boolean>(false);

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloadingUpdatePassword(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/updatePassword`,
        { currentPassword, password, passwordConfirm },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirm("");

      showToast("success", "تم تغيير كلمة المرور بنجاح");
    } catch (error) {
      // @ts-expect-error: fix error agin
      showToast("error", error.response.data.message);
    } finally {
      setloadingUpdatePassword(false);
    }
  };
  return (
    <>
      <h2 className="apply-fonts-medium  my-5">تحديث كلمة المرور</h2>
      <form className="space-y-4" onSubmit={handleUpdatePassword}>
        {/* current password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="apply-fonts-normal  block text-sm font-medium text-gray-700"
          >
            كلمة المرور القديمة
          </label>
          <input
            id="currentPassword"
            type="password"
            placeholder="*********"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        {/* new password */}
        <div>
          <label
            htmlFor="password"
            className="apply-fonts-normal  block text-sm font-medium text-gray-700"
          >
            كلمة المرور الجديدة
          </label>
          <input
            id="password"
            placeholder="*********"
            type="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* confirm password  */}
        <div>
          <label
            htmlFor="passwordConfirm"
            className="apply-fonts-normal block text-sm font-medium text-gray-700"
          >
            تأكيد كلمة المرور الجديدة
          </label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="*********"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`py-2 px-4  text-white font-medium rounded-md shadow-sm ${
            loadingUpdatePassword
              ? "bg-mainColorHoverLight cursor-not-allowed "
              : "bg-mainColor hoverEle hover:bg-mainColorHoverLight "
          } focus:outline-none focus:ring-4 focus:ring-mainColor focus:ring-offset-4`}
        >
          {loadingUpdatePassword
            ? "جاري تحديث كلمة السر ..."
            : "تحديث كلمة السر "}
        </button>
      </form>
    </>
  );
};

export default UpdatePassword;
