import React from "react";
import NotificationCard from "./NotificationCard";

const Notifcations = () => {
  return (
    <div className="h-[94vh] lg:custom-width rounded-xl px-4 py-5 ">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">إشعارتك</h1>
      </div>
      <div>
        <NotificationCard
          lessonNumber={10}
          notifcationDate={"2012-12-12"}
          notifcationImg={"/imgs/logoImg.png"}
          notifcationName={"إشعار جديد"}
        />
      </div>
    </div>
  );
};

export default Notifcations;
