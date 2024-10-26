"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const WhyUs = () => {
  return (
    <div className=" my-24 flex items-center justify-between xs:flex-col  md:flex-row ">
      <motion.section
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:w-[600px] lg:h-[200px] ">
          <h1 className="lg:text-[74px] sm:text-[40px] xs:text-[40px] apply-fonts-medium">
            منصتنا تفاعلية وذكية
          </h1>
        </div>

        <div className="my-4 apply-fonts-normal">
          <h2 className="text-xl font-light">
            منصتنا تفاعلية وذكية، تتيح لك التعلم بطريقة مخصصة وفريدة تناسب
            احتياجاتك الفردية.
          </h2>
        </div>

        <div className="flex   apply-fonts-normal">
          <button className="bg-mainColor hoverEle hover:bg-mainColorHoverLight text-lg py-2 px-4 rounded-lg text-white">
            تصفح الدورات
          </button>
        </div>
      </motion.section>
      <section className=" w-full flex md:justify-end sm:justify-center ">
        <motion.div
          className="xl:w-[500px] xl:h-[500px] lg:w-[410px] lg:h-[410px] md:w-[350px] md:h-[350px]  xs:w-[300px] xs:h-[300px] "
          animate={{
            y: [0, 25],
          }}
          transition={{
            duration: 1, // مدة الحركة (2 ثانية)
            ease: "easeInOut",
            repeat: Infinity, // اجعل الحركة تتكرر باستمرار
            repeatType: "reverse", // حركة ذهاب وعودة
          }}
        >
          <Image
            src={"/imgs/pcImg.png"}
            width={500}
            height={500}
            alt="pcImg"
            className="w-full h-full"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default WhyUs;
