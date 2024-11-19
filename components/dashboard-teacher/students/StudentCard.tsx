import Image from "next/image";
import React from "react";
type Props = {
  studentName: string;
  studentEmail: string;
  studentJoinDate: string;
  studentStatus: boolean; // "active" or "inactive"
  studentImg: string;
};

const StudentCard = ({
  studentName,
  studentStatus,
  studentJoinDate,
  studentEmail,
  studentImg,
}: Props) => {
  return (
    <div className="xs:flex-col xs:gap-3 sm:flex-row py-4 px-8 rounded-lg shadow-md shadow-mainColor flex items-center justify-between">
      <div className="flex  items-center gap-3 justify-center w-full">
        <div>
          <Image
            src={`/imgs/${studentImg}.png`}
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
          className={`${
            studentStatus ? "bg-succsseColor" : "bg-redColor"
          } py-2 px-4 rounded-3xl apply-fonts-normal `}
        >
          {studentStatus ? "مفعل" : "غير مفعل "}
        </button>
        <button
          type="submit"
          className="apply-fonts-normal text-white  bg-mainColor  hover:bg-mainColorHoverLight hoverEle  focus:ring-4 focus:outline-none focus:ring-mainColor  font-medium rounded-3xl text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          تعديل
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
