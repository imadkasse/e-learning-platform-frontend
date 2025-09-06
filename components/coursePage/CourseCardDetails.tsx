"use client";
import React, { useEffect, useState } from "react";
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
  CheckCircle,
  RadioButtonUnchecked,
  PlayArrow,
  Share,
  Close,
} from "@mui/icons-material";
import Link from "next/link";
import { useLesson } from "@/store/lessonStore";
import { usePathname } from "next/navigation";
import showToast from "@/utils/showToast";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { Section } from "@/types/course";

type Props = {
  courseId: string | undefined;
  userId: string | undefined;
  sections: Section[];
};

const CourseCardDetails = ({ courseId, userId, sections }: Props) => {
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
  sections.forEach((section) => {
    section.videos.forEach((video) => {
      if (video.completedBy.includes(user._id)) {
        numberOfCompletedVideo++;
      }
    });
  });

  const { lesson, setLesson } = useLesson();

  const [isOpenAccordion, setIsOpenAccordion] = useState<
    {
      i: number;
      value: boolean;
    }[]
  >(
    sections.map((_, index) => {
      return { i: index, value: index === 0 }; // فتح القسم الأول افتراضياً
    })
  );
  const [loadingVideoId, setLoadingVideoId] = useState<string | null>(null);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);

  const toggleAccordion = (i: number) => {
    setIsOpenAccordion((prev) =>
      prev.map((item) =>
        item.i === i ? { ...item, value: !item.value } : item
      )
    );
  };

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handelOpenAndColsed = () => {
    setIsOpen(!isOpen);
  };

  const handleCompleteVideo = async (videoId: string) => {
    try {
      setLoadingVideoId(videoId);
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/${courseId}/videos/${videoId}/completed`,
        {},
        {
          withCredentials: true,
        }
      );
      const updatedLesson = res.data.lesson;
      setLesson(updatedLesson);
      //
      numberOfCompletedVideo++;
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

  const getTotalVideos = () => {
    return sections.reduce(
      (total, section) => total + section.videos.length,
      0
    );
  };

  const getCompletionPercentage = () => {
    const total = getTotalVideos();
    return total > 0 ? Math.round((numberOfCompletedVideo / total) * 100) : 0;
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handelOpenAndColsed}
        className={`fixed lg:hidden z-50 top-20 transition-all duration-500 ease-in-out
          ${
            isOpen
              ? "right-4 bg-gradient-to-r from-blue-600 to-purple-600"
              : "right-[320px] bg-gradient-to-r from-purple-600 to-blue-600"
          } 
          p-3 rounded-full shadow-2xl text-white hover:shadow-3xl transform hover:scale-110
          backdrop-blur-sm border border-white/20`}
      >
        <div className="flex items-center justify-center">
          {isOpen ? (
            <ArrowForwardIos className="text-lg" />
          ) : (
            <ArrowBackIos className="text-lg" />
          )}
        </div>
      </button>

      {/* Main Sidebar */}
      <div
        className={`transition-all duration-500 ease-in-out transform
          ${isOpen ? "xs:translate-x-full lg:translate-x-0" : "translate-x-0"}
          lg:w-[420px] xs:w-[320px] max-h-[90vh] lg:sticky lg:top-[80px]
          xs:fixed xs:top-16 xs:right-0 z-40 xs:bg-white/95 lg:bg-transparent
          backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl
          flex flex-col overflow-hidden`}
      >
        {/* Header with Progress */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 apply-fonts-medium">
              محتوى الدورة
            </h2>
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-white/80 rounded-lg transition-colors"
            >
              <Share className="text-gray-600" />
            </button>
          </div>

          {/* Progress Bar */}
          {user.role === "student" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  {numberOfCompletedVideo} من {getTotalVideos()} فيديو
                </span>
                <span>{getCompletionPercentage()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${getCompletionPercentage()}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Sections Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {sections.length > 0 ? (
            <div className="p-4 space-y-3">
              {sections.map((section, index) => {
                const sectionCompletedVideos = section.videos.filter((video) =>
                  video.completedBy.includes("as")
                ).length;

                return (
                  <div
                    key={section._id}
                    className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Section Header */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50/80 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg transition-colors ${
                            isOpenAccordion[index]?.value
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <PlayCircleOutlined className="text-lg" />
                        </div>
                        <div className="text-right">
                          <h3 className="font-semibold text-gray-800 apply-fonts-normal text-sm">
                            {section.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {section.videos.length} فيديو
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-green-500">
                            {sectionCompletedVideos}/{section.videos.length}
                          </div>
                        </div>
                        <ExpandMore
                          className={`text-gray-400 transition-transform duration-300 ${
                            isOpenAccordion[index]?.value ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Section Content */}
                    {isOpenAccordion[index]?.value && (
                      <div className="border-t border-gray-200/50">
                        {section.videos?.length ? (
                          <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                            {section.videos.map((video, videoIndex) => {
                              const isCompleted =
                                video.completedBy.includes(userId || "no") ||
                                completedVideos.includes(video._id);
                              const isActive = video === lesson;

                              return (
                                <div
                                  key={video._id}
                                  className={`group rounded-lg transition-all duration-200 ${
                                    isActive
                                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                                      : "hover:bg-gray-50 hover:shadow-sm"
                                  }`}
                                >
                                  <div
                                    className="p-3 cursor-pointer flex items-center justify-between"
                                    onClick={() => setLesson(video)}
                                  >
                                    <div className="flex items-center gap-3 flex-1">
                                      <div className="flex items-center">
                                        <span
                                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                                            isActive
                                              ? "bg-white/20 text-white"
                                              : "bg-gray-100 text-gray-600"
                                          }`}
                                        >
                                          {videoIndex + 1}
                                        </span>
                                      </div>

                                      {user.role !== "teacher" &&
                                        user.role !== "admin" && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleCompleteVideo(video._id);
                                            }}
                                            className="flex-shrink-0"
                                          >
                                            {loadingVideoId === video._id ? (
                                              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            ) : isCompleted ? (
                                              <CheckCircle
                                                className={`w-5 h-5 ${
                                                  isActive
                                                    ? "text-white"
                                                    : "text-green-500"
                                                }`}
                                              />
                                            ) : (
                                              <RadioButtonUnchecked
                                                className={`w-5 h-5 ${
                                                  isActive
                                                    ? "text-white/70"
                                                    : "text-gray-400"
                                                }`}
                                              />
                                            )}
                                          </button>
                                        )}

                                      <div className="flex-1 min-w-0">
                                        <h4
                                          className={`font-medium text-sm truncate ${
                                            isActive
                                              ? "text-white"
                                              : "text-gray-800"
                                          }`}
                                        >
                                          {video.lessonTitle}
                                        </h4>
                                      </div>
                                    </div>

                                    <div
                                      className={`flex items-center gap-1 text-xs ${
                                        isActive
                                          ? "text-white/80"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      <AccessTimeOutlined className="w-4 h-4" />
                                      <span>{video.duration}</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-gray-500 apply-fonts-normal">
                            لا توجد فيديوهات في هذا القسم
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              لا توجد أقسام متاحة حالياً
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">شارك الدورة</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Close className="text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${courseUrl}`}
                className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                target="_blank"
              >
                <Facebook className="text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-blue-800">
                  فيسبوك
                </span>
              </Link>

              <Link
                href={`https://twitter.com/intent/tweet?url=${courseUrl}`}
                className="flex flex-col items-center gap-2 p-4 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors group"
                target="_blank"
              >
                <Twitter className="text-sky-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-sky-800">تويتر</span>
              </Link>

              <Link
                href="#"
                className="flex flex-col items-center gap-2 p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors group"
              >
                <Instagram className="text-pink-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-pink-800">
                  إنستجرام
                </span>
              </Link>

              <button
                onClick={copyLink}
                className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <ContentCopyOutlined className="text-gray-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-800">
                  نسخ الرابط
                </span>
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  value={`${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                />
                <button
                  onClick={copyLink}
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors"
                >
                  نسخ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCardDetails;
