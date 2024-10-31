import Image from "next/image";
import React from "react";
type Props = {
  studentName: string;
  studentEmail: string;
  studentJoinDate: string;
  studentImg: string;
  studentRole: string; // Admin, Teacher, Student
};
const AdminCardPage = ({
  studentName,
  studentJoinDate,
  studentEmail,
  studentImg,
  studentRole,
}: Props) => {
  return (
    <div className="xs:flex-col xs:gap-3 sm:flex-row py-4 px-8 rounded-lg shadow-md shadow-mainColor flex items-center justify-between">
      <div className="w-full text-center">
        <h1 className="apply-fonts-normal text-lg">{studentRole}</h1>
      </div>

      <div className="flex  items-center gap-3 w-full  ">
        <div>
          <Image
            src={`/imgs/${studentImg}.png`}
            width={100}
            height={100}
            alt="StudentImg"
            className="lg:w-12 lg:h-12  xs:hidden rounded-full"
          />
        </div>
        <div className="">
          <h1 className="apply-fonts-normal lg:text-lg">{studentName}</h1>
          <h1 className="text-gray-500">{studentEmail}</h1>
        </div>
      </div>

      <div className="w-full text-center">
        <p className="md:text-xl ">{studentJoinDate}</p>
      </div>

      <div className="flex gap-2 w-full justify-center">
        <button
          type="submit"
          className="apply-fonts-normal text-white  bg-mainColor  hover:bg-mainColorHoverLight hoverEle  focus:ring-4 focus:outline-none focus:ring-mainColor  font-medium rounded-3xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          تعديل
        </button>
        <button
          className={`bg-redColor text-white hoverEle hover:bg-redColorHoverLight py-2 px-4 rounded-3xl apply-fonts-normal`}
        >
          حذف
        </button>
      </div>
    </div>
  );
};

export default AdminCardPage;
