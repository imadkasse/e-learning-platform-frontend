import { Person, PlayLesson } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  courseImg: string;
  courseName: string;
  studentsNumber: number;
  numberOfVideo: number;
  courseUrl: string;
  progresBar: number;
};
const CardCourse = ({
  courseName,
  studentsNumber,
  numberOfVideo,
  courseUrl,
  courseImg,
  progresBar,
}: Props) => {
  return (
    <div className="my-1 drop-shadow-md border  w-full h-full  border-gray-200   flex flex-col justify-between   px-3 py-4   ">
      <div className="w-full flex ">
        <Image
          src={courseImg}
          alt="course1"
          width={300}
          height={200}
          className="rounded-lg w-full h-full"
        />
      </div>
      <div className="mt-1">
        <h1 className="apply-fonts-medium text-base">{courseName} </h1>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-5 my-3 ">
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
            <span className="apply-fonts-normal">تلاميذ</span>
            <p>:{studentsNumber}</p>
          </div>
        </div>
      </div>
      {/* progress bar */}
      <div className="w-full">
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4 dark:bg-gray-700">
          <div
            className="bg-progressBarCourseColor h-6 rounded-full "
            style={{ width: `${progresBar}%` }}
          ></div>
        </div>

        <Link
          href={courseUrl}
          className="w-full block border apply-fonts-normal mt-2 bg-mainColor hoverEle hover:bg-mainColorHoverLight  text-lg text-center py-2 px-4 rounded-full text-white"
        >
          متابعة
        </Link>
      </div>
    </div>
  );
};

export default CardCourse;
