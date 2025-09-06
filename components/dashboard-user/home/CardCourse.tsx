import { User, Play } from "lucide-react";
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
    <div className="my-1 drop-shadow-md border border-gray-200 rounded-xl bg-white hover:shadow-lg transition-shadow duration-300 w-full h-full flex flex-col justify-between px-4 py-5">
      {/* صورة الكورس */}
      <div className="w-full flex mb-4">
        <Image
          src={courseImg}
          alt={courseName}
          width={300}
          height={200}
          className="rounded-lg w-full h-48 object-cover"
        />
      </div>

      {/* عنوان الكورس */}
      <div className="mb-4">
        <h1 className="apply-fonts-medium text-lg text-gray-800 line-clamp-2">
          {courseName}
        </h1>
      </div>

      {/* إحصائيات الكورس */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex gap-2 items-center">
          <div className="text-mainColor p-1 bg-blue-50 rounded-full">
            <Play size={16} />
          </div>
          <div className="flex items-center gap-1">
            <span className="apply-fonts-normal text-gray-600">دروس</span>
            <span className="text-gray-800 font-medium">{numberOfVideo}</span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="text-mainColor p-1 bg-blue-50 rounded-full">
            <User size={16} />
          </div>
          <div className="flex items-center gap-1">
            <span className="apply-fonts-normal text-gray-600">تلاميذ</span>
            <span className="text-gray-800 font-medium">{studentsNumber}</span>
          </div>
        </div>
      </div>

      {/* شريط التقدم */}
      <div className="w-full mt-auto">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 apply-fonts-normal">
              التقدم
            </span>
            <span className="text-sm font-medium text-mainColor">
              {progresBar}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-progressBarCourseColor h-2 rounded-full transition-all duration-300"
              style={{ width: `${progresBar}%` }}
            ></div>
          </div>
        </div>
        <Link
          href={courseUrl}
          className="w-full block border-0 apply-fonts-normal bg-mainColor hoverEle hover:bg-mainColorHoverLight transition-colors duration-300 text-base text-center py-3 px-4 rounded-lg text-white font-medium shadow-sm hover:shadow-md"
        >
          متابعة الكورس
        </Link>
      </div>
    </div>
  );
};

export default CardCourse;
