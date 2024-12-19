import React from "react";

type Props = {
  username: string;
  subject: string;
  description: string;
  date: string;
};

const MsgCard = ({ username, subject, date, description }: Props) => {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-4 ">
        <h2 className="text-lg font-semibold apply-fonts-normal">
          استفسار عن الطلب
        </h2>
        <p className="text-sm text-gray-500 ">من:{username}</p>
        <p className="text-sm text-gray-500">التاريخ:{date}</p>
        <p className="mt-2 text-gray-700 line-clamp-3">{description}</p>
        <div className="flex justify-between apply-fonts-normal">
          <button className="mt-4 bg-mainColor text-white py-1 px-3 rounded hover:bg-mainColorHoverLight hoverEle ">
            عرض المزيد
          </button>
          <button className="mt-4 border-2 border-mainColor text-black py-1 px-3 rounded hover:bg-mainColorHoverLight hoverEle hover:text-white">
            رد
          </button>
        </div>
      </div>
      <div>
        <form></form>
      </div>
    </>
  );
};

export default MsgCard;
