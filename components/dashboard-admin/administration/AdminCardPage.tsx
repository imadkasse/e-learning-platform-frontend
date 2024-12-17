import Image from "next/image";
import React from "react";
type Props = {
  userName: string;
  userEmail: string;
  userJoinDate: string | undefined;
  userImg: string;
  userRole: string; // Admin, Teacher, student
};
const AdminCardPage = ({
  userName,
  userJoinDate,
  userEmail,
  userImg,
  userRole,
}: Props) => {
  return (
    <div className="xs:flex-col xs:items-center xs:gap-3 sm:flex-row py-4 px-8 rounded-lg my-2 shadow-sm  shadow-mainColor flex items-center justify-between">
      <div className="w-full text-center ">
        <h1 className="apply-fonts-normal text-lg">{userRole}</h1>
      </div>

      <div className="flex  items-center gap-3 w-full ">
        <div>
          <Image
            src={userImg}
            width={100}
            height={100}
            alt="userImg"
            className=" w-12 h-12   rounded-full"
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
