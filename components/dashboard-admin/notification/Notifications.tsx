import React from "react";
import NotificationCard from "./NotificationCard";


const Notifcations = () => {
  return (
    <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 ">
      <div className="mb-5">
        <h1 className="apply-fonts-normal text-2xl font-semibold ">إشعارتك</h1>
      </div>
      <div>
        <NotificationCard
          lessonNumber={20}
          notifcationDate="2024/08/16"
          notifcationImg="course1.png"
          notifcationName="تمت اضافة درس جديد لوحدة تركيب البروتين"
        />
        <NotificationCard
          lessonNumber={24}
          notifcationDate="2024/09/118"
          notifcationImg="course2.png"
          notifcationName="تم الرد عليك "
        />
        <NotificationCard
          lessonNumber={24}
          notifcationDate="2024/09/118"
          notifcationImg="course3.png"
          notifcationName="تم الرد عليك "
        />
        <NotificationCard
          lessonNumber={24}
          notifcationDate="2024/09/118"
          notifcationImg="course4.png"
          notifcationName="تم الرد عليك "
        />
        <NotificationCard
          lessonNumber={24}
          notifcationDate="2024/09/118"
          notifcationImg="course4.png"
          notifcationName="تم الرد عليك "
        />
        <NotificationCard
          lessonNumber={24}
          notifcationDate="2024/09/118"
          notifcationImg="course4.png"
          notifcationName="تم الرد عليك "
        />
      </div>
    </div>
  );
};

export default Notifcations;
