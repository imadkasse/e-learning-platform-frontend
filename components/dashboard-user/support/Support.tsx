import React from "react";

const Support = () => {
  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 min-h-screen flex justify-center items-center">
      <form className="flex flex-col gap-4 w-96">
        <div>
          <input
            type="text"
            placeholder="الإسم"
            className="w-full px-4 py-3 text-gray-700  text-md rounded-md"
          />
        </div>
        <div>
          <textarea className="w-full px-4 py-3 text-gray-700  text-md rounded-md h-36" />
        </div>
        <button className="w-full px-4 py-3 text-sm font-medium text-white bg-mainColor rounded-md hover:bg-mainColorHoverLight hoverEle">
          إرسال
        </button>
      </form>
    </div>
  );
};

export default Support;
