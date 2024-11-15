import {
  AccessTimeOutlined,
  ContentCopyOutlined,
  Facebook,
  FileDownloadOutlined,
  Instagram,
  OnlinePredictionOutlined,
  PeopleAltOutlined,
  PlayCircleOutlined,
  Twitter,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const CoursePage = () => {
  return (
    <div className="mt-6 flex  flex-row-reverse justify-between gap-7 px-3 ">
      {/*Card Course */}
      <div className="border shadow-sm h-[80vh] lg:sticky lg:top-4 xs:fixed z-50 bg-wygColor  w-[400px] py-3 px-4 flex flex-col gap-6">
        {/* price */}
        <div className="w-full text-lg text-center">
          <h1 className="border-b border-courseTextSection">1700.00DA</h1>
        </div>
        <div className=" flex flex-col gap-1 py-2">
          {/* duration */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="apply-fonts-normal ">مدة الدورة </p>
              <AccessTimeOutlined className="text-courseTextSection" />
            </div>
            <h1 className="text-courseTextSection">
              48 <span className="text-[17px] apply-fonts-normal ">ساعة</span>{" "}
            </h1>
          </div>
          {/* student number */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="apply-fonts-normal ">عدد الطلاب </p>
              <PeopleAltOutlined className="text-courseTextSection" />
            </div>
            <h1 className="text-courseTextSection">4800</h1>
          </div>
        </div>

        <div className="">
          <button className="apply-fonts-normal w-full p-2 bg-mainColor text-white rounded-sm hover:bg-mainColorHoverLight hoverEle">
            الانضمام
          </button>
        </div>
        {/* course features */}
        <div className=" ">
          <p className="apply-fonts-medium mb-3">تتضمن هذه الدورة :</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 cursor-pointer">
              <AccessTimeOutlined className="text-courseIconsSection" />
              <p className="apply-fonts-normal text-[15px] text-courseTextSection">
                وصول الى دورة مدى الحياة
              </p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <FileDownloadOutlined className="text-courseIconsSection" />
              <p className="apply-fonts-normal text-[15px] text-courseTextSection">
                تحميل مجاني للملفات والتمارين
              </p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <OnlinePredictionOutlined className="text-courseIconsSection" />
              <p className=" text-[15px] text-courseTextSection">
                <span className="apply-fonts-normal">الدورة أونلاين</span> 100%
              </p>
            </div>
          </div>
        </div>
        {/* Share Course Links */}
        <div className="">
          <p className="apply-fonts-medium mb-3 ">شارك هذه الدورة :</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="#"
              className=" px-4 py-2 rounded-lg hover:border-gray-400 hoverEle bg-gray-100"
            >
              <Facebook className="text-courseTextSection" />
            </Link>
            <Link
              href="#"
              className="bg-gray-100 px-4 py-2 rounded-lg hover:border-gray-400 hoverEle"
            >
              <Twitter className="text-courseTextSection" />
            </Link>
            <Link
              href="#"
              className="bg-gray-100 px-4 py-2 rounded-lg hover:border-gray-400 hoverEle"
            >
              <Instagram className="text-courseTextSection" />
            </Link>
            <Link
              href="#"
              className="bg-gray-100 px-3 py-2 rounded-lg hover:border-gray-400 hoverEle flex items-center gap-1"
            >
              <h1 className="apply-fonts-normal text-[11px] text-gray-700">
                نسخ الرابط
              </h1>
              <ContentCopyOutlined className="text-courseTextSection" />
            </Link>
          </div>
        </div>
      </div>
      {/* Show Course  */}
      <div className="lg:custom-width-Course ">
        {/* title Of Course  */}
        <div>
          <h1 className="apply-fonts-medium text-lg">
            الوحدة الثالثة : دور البروتينات في التحفيز الإنزيمي
          </h1>
        </div>
        {/* Teacher Information */}
        <div className="my-5 flex items-center gap-3">
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
        <div className="w-full mt-5">
          <video src="/videos/videoEx.mp4" controls className="w-full ">
            متصفحك لا يدعم تشغيل الفيديو.
          </video>
        </div>
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
