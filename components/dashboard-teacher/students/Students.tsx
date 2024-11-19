import React from "react";
import StudentCard from "./StudentCard";

const Students = () => {
  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 ">
      <div className="mb-5 flex items-center gap-6">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">الطلاب</h1>
        <form className="flex items-center flex-grow">
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute  inset-y-0 start-0 flex items-center ps-3 pointer-events-none  ">
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
          <button className="apply-fonts-normal py-2.5 mx-3 rounded-lg text-white px-4 bg-mainColor hover:bg-mainColorHoverLight hoverEle">
            إبحث
          </button>
        </form>
      </div>
      <div className="">
        <div className="xs:hidden sm:flex mb-4 w-full rounded-lg bg-mainColor text-white py-4 px-8  justify-between">
          <h1 className="apply-fonts-normal flex w-full justify-center">التلميذ</h1>
          <h1 className="apply-fonts-normal flex w-full justify-center ">تاريخ</h1>
          <h1 className="apply-fonts-normal flex w-full justify-center">حالة الحساب</h1>
        </div>
        <div className="flex flex-col gap-6">
          <StudentCard
          studentImg='course1'
            studentName="عماد"
            studentEmail="im@gm.com"
            studentJoinDate="2014-12-12"
            studentStatus={true}
          />
          <StudentCard
          studentImg='course2'
            studentName="محمد"
            studentEmail="ims@gm.com"
            studentJoinDate="2016-10-12"
            studentStatus={false}
          />
          <StudentCard
          studentImg='course3'
            studentName="عمر"
            studentEmail="omar@gm.com"
            studentJoinDate="2024-10-12"
            studentStatus={true}
          />
          <StudentCard
          studentImg='course4'
            studentName="عادل "
            studentEmail="adel@gm.com"
            studentJoinDate="2024-10-12"
            studentStatus={false}
          />
          <StudentCard
          studentImg='course3'
            studentName="نسيم "
            studentEmail="adel@gm.com"
            studentJoinDate="2024-10-12"
            studentStatus={true}
          />
          <StudentCard
          studentImg='course2'
            studentName="إسلام "
            studentEmail="adel@gm.com"
            studentJoinDate="2024-10-12"
            studentStatus={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Students;
