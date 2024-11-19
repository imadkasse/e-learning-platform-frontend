"use client";
import VideoPlyr from "@/components/course-overview/VideoPlyr";
import { useCourseFormStore } from "@/store/courseFormStore";
import {
  ArrowForward,
  DeleteOutlined,
  EditOutlined,
  Remove,
  SaveOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideosAndFiles = () => {
  const [imageCoverStr, setimageCoverStr] = useState("/imgs/course2.png");

  const router = useRouter();
  const {
    videos,
    imageCover,
    files,
    title,
    description,
    setFormData,
    setRestForm,
  } = useCourseFormStore();

  useEffect(() => {
    console.log(videos.length, imageCover, files);
  }, [videos, imageCover, files]);

  const handleNext = () => {
    if (videos.length === 0) {
      toast.error("يرجي إضافة فيديو على الأقل", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className:
          "bg-white text-black dark:bg-gray-800 dark:text-white apply-fonts-normal",
      });
      return;
    } else if (imageCover === "") {
      toast.error("يرجي إضافة صورة مصغرة ", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className:
          "bg-white text-black dark:bg-gray-800 dark:text-white apply-fonts-normal",
      });
    } else if (files.length === 0) {
      toast.error("يرجي إضافة ملف  على الأقل ", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className:
          "bg-white text-black dark:bg-gray-800 dark:text-white apply-fonts-normal",
      });
    } else {
      router.push("/add-course/summary");
    }
  };
  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div className="bg-wygColor rounded-lg shadow-lg shadow-mainColor py-5 px-4">
      <h2 className="apply-fonts-medium text-3xl">معلومات متقدمة</h2>
      <section className="my-7">
        {/* Image Cover */}
        <div className="">
          <h2 className="apply-fonts-normal mb-2">الصورة المصغرة</h2>
          <div className="flex md:gap-3 md:flex-row  items-center xs:flex-col xs:gap-2 ">
            <Image
              src={imageCoverStr || `/imgs/course1.png`}
              width={500}
              height={500}
              alt="course-imgs"
              className="w-52 h-40 rounded-xl"
            />
            <label className="flex flex-col items-center justify-center h-full  ">
              <div className="flex flex-col items-start gap-3  pt-5 pb-6">
                <h2 className="apply-fonts-normal">
                  أضف صورة مصغرة للدورة تكون بإمتداد JPG, JPEG , PNG , SVG
                </h2>
                <h2 className=" bg-secondColor py-2 px-6 group cursor-pointer  rounded-lg flex items-center gap-2">
                  <ArrowForward className="text-white group-hover:text-mainColor hoverEle" />
                  <p className="text-mainColor  apply-fonts-normal">
                    إرفع صورة
                  </p>
                </h2>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  setimageCoverStr(URL.createObjectURL(e.target.files[0]));
                  setFormData("imageCover", [...imageCover, e.target.files[0]]);
                }}
              />
            </label>
          </div>
        </div>
        {/* Videos and lessons*/}
        <div className="my-7">
          <h2 className="apply-fonts-normal mb-2">الدروس </h2>
          <div className=" rounded-lg flex w-full md:justify-between xs:justify-center xs:flex-col xs:gap-3 sm:flex-row sm:justify-between items-center bg-gray-300 px-5">
            <label className=" flex flex-col gap-1 ">
              <h1 className="apply-fonts-normal">إسم الدرس </h1>
              <input type="text" className="border-2 " />
            </label>
            <label className=" flex flex-col it  justify-center  ">
              <div className="flex flex-col items-start gap-3 ">
                <h2 className=" bg-secondColor py-2 px-6 group cursor-pointer  rounded-lg flex items-center gap-2">
                  <ArrowForward className="text-white group-hover:text-mainColor hoverEle" />
                  <p className="text-mainColor  apply-fonts-normal">
                    إرفع فيديو
                  </p>
                </h2>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setFormData("videos", [...videos, e.target.files[0]]);
                }}
              />
            </label>
            <label className=" flex flex-col items-center justify-center  ">
              <div className="flex flex-col items-start gap-3  pt-5 pb-6">
                <h2 className=" bg-secondColor py-2 px-6 group cursor-pointer  rounded-lg flex items-center gap-2">
                  <ArrowForward className="text-white group-hover:text-mainColor hoverEle" />
                  <p className="text-mainColor  apply-fonts-normal">إرفع ملف</p>
                </h2>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setFormData("files", [...files, e.target.files[0]]);
                }}
              />
            </label>
          </div>
        </div>
        {/* lessons added */}
        <div className="my-4 flex flex-col gap-3">
          <div className="border w-full rounded-md bg-gray-300 py-2 px-5 flex md:justify-between xs:justify-center xs:flex-col sm:flex-row sm:justify-between xs:gap-3 items-center ">
            <div className="">
              {/* title  and description */}
              <h1 className="apply-fonts-normal">
                {title || "الرجاء إضافة كروس"}
              </h1>
              <h1 className="apply-fonts-normal text-[11px] max-w-60 text-courseTextSection mt-2 line-clamp-2">
                {description}
              </h1>
            </div>
            <div className=" rounded-md text-white cursor-pointer flex flex-col gap-2">
              {videos.length > 0 &&
                videos.map((file, i) => {
                  return (
                    <h1
                      key={i}
                      className="bg-secondColor text-mainColor p-2 rounded-md font-light flex justify-between"
                      dir="ltr"
                    >
                      <p>{file.name}</p>
                      <p className="ml-2">-{i+1}</p>
                    </h1>
                  );
                })}
            </div>
            <div className="    text-white cursor-pointer flex flex-col gap-2">
              {files.length > 0 &&
                files.map((file, i) => {
                  return (
                    <h1
                      key={i}
                      className="bg-mainColor p-2 rounded-md font-light"
                      dir="ltr"
                    >
                      {file.name}
                    </h1>
                  );
                })}
            </div>
            {/* Delete All */}
            <div className="flex gap-2 items-center">
              <button
                className="text-redColor"
                onClick={() => {
                  setRestForm();
                }}
              >
                <DeleteOutlined />
              </button>
            </div>
          </div>
        </div>
        {/* btn */}
        <button
          onClick={handleNext}
          className="bg-mainColor text-center text-white flex gap-2 hover:bg-mainColorHoverLight hoverEle items-center     font-medium rounded-lg text-sm px-5 py-2.5  "
        >
          <SaveOutlined />
          <p className="apply-fonts-normal"> حفظ و متابعة</p>
        </button>
      </section>
    </div>
  );
};

export default VideosAndFiles;
