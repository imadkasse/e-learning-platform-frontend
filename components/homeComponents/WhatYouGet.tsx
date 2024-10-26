"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckBox } from "@mui/icons-material";

const WhatYouGet = () => {
  return (
    <div className=" my-24 flex items-center justify-between xs:flex-col  md:flex-row ">
      <motion.section
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:w-[600px] ">
          <h1 className="lg:text-[74px] sm:text-[40px] xs:text-[40px] apply-fonts-medium">
            فوائد الاشتراك
          </h1>
        </div>

        <div className="my-4 apply-fonts-normal">
          <h2 className="text-lg font-light">
            استفد من باقتنا الشاملة التي تتيح لك الوصول إلى دورات متخصصة بإشراف
            خبراء، وأدوات تعليمية تفاعلية، ودعم مستمر يساعدك على تحقيق أهدافك
            بكل ثقة. حسّن مهاراتك، ووسع معرفتك وانطلق في تجربة تعليمية متميزة.
          </h2>
        </div>

        <div className="flex flex-col gap-8  apply-fonts-normal">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-wygColor rounded-3xl py-2 px-9 flex items-center  gap-1 drop-shadow-xl"
          >
            <CheckBox className="text text-mainColor" fontSize="large" />
            <div>
              <h1 className="apply-fonts-medium text-lg">
                تجربة تعليمية تفاعلية:
              </h1>
              <p className="apply-fonts-normal text-sm text-gray-400 font-extralight">
                احصل على تجربة تعلم فريدة من خلال منصتنا التفاعلية التي تتكيف مع
                مستوى أدائك واحتياجاتك التعليمية.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-wygColor rounded-3xl py-2 px-9 flex items-center  gap-1 drop-shadow-xl"
          >
            <CheckBox className="text text-mainColor" fontSize="large" />
            <div>
              <h1 className="apply-fonts-medium text-lg">خطة دراسية مخصصة: </h1>
              <p className="apply-fonts-normal text-sm text-gray-400 font-extralight">
                احصل على خطة دراسية مصممة خصيصًا لك بناءً على نقاط قوتك وضعفك
                لضمان التفوق في امتحانات البكالوريا
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-wygColor rounded-3xl py-2 px-9 flex items-center  gap-1 drop-shadow-xl"
          >
            <CheckBox className="text text-mainColor" fontSize="large" />
            <div>
              <h1 className="apply-fonts-medium text-lg">
                اختبارات تقييمية دورية:
              </h1>
              <p className="apply-fonts-normal text-sm text-gray-400 font-extralight">
                استفد من الاختبارات التقييمية الدورية التي تساعدك على قياس تقدمك
                وتحسين أدائك.
              </p>
            </div>
          </motion.div>
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
            src={"/imgs/whatYouGetImg.png"}
            width={500}
            height={500}
            alt="whatYouGetImg"
            className="w-full h-full"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default WhatYouGet;
