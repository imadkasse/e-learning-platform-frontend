"use client";
import React, { useState } from "react";
import {
  AccessTimeOutlined,
  ArrowBackIos,
  ArrowForwardIos,
  ContentCopyOutlined,
  ExpandMore,
  Facebook,
  Instagram,
  PlayCircleOutlined,
  Twitter,
} from "@mui/icons-material";
import Link from "next/link";
import { Lesson } from "@/types/lesson";
import { useLesson } from "@/store/lessonStore";
import { usePathname } from "next/navigation";
import showToast from "@/utils/showToast";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserStore } from "@/store/userStore";

type Props = {
  courseId: string | undefined;
  userId: string | undefined;
  courseVideos: Lesson[] | undefined;
};


const CourseCardDetails = ({ courseVideos, courseId, userId }: Props) => {
  
  const token = Cookies.get("token");
  const pathname = usePathname();

  const { user } = useUserStore();

  const courseUrl = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`
  );
  const copyLink = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`
    );
    showToast("success", "تم نسخ الرابط ");
  };

  let numberOfCompletedVideo = 0;
  if (courseVideos) {
    courseVideos.map((video) => {
      if (video.completedBy?.includes(userId || "")) {
        numberOfCompletedVideo++;
      }
    });
  }

  const { lesson, setLesson } = useLesson();

  const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(true);
  const [loadingVideoId, setLoadingVideoId] = useState<string | null>(null);
  //TODO: can you remove and replace with better logic
  const [completedVideos, setCompletedVideos] = useState<string[]>([]); // fix the error in mark as completed
  const toggleAccordion = () => setIsOpenAccordion((prev) => !prev);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handelOpenAndColsed = () => {
    setIsOpen(!isOpen);
  };
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60); // حساب الدقائق
    const remainingSeconds = seconds % 60; // حساب الثواني المتبقية
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const handleCompleteVideo = async (videoId: string) => {
    try {
      setLoadingVideoId(videoId);
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}/videos/${videoId}/completed`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedLesson = res.data.lesson;
      setLesson(updatedLesson);

      setCompletedVideos((prev) =>
        prev.includes(videoId)
          ? prev.filter((id) => id !== videoId)
          : [...prev, videoId]
      );

      showToast("success", "تم تمكين الفيديو بنجاح");
    } catch (error) {
      //@ts-expect-error:fix agin
      showToast("error", error.response.data.message);
    } finally {
      setLoadingVideoId(null);
    }
  };
  //! changed this (add sections)
  return (
    <>
      <button
        onClick={handelOpenAndColsed}
        className={` transition-all duration-300 ease-in-out ${
          isOpen ? "xs:ml-0 lg:hidden" : "lg:ml-[402px] xs:ml-[302px] lg:hidden"
        } xs:fixed lg:hidden z-50 py-2 sm:px-4 xs:px-2  rounded-lg bg-mainColor text-white hover:bg-mainColorHoverLight hoverEle`}
      >
        {isOpen ? (
          <div className="flex items-center gap-3">
            <ArrowForwardIos />
            <h1 className="apply-fonts-normal text-[13px] xs:hidden sm:block">
              محتوى الدورة
            </h1>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <h1 className="apply-fonts-normal text-[13px]  xs:hidden sm:block">
              محتوى الدورة
            </h1>
            <ArrowBackIos />
          </div>
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "xs:hidden lg:flex" : "lg:w-[400px] xs:w-[300px]"
        } border shadow-sm max-h-[85vh]  lg:sticky lg:top-[96px] lg:bottom-5   xs:fixed z-10 xs:bg-wygColor  w-[400px] py-3 px-4 flex flex-col gap-5  `}
      >   
        {/* Title & course Details (Videos and progress) */}
        <section className="flex flex-col gap-3">
          <div className="w-full text-lg  ">
            <h1 className="border-b pt-1 pb-2 border-courseTextSection apply-fonts-normal ">
              محتوى الدورة
            </h1>
          </div>

          {/* course Details (Videos and progress)*/}
          <div className="border border-gray-300">
            {/* عنوان Accordion */}
            <div className="flex items-center justify-between bg-gray-300 py-2 px-1 cursor-pointer">
              <button onClick={toggleAccordion}>
                {isOpenAccordion ? (
                  <ExpandMore className="text-gray-600 transition-transform duration-300" />
                ) : (
                  <ExpandMore className="text-gray-600 transition-transform duration-300 rotate-180" />
                )}
              </button>
              <div className="flex gap-6 px-2">
                <div className="flex items-center gap-1">
                  <PlayCircleOutlined className="text-mainColor" />
                  <h1 className="flex items-center">
                    {courseVideos?.length}
                    <span className="apply-fonts-normal text-[13px] mr-1">
                      محاضرة
                    </span>
                  </h1>
                </div>
              </div>
              <div>
                <h1 className="font-semibold text-green-400">
                  {numberOfCompletedVideo}/{courseVideos?.length}
                </h1>
              </div>
            </div>

            {/* محتوى Accordion */}
            {isOpenAccordion && ( // عرض المحتوى فقط إذا كان الـ Accordion مفتوحًا
              <div className="py-2 px-2 overflow-y-scroll max-h-72 ">
                {courseVideos?.length ? (
                  courseVideos.map((l) => (
                    <div
                      key={l._id}
                      className={`my-2 py-1 px-2 ${
                        l === lesson
                          ? "bg-mainColorHoverLight/60"
                          : " hover:bg-mainColorHoverLight"
                      } group hoverEle`}
                      onClick={() => {
                        setLesson(l);
                      }}
                    >
                      <div
                        className={`flex items-center justify-between ${
                          l === lesson ? "text-white" : "group-hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {loadingVideoId === l._id ? (
                            // Spinner أثناء التحميل
                            <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : user.role === "teacher" ||
                            user.role === "admin" ? (
                            <></>
                          ) : (
                            <input
                              type="checkbox"
                              className="w-4 h-4 cursor-pointer"
                              checked={
                                l.completedBy.includes(userId || "no") ||
                                completedVideos.includes(l._id)
                              }
                              onChange={() => {
                                handleCompleteVideo(l._id);
                              }}
                            />
                          )}
                          <h1 className="font-semibold text-base">
                            {l.lessonTitle}
                          </h1>
                        </div>

                        <div
                          className={`flex items-center gap-1 ${
                            l === lesson
                              ? "text-white"
                              : "group-hover:text-white"
                          }`}
                        >
                          <AccessTimeOutlined />

                          <p>
                            {
                              //@ts-expect-error:fix
                              formatDuration(l.duration.toFixed())
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="apply-fonts-normal">لا توجد أي دروس حاليا</h1>
                )}
              </div>
            )}
          </div>
        </section>
        {/* Share Course Links */}
        <div className="">
          <p className="apply-fonts-medium mb-3 ">شارك هذه الدورة :</p>
          <div className="flex gap-4 justify-center">
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${courseUrl}`}
              className=" px-4 py-2 rounded-lg hover:border-gray-400 hoverEle bg-gray-100 border"
            >
              <Facebook className="text-courseTextSection" />
            </Link>
            <Link
              href={`https://twitter.com/intent/tweet?url=${courseUrl}`}
              className="bg-gray-100 px-4 py-2 rounded-lg hover:border-gray-400 hoverEle border"
            >
              <Twitter className="text-courseTextSection" />
            </Link>
            <Link
              href="#"
              className="bg-gray-100 px-4 py-2 rounded-lg hover:border-gray-400 hoverEle border"
            >
              <Instagram className="text-courseTextSection" />
            </Link>
            <button
              onClick={copyLink}
              className="bg-gray-100 border px-3 py-2 rounded-lg hover:border-gray-400 hoverEle flex items-center gap-1"
            >
              <h1 className="apply-fonts-normal text-[11px] text-gray-700">
                نسخ الرابط
              </h1>

              <ContentCopyOutlined
                sx={{ fontSize: "14px" }}
                className="text-courseTextSection "
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCardDetails;
