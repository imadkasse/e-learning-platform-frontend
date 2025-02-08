"use client";
import React from "react";
import Image from "next/image";
import { CheckBox } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";

const WhatYouGet = () => {
  AOS.init({
    disable: false,
    startEvent: "DOMContentLoaded",
    animatedClassName: "aos-animate",
    initClassName: "aos-init",
    useClassNames: true,
    debounceDelay: 50,
    throttleDelay: 99,
    disableMutationObserver: false,
  });

  return (
    <div className=" my-24 flex items-center justify-between xs:flex-col  md:flex-row ">
      <section
        data-aos="fade-left"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="center"
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

        <div
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
          className="flex flex-col gap-8  apply-fonts-normal"
        >
          <div className="bg-wygColor rounded-3xl py-2 px-9 flex items-center  gap-1 drop-shadow-xl">
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
          </div>

          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="center"
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
          </div>

          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="center"
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
          </div>
        </div>
      </section>
      <section className=" w-full flex md:justify-end sm:justify-center ">
        <div
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="center"
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
        </div>
      </section>
    </div>
  );
};

export default WhatYouGet;
