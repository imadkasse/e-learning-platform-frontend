import React from "react";
import MsgCard from "./MsgCard";

const Support = () => {
  return (
    <div className="r lg:custom-width rounded-xl px-4 py-5 ">
      <h1 className="apply-fonts-normal text-2xl font-semibold ">الرسائل</h1>
      <div className=" grid grid-cols-1 mt-7">
        <MsgCard />
        <MsgCard />
        <MsgCard />

      </div>
    </div>
  );
};

export default Support;
