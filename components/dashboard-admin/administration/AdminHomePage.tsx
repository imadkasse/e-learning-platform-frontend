import React from "react";
import AdminCardPage from "./AdminCardPage";

const AdminHomePage = () => {
  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 ">
      <div className="mb-5 flex items-center lg:gap-6 ">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الإدارة </h1>

        <form className="flex items-center flex-grow">
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 pointer-events-none  ">
              <svg
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="apply-fonts-normal  block w-full ps-10 p-2.5  rounded-3xl   focus:border-red-400 "
              placeholder="البحث..."
              required
            />
          </div>
          <button className="apply-fonts-normal  py-2.5 mx-3 rounded-lg text-white px-4 bg-mainColor hover:bg-mainColorHoverLight hoverEle">
            إبحث
          </button>
        </form>
        <button className="apply-fonts-normal  py-2.5   rounded-lg text-white px-6 bg-mainColor hover:bg-mainColorHoverLight hoverEle">
          إضافة
        </button>
      </div>
      <div>
        <div className="xs:hidden sm:flex mb-4 w-full rounded-lg bg-mainColor text-white py-4 px-8  justify-between">
          <div className="apply-fonts-normal   flex w-full justify-center">
            نوع الحساب
          </div>
          <div className="apply-fonts-normal   flex w-full justify-center">
            الشخص
          </div>
          <div className="apply-fonts-normal  flex w-full justify-center">
            التاريخ
          </div>
          <div className="apply-fonts-normal  flex w-full justify-center">
            تعديل | حدف
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <AdminCardPage
            studentImg="course1"
            studentEmail="email@exmple.com"
            studentJoinDate="2023-12-12"
            studentName="عماد"
            studentRole="أدمن"
          />
          <AdminCardPage
            studentImg="course2"
            studentEmail="email@exmple.com"
            studentJoinDate="2023-12-12"
            studentName="محمد"
            studentRole="أستاذ"
          />
          <AdminCardPage
            studentImg="course3"
            studentEmail="email@exmple.com"
            studentJoinDate="2023-12-12"
            studentName="عبد الله"
            studentRole="أستاذ"
          />
          <AdminCardPage
            studentImg="course3"
            studentEmail="email@exmple.com"
            studentJoinDate="2023-12-12"
            studentName="عبد الإله"
            studentRole="أدمن"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
