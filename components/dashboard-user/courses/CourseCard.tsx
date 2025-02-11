import { PeopleOutlineOutlined, PlayLesson } from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Props = {
  courseId: string;
  courseImg: string;
  courseName: string;
  courseDescription: string;
  students: number;
  numberOfVideo: number;
  coursePrice: number;
  courseRating: number;
};
const CourseCard = ({
  courseName,
  students,
  numberOfVideo,
  courseImg,
  coursePrice,
  courseRating,
  courseDescription,
  courseId,
}: Props) => {
  return (
    <div className="my-1 drop-shadow-md border  w-full  border-gray-200   flex flex-col justify-between px-3 py-4   ">
      <div className="w-full flex ">
        <Image
          src={courseImg}
          alt="course1"
          width={300}
          height={200}
          className="rounded-lg w-full h-full"
        />
      </div>

      <div className="mt-1 py-2">
        <h1 className="apply-fonts-medium lg:text-md xs:text-sm line-clamp-1">
          {courseName}
        </h1>
      </div>
      <div className="my-1">
        <h1 className="apply-fonts-normal text-[12px] h-10  line-clamp-2 text-courseTextSection">
          {courseDescription}
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-5 my-1 ">
        <div className="flex gap-1 items-center">
          <div className="text-mainColor text-lg">
            <PlayLesson fontSize="inherit"/>
          </div>
          <div className="flex items-center lg:text-sm text-[13px]">
            <span className="apply-fonts-normal ">دروس</span>
            <p>:{numberOfVideo}</p>
          </div>
        </div>
        <div className="flex gap-1 ">
          <div className="text-mainColor flex items-center gap-1">
            <PeopleOutlineOutlined />
            <span className="lg:text-sm text-black text-[15px]">{students}</span>
          </div>
          <div className="flex items-center">
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between  my-1">
        <div className="py-1">
          <p className="font-medium lg:text-sm  text-[14px]" dir="ltr">
            {coursePrice === 0 ? "مجانا" : `${coursePrice}DA`}
          </p>
        </div>

        <div className="flex ">
          <Rating
            readOnly
            value={courseRating}
            precision={0.5}
            dir="ltr"
            className="text-courseIconsSection lg:text-lg text-[15px]"
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-2">
        <Link
          href={`/course-overview/${courseId}`}
          className="w-full text-center apply-fonts-normal bg-mainColor hoverEle hover:bg-mainColorHoverLight lg:text-sm text-[14px] py-2 px-2 lg:px-4 rounded-lg text-white"
        >
          تفاصيل الدوراة
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
