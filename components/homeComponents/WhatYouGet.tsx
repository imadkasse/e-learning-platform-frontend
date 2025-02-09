"use client";
import React from "react";
import Image from "next/image";
import { CheckBox } from "@mui/icons-material";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const WhatYouGet = () => {
  const { ref: refTitle, inView: inViewTitle } = useInView({
    triggerOnce: true,
  });
  const { ref: refText, inView: inViewText } = useInView({ triggerOnce: true });
  const { ref: refImage, inView: inViewImage } = useInView({
    triggerOnce: true,
  });

  return (
    <div className=" my-24 flex items-center justify-between xs:flex-col  md:flex-row ">
      <section>
        <div className="lg:w-[600px] ">
          <motion.h1
            ref={refTitle}
            initial="hidden"
            animate={inViewTitle ? "visible" : "hidden"}
            variants={fadeLeft}
            className="lg:text-[74px] sm:text-[40px] xs:text-[40px] apply-fonts-medium"
          >
            فوائد الاشتراك
          </motion.h1>
        </div>

        <motion.div
          ref={refText}
          initial="hidden"
          animate={inViewText ? "visible" : "hidden"}
          variants={fadeUp}
          className="my-4 apply-fonts-normal"
        >
          <h2 className="text-lg font-light">
            استفد من باقتنا الشاملة التي تتيح لك الوصول إلى دورات متخصصة بإشراف
            خبراء، وأدوات تعليمية تفاعلية، ودعم مستمر يساعدك على تحقيق أهدافك
            بكل ثقة. حسّن مهاراتك، ووسع معرفتك وانطلق في تجربة تعليمية متميزة.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8  apply-fonts-normal">
          {[
            {
              title: "تجربة تعليمية تفاعلية:",
              text: "احصل على تجربة تعلم فريدة من خلال منصتنا التفاعلية التي تتكيف مع مستوى أدائك واحتياجاتك التعليمية.",
            },
            {
              title: "خطة دراسية مخصصة:",
              text: "احصل على خطة دراسية مصممة خصيصًا لك بناءً على نقاط قوتك وضعفك لضمان التفوق في امتحانات البكالوريا.",
            },
            {
              title: "اختبارات تقييمية دورية:",
              text: "استفد من الاختبارات التقييمية الدورية التي تساعدك على قياس تقدمك وتحسين أدائك.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-wygColor rounded-3xl py-2 px-9 flex items-center gap-1 drop-shadow-xl"
            >
              <CheckBox className="text text-mainColor" fontSize="large" />
              <div>
                <h1 className="apply-fonts-medium text-lg">{item.title}</h1>
                <p className="apply-fonts-normal text-sm text-gray-400 font-extralight">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className=" w-full flex md:justify-end sm:justify-center ">
        <motion.div
          ref={refImage}
          initial="hidden"
          animate={inViewImage ? "visible" : "hidden"}
          variants={fadeRight}
          className="xl:w-[500px] xl:h-[500px] lg:w-[410px] lg:h-[410px] md:w-[350px] md:h-[350px]  xs:w-[300px] xs:h-[300px] "
          // animate={{
          //   y: [0, 25],
          // }}
          // transition={{
          //   duration: 1, // مدة الحركة (2 ثانية)
          //   ease: "easeInOut",
          //   repeat: Infinity, // اجعل الحركة تتكرر باستمرار
          //   repeatType: "reverse", // حركة ذهاب وعودة
          // }}
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
