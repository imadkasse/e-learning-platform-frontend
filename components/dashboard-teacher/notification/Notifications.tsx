import React from "react";
import NotificationCard from "./NotificationCard";
import Link from "next/link";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import axios from "axios";

const Notifcations = async () => {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token")?.value;

  let user: User;

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res.data.user);
      user = res.data.user;
    } catch (err) {
      console.log(err);
    }
  };

  await fetchUser();

  //@ts-expect-error:fix in After time
  if (!token || user.role !== "teacher") {
    return (
      <div className="bg-wygColor lg:custom-width rounded-xl px-4 py-5 h-[100vh] ">
        <h1 className="apply-fonts-normal sm:text-3xl mt-5 w-full col-span-3 text-center text-mainColor ">
          أنت غير مسجل أو لا تملك الصلاحية للوصول الى هذه الصفحة
        </h1>
        <div className="mt-5 flex justify-center ">
          <Link
            href={"/login"}
            className="apply-fonts-normal py-2 px-4  bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white rounded-lg"
          >
            سجل الدخول من هنا
          </Link>
        </div>
      </div>
    );
  }
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
