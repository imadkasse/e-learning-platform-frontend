"use client";
import React, { useState } from "react";
import { useCoursesStore } from "@/store/coursesStore";
import { Close, PeopleOutlineOutlined, PlayLesson } from "@mui/icons-material";
import { Rating } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import showToast from "@/utils/showToast";

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
  const [isOpen, setisOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { courses, setCourses } = useCoursesStore();

  const token = Cookies.get("token");

  const handleDeleteCourse = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(
        courses.filter((course) => {
          return course._id !== courseId;
        })
      );
      showToast("success", "تم حذف الكورس بنجاح ");
    } catch (error) {
      //@ts-expect-error:fix agin
      showToast("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="my-3 shadow shadow-gray-400 bg-wygColor  flex flex-col max-h-[80vh]  justify-between px-3 py-4 rounded-lg">
        <Link href={`/course/${courseId}`}>
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
        </Link>

        <div className="mt-3">
          <h1 className="apply-fonts-medium text-[16px] line-clamp-1">
            {courseName}{" "}
          </h1>
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
          <button
            onClick={() => {
              setisOpen(!isOpen);
            }}
            className="xs:text-[12px] xl:text-lg apply-fonts-normal bg-redColor hoverEle hover:bg-redColorHoverLight py-2 px-4 rounded-lg text-white"
          >
            حذف الدوراة
          </button>
          <Link
            href={`/edit-course/${courseId}`}
            className="xs:text-[12px] xl:text-lg apply-fonts-normal bg-mainColor hoverEle hover:bg-mainColorHoverLigh py-2 px-2 rounded-lg text-white"
          >
            تعديل الدوراة
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 lg:custom-width rounded-xl h-[100vh] px-4 my-3  z-10 bg-black/50 flex items-center justify-center">
          <div className=" apply-fonts-normal bg-white w-80 z-10 rounded-lg">
            <button
              onClick={() => {
                setisOpen(false);
              }}
              className=""
            >
              <Close
                fontSize="medium"
                className="text-redColor hoverEle hover:text-redColorHoverLight"
              />
            </button>

            <p className="text-center">هل أنت متأكد من حذف هذه الدورة</p>
            <div className="flex justify-center gap-4 mt-4 mb-2">
              <button
                onClick={() => {
                  setisOpen(false);
                }}
                className="apply-fonts-normal  py-2 px-4 rounded-lg bg-mainColor hover:bg-mainColorHoverLight text-white hoverEle"
              >
                إلغاء
              </button>
              <button
                onClick={handleDeleteCourse}
                className={`apply-fonts-normal  py-2 px-4 rounded-lg ${
                  loading
                    ? "cursor-not-allowed bg-redColorHoverLight "
                    : "bg-redColor hover:bg-redColorHoverLight"
                } text-white hoverEle`}
              >
                {loading ? "جاري الحذف..." : "حذف الدورة"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
