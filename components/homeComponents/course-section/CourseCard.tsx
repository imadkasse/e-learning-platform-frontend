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
};

const CourseCard = ({
  courseName,
  studentsNumber,
  numberOfVideo,
  courseUrl,
  courseImg,
}: Props) => {
  return (
    <div className="my-3 shadow-lg shadow-mainColor bg-wygColor  flex flex-col justify-between px-3 py-4 rounded-lg">
      <div className="w-full flex ">
        <Image
          src={courseImg}
          alt={`course-${courseUrl}`}
          width={300}
          height={200}
          className="rounded-lg w-full h-full"
        />
      </div>

      <div className="mt-1">
        <h1 className="apply-fonts-medium text-base">{courseName} </h1>
      </div>

      <div className="flex items-center gap-5 my-3 ">
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
      <div className="apply-fonts-normal mt-2">
        <Link
          href={`/course-overview/${courseUrl}`}
          className="bg-mainColor hoverEle hover:bg-mainColorHoverLight text-lg py-2 px-4 rounded-lg text-white"
        >
          تصفح الدوراة
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
