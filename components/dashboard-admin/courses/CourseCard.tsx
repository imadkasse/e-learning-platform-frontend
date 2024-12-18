"use client";
import showToast from "@/utils/showToast";
import { Person, PlayLesson } from "@mui/icons-material";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { useSearchCourse } from "@/store/searchCourse";

type Props = {
  courseId: string;
  courseImg: string;
  courseName: string;
  students: number;
  numberOfVideo: number;
  coursePrice: number;
};
const CourseCard = ({
  courseId,
  courseName,
  students,
  numberOfVideo,
  courseImg,
  coursePrice,
}: Props) => {
  const token = Cookies.get("token");
  const [loadingBtn, setloadingBtn] = useState<boolean>(false);
  const { setCourses } = useSearchCourse();

  const handelDelete = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setloadingBtn(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast("success", "تم حذف الكورس بنجاح");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/`
      );
      const data = await res.json();
      setCourses(data.courses);
    } catch (error) {
      //@ts-expect-error:fix
      showToast("error", error.response.data.message);
    } finally {
      setloadingBtn(false);
    }
  };
  return (
    <div className="my-3 shadow-lg shadow-mainColor/60 bg-wygColor  flex flex-col justify-between px-3 py-4 rounded-lg">
      <div className="w-full flex ">
        <Image
          src={courseImg}
          alt="course1"
          width={300}
          height={200}
          className="rounded-lg w-full h-full"
        />
      </div>

      <div className="mt-3">
        <h1 className="apply-fonts-medium text-base">{courseName} </h1>
      </div>

      <div className="flex items-center justify-between gap-5 my-3 ">
        <div className="flex gap-1 items-center">
          <div className="text-mainColor">
            <PlayLesson />
          </div>
          <div className="flex items-center">
            <span className="apply-fonts-normal">دروس</span>
            <p>:{numberOfVideo}</p>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <div className="text-mainColor">
            <Person />
          </div>
          <div className="flex items-center">
            <span className="apply-fonts-normal ml-1">التلاميذ:</span>
            {students}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handelDelete}
          className={`apply-fonts-normal  text-lg py-2 px-4 rounded-lg text-white ${
            loadingBtn
              ? "bg-redColorHoverLight cursor-not-allowed"
              : "bg-redColor hoverEle hover:bg-redColorHoverLight"
          }`}
        >
          {loadingBtn ? "جاري الحذف ... " : "حذف الدورة"}
        </button>
        <p className="text-xl uppercase font-light" dir="ltr">
          {coursePrice}.00 da
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
