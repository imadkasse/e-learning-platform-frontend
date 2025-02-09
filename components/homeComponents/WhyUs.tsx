"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const WhyUs = () => {
  const { ref: refTitle, inView: inViewTitle } = useInView({
    triggerOnce: true,
  });
  const { ref: refImage, inView: inViewImage } = useInView({
    triggerOnce: true,
  });
  return (
    <div className=" my-24 flex items-center justify-between xs:flex-col  md:flex-row ">
      <section>
        <motion.h1
          ref={refTitle}
          initial="hidden"
          animate={inViewTitle ? "visible" : "hidden"}
          variants={fadeLeft}
          className="lg:text-[74px] sm:text-[40px] xs:text-[40px] apply-fonts-medium"
        >
          منصتنا تفاعلية وذكية
        </motion.h1>

        <motion.div
          initial="hidden"
          animate={inViewTitle ? "visible" : "hidden"}
          variants={fadeLeft}
          className="my-4 apply-fonts-normal"
        >
          <h2 className="text-xl font-light">
            منصتنا تفاعلية وذكية، تتيح لك التعلم بطريقة مخصصة وفريدة تناسب
            احتياجاتك الفردية.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inViewTitle ? "visible" : "hidden"}
          variants={fadeLeft}
          className="flex apply-fonts-normal"
        >
          <Link
            href={"/courses"}
            className="bg-mainColor hoverEle hover:bg-mainColorHoverLight text-lg py-2 px-4 rounded-lg text-white"
          >
            تصفح الدورات
          </Link>
        </motion.div>
      </section>
      <section className=" w-full  flex md:justify-end sm:justify-center ">
        <motion.div
          ref={refImage}
          initial="hidden"
          animate={inViewImage ? "visible" : "hidden"}
          variants={fadeRight}
          className="xl:w-[500px] xl:h-[500px] lg:w-[410px] lg:h-[410px] md:w-[350px] md:h-[350px] xs:w-[300px] xs:h-[300px]"
        >
          <Image
            src="/imgs/pcImg.png"
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
