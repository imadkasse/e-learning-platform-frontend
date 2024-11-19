import {
  ChatBubbleOutlineOutlined,
  DescriptionOutlined,
} from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import VideoPlyr from "./VideoPlyr";
import CourseCardDetails from "./CourseCardDetails";

const CoursePage = () => {
  return (
    <div className="mt-6 flex  flex-row-reverse justify-between gap-7 px-3 ">
      {/* Course Details */}
      <CourseCardDetails />
      {/* Show Course */}
      <div className="lg:custom-width-Course ">
        {/* Welcome video */}
        <VideoPlyr />
        {/* Video Title */}
        <div className="my-4">
          <h1 className="apply-fonts-medium  xs:text-lg lg:text-2xl mb-2">
            المقدمة
          </h1>
        </div>
        {/* student number and  number of reviews */}
        <div className="my-4 flex justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-row-reverse -space-x-4 ">
              <Image
                width={150}
                height={150}
                className="w-10 h-10 border-2 rounded-full border-white"
                src="/imgs/personImg.png"
                alt="personImg"
              />
              <Image
                width={150}
                height={150}
                className="w-10 h-10 border-2 rounded-full border-white"
                src="/imgs/personImg.png"
                alt="personImg"
              />
              <Image
                width={150}
                height={150}
                className="w-10 h-10 border-2 rounded-full border-white"
                src="/imgs/personImg.png"
                alt="personImg"
              />
              <Image
                width={150}
                height={150}
                className="w-10 h-10 border-2 rounded-full border-white"
                src="/imgs/personImg.png"
                alt="personImg"
              />
            </div>
            <h2 className="flex flex-col -gap-2">
              <p className="font-semibold">512</p>
              <span className="apply-fonts-normal text-[13px] text-courseTextSection">
                تلميذ
              </span>
            </h2>
          </div>
          <div>
            <h2 className="flex flex-col -gap-2">
              <p className="font-semibold">512</p>
              <span className="apply-fonts-normal text-[13px] text-courseTextSection">
                تعليق
              </span>
            </h2>
          </div>
        </div>
        {/* description Course */}
        <div className="my-4">
          <h1 className="apply-fonts-medium xs:text-lg lg:text-2xl mb-2">
            وصف الدورة
          </h1>
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
        {/* Course Fiels */}
        <div className="my-4">
          <h1 className="apply-fonts-medium  xs:text-lg lg:text-2xl mb-2">
            ملفات الدرس
          </h1>
          <div className="bg-wygColor py-4 px-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DescriptionOutlined
                sx={{ fontSize: "44px" }}
                className="text-courseIconsSection"
              />
              <div>
                <h1 className="text-md font-medium">ملخص الدرس.pdf</h1>
                <p className="text-courseTextSection" dir="">
                  12.9MB
                </p>
              </div>
            </div>

            <div>
              <button className="apply-fonts-normal py-2 px-3 bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white ">
                تحميل الملف
              </button>
            </div>
          </div>
        </div>

        {/* stduents reviews */}
        <div className="mt-5">
          <h1 className="mb-8 flex items-center gap-1">
            <span className="apply-fonts-medium  xs:text-lg lg:text-2xl">
              التعليقات
            </span>
            <p className="font-bold text-courseTextSection">(12)</p>
          </h1>

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
          <form className="flex w-full gap-3 my-5">
            <button
              type="submit"
              className="apply-fonts-normal rounded-lg py-2 px-4 bg-mainColor hover:bg-mainColorHoverLight hoverEle text-white "
            >
              نشر
            </button>
            <div className="flex-grow">
              <label className="relative ">
                <ChatBubbleOutlineOutlined className="absolute top-0 text-courseTextSection mx-1" />
                <input
                  type="text"
                  className="w-full text-courseTextSection rounded-xl  px-7 py-2 border-2 border-gray-400 focus:border-mainColor focus:outline-none"
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
