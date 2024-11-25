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
    <div className="my-3 shadow-lg shadow-mainColor/60 bg-wygColor  flex flex-col max-h-[80vh]  justify-between px-3 py-4 rounded-lg">
      <div className="relative min-w-full max-w-sm ">
        <Image
          src={courseImg}
          alt="Course-imageCover"
          layout="responsive"
          width={705}
          height={397}
          className="rounded-lg object-cover " // تأكد من أن الصورة تغطي الحاوية بدون تشويه
        />
      </div>

      <div className="mt-3">
        <h1 className="apply-fonts-medium text-[16px] line-clamp-1">{courseName} </h1>
      </div>
      <div className="">
        <h1 className="apply-fonts-normal text-[12px] line-clamp-1 text-courseTextSection">
          {courseDescription}
        </h1>
      </div>

      <div className="flex items-center justify-between  ">
        <div className="flex gap-1 items-center">
          <div className="text-mainColor">
            <PlayLesson />
          </div>
          <div className="flex items-center">
            <p className="font-semibold">{numberOfVideo}</p>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <div className="text-mainColor">
            <PeopleOutlineOutlined />
          </div>
          <div className="flex items-center">
            <p className="font-semibold">{students}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between  my-2">
        <div className="py-1">
          <p className="font-medium " dir="ltr">
            {coursePrice}DA
          </p>
        </div>

        <div className="flex ">
          <Rating
            readOnly
            value={courseRating}
            precision={0.5}
            dir="ltr"
            className="text-courseIconsSection"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Link
          href={`/${courseId}`}
          className="xs:text-[12px] xl:text-lg apply-fonts-normal bg-redColor hoverEle hover:bg-redColorHoverLight py-2 px-4 rounded-lg text-white"
        >
          حذف الدوراة
        </Link>
        <Link
          href={`/edit-course/${courseId}`}
          className="xs:text-[12px] xl:text-lg apply-fonts-normal bg-mainColor hoverEle hover:bg-mainColorHoverLigh py-2 px-2 rounded-lg text-white"
        >
          تعديل الدوراة
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
