import { Person, PlayLesson } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  courseImg: string;
  courseName: string;
  students: number;
  numberOfVideo: number;
  courseUrl: string;
  coursePrice: number;
};
const CourseCard = ({
  courseName,
  students,
  numberOfVideo,
  courseUrl,
  courseImg,
  coursePrice,
}: Props) => {
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
        <Link
          href={courseUrl}
          className="apply-fonts-normal bg-redColor hoverEle hover:bg-redColorHoverLight text-lg py-2 px-4 rounded-lg text-white"
        >
          حذف الدوراة
        </Link>
        <p className="text-xl uppercase font-light" dir="ltr">
          {coursePrice}.00 da
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
