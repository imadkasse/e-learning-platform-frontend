"use client";
import { LocalLibrary, PlayArrow, StarOutlined } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import showToast from "@/utils/showToast";

const HeaderHome = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("inactive") === "true") {
      showToast(
        "error",
        "الحساب غير مفعل حاليا، الرجاء التواصل مع الدعم لتفعيله"
      );
    }
  }, [searchParams]);
  return (
    <div className=" my-24 flex items-center justify-between xs:flex-col md:flex-row overflow-hidden">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="lg:w-[600px] lg:h-[200px] ">
          <h1 className="lg:text-[74px] sm:text-[40px] xs:text-[40px] apply-fonts-medium">
            دليلك لتفوق في شهادة البكالوريا
          </h1>
        </div>

        <div className="my-4 apply-fonts-normal">
          <h2 className="text-xl font-light">
            انضم إلى آلاف الطلاب الذين حققوا التفوق من خلال دوراتنا .
          </h2>
        </div>

        <div className="flex gap-3 font-semibold ">
          <Link
            href={"/courses"}
            className="bg-mainColor hoverEle hover:bg-mainColorHoverLight  py-2 px-4 rounded-lg text-white"
          >
            التحق بدوراتنا
          </Link>
          <button className="border-mainColor hoverEle hover:bg-mainColor hover:text-white  border-2 rounded-lg py-2 px-4">
            تواصل معنا
          </button>
        </div>

        <div className="flex w-full my-5 lg:gap-6 xs:gap-2">
          <div className="flex flex-row-reverse items-center sm:gap-4 xs:gap-1  ">
            <div className="flex flex-col">
              <h1 className="font-bold">+1000</h1>
              <p className="apply-fonts-normal line-clamp-2">تلميذ مسجل</p>
            </div>
            <div className="p-2 rounded-full bg-mainColor h-10 w-10  flex items-center justify-center text-white">
              <LocalLibrary />
            </div>
          </div>
          <div className="flex flex-row-reverse items-center gap-4">
            <div className="flex flex-col">
              <h1 className="font-bold">+100</h1>
              <p className="apply-fonts-normal line-clamp-2">ساعة من المحتوى</p>
            </div>
            <div className="p-2 rounded-full bg-mainColor h-10 w-10 flex items-center justify-center text-white">
              <PlayArrow />
            </div>
          </div>
          <div className="flex flex-row-reverse items-center gap-4">
            <div className="flex flex-col">
              <h1 className="font-bold">4.6</h1>
              <p className="apply-fonts-normal">تقيم التلاميذ</p>
            </div>
            <div className="p-2 rounded-full bg-mainColor h-10 w-10 flex items-center justify-center text-white">
              <StarOutlined />
            </div>
          </div>
        </div>
      </motion.div>
      <section className=" w-full flex md:justify-end sm:justify-center ">
        <motion.div
          className="xl:w-[500px] xl:h-[500px] lg:w-[410px] lg:h-[410px] md:w-[350px] md:h-[350px]  xs:w-[300px] xs:h-[300px] "
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={"/imgs/headerImg.png"}
            width={500}
            height={500}
            alt="headerImg"
            className="w-full h-full"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default HeaderHome;
