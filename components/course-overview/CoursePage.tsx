import { AccessTimeOutlined, PlayCircleOutlined } from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";

import React from "react";
import CourseCard from "./CourseCard";
import VideoPlyr from "./VideoPlyr";

export const CoursePage = () => {
  return (
    <div className="mt-6 flex  flex-row-reverse justify-between gap-7 px-3 ">
      {/* Course Card */}
      <CourseCard />
      {/* Show Course  */}
      <div className="lg:custom-width-Course ">
        {/* title Of Course  */}
        <div>
          <h1 className="apply-fonts-medium text-lg">
            الوحدة الثالثة : دور البروتينات في التحفيز الإنزيمي
          </h1>
        </div>
        {/* Teacher Information */}
        <div className="my-5 border-b-2 py-4 flex items-center gap-3">
          <Image
            src={"/imgs/personImg.png"}
            alt="teacher-username"
            width={150}
            height={150}
            className="rounded-full xs:w-14 xs:h-14"
          />
          <div className="flex flex-col gap-1">
            <h3 className="apply-fonts-normal text-courseTextSection text-[14px]">
              أستاذ الدورة
            </h3>
            <h1 className="font-medium">kasse imad</h1>
          </div>
        </div>
        {/* Welcome video */}
        <VideoPlyr />
        {/* description Course */}
        <div className="my-4">
          <h1 className="apply-fonts-medium  text-lg mb-2">وصف الدورة</h1>
          <p className="apply-fonts-normal text-[14px] text-courseTextSection leading-8 pl-5 xs:line-clamp-4  md:line-clamp-6">
            تركز هذه الدورة على دراسة دور البروتينات في التحفيز الإنزيمي، وهو
            جزء أساسي من مادة العلوم الطبيعية لطلاب البكالوريا. سيتم تسليط الضوء
            على كيفية قيام الإنزيمات، التي تعتبر بروتينات متخصصة، بتسريع
            التفاعلات الكيميائية الحيوية في الجسم، مما يسمح بتحقيق التوازن
            البيولوجي وسير العمليات الخلوية بكفاءة عالية. من خلال هذه الوحدة،
            سيكتسب الطلاب فهماً شاملاً لآليات التحفيز الإنزيمي، بما في ذلك كيفية
            ارتباط الإنزيمات بالركائز وتكوين معقدات الإنزيم-ركيزة، إلى جانب
            العوامل التي تؤثر على نشاط الإنزيمات مثل درجة الحرارة، ودرجة
            الحموضة، والمثبطات، والمنشطات. كما سيتم استعراض أمثلة حية ودراسات
            حالة لفهم أدوار الإنزيمات في مسارات التمثيل الغذائي المختلفة، مثل
            الهضم، والطاقة، وتركيب البروتينات. تهدف هذه الدورة إلى تزويد الطلاب
            بالمعرفة النظرية والعملية الضرورية لفهم العمليات البيوكيميائية التي
            تدعم الحياة، وتعتبر هذه الوحدة خطوة أساسية في تحضيرهم لاجتياز امتحان
            البكالوريا بنجاح وتحقيق تفوق أكاديمي في مجال العلوم.
          </p>
        </div>
        {/* all videos */}
        <div>
          <div className="flex justify-between border-b">
            <h1 className="apply-fonts-medium  text-lg mb-2">المنهاج</h1>
            <div className="flex  gap-6 px-2">
              <div className="flex  items-center gap-1">
                <PlayCircleOutlined className="text-mainColor" />
                <h1 className="flex  items-center">
                  30
                  <span className="apply-fonts-normal text-[13px]">درس</span>
                </h1>
              </div>
              <div className="flex  items-center gap-1">
                <AccessTimeOutlined className="text-courseIconsSection" />
                <h1 className="flex  items-center">
                  30{" "}
                  <span className="apply-fonts-normal text-[13px]">ساعة</span>
                </h1>
              </div>
            </div>
          </div>
          <div>video overView</div>
        </div>
        {/* course reviews */}
        <div className="mt-5 flex  items-center justify-between">
          <h1 className="apply-fonts-medium  text-lg mb-2">تقييم الدورة</h1>
          <div className="flex items-center gap-1 px-3">
            <p className="font-bold text-[15px]">4.5</p>
            <Rating
              className="text-courseStarColor"
              dir="ltr"
              name="half-rating-read"
              value={4.5}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
        {/* stduents reviews */}
        <div className="mt-5">
          <h1 className="apply-fonts-medium  text-lg mb-8">أراء التلاميذ</h1>

          <div className="flex flex-col gap-5">
            <div className="border-b pb-3">
              <div className="flex items-center gap-2">
                <Image
                  src={"/imgs/personImg.png"}
                  alt="teacher-username"
                  width={150}
                  height={150}
                  className="rounded-full xs:w-12 xs:h-12"
                />
                <div className="flex flex-col gap-1 ">
                  <h1 className="font-semibold">imad</h1>
                  <Rating
                    className="text-courseStarColor"
                    dir="ltr"
                    name="half-rating-read"
                    value={4.5}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </div>
                <h1 className="text-xl px-1">|</h1>
                <div>
                  <h1 className="font-bold">2022-12-12</h1>
                </div>
              </div>
              <div dir="rtl" className=" mt-1 mx-3">
                <p className="p-2 apply-fonts-normal text-[14px] text-courseTextSection">
                  دورة جميل جدا تركز على كل المراحل بداية من أول درس إلى أخر
                  دروس مع التمارين والمتابعة من طرف الأستاذ
                </p>
              </div>
            </div>

            <div className="border-b pb-3">
              <div className="flex items-center gap-2">
                <Image
                  src={"/imgs/personImg.png"}
                  alt="teacher-username"
                  width={150}
                  height={150}
                  className="rounded-full xs:w-12 xs:h-12"
                />
                <div className="flex flex-col gap-1 ">
                  <h1 className="font-semibold">imad</h1>
                  <Rating
                    className="text-courseStarColor"
                    dir="ltr"
                    name="half-rating-read"
                    value={4.5}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </div>
                <h1 className="text-xl px-1">|</h1>
                <div>
                  <h1 className="font-bold">2022-12-12</h1>
                </div>
              </div>
              <div dir="rtl" className=" mt-1 mx-3">
                <p className="p-2 apply-fonts-normal text-[14px] text-courseTextSection">
                  دورة جميل جدا تركز على كل المراحل بداية من أول درس إلى أخر
                  دروس مع التمارين والمتابعة من طرف الأستاذ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
