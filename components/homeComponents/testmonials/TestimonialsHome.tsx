"use client";
import React from "react";
import TestmonialsCard from "./TestmonialsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// تعريف متغيرات الحركة (variants)
const fadeVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const TestimonialsHome = () => {
  // استخدام react-intersection-observer لتحديد ظهور العناصر
  const { ref: refSlide1, inView: inViewSlide1 } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: refSlide2, inView: inViewSlide2 } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: refButton, inView: inViewButton } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="flex flex-col gap-6" id="testimonials">
      {/* Slide 1 */}
      <motion.div
        ref={refSlide1}
        initial="hidden"
        animate={inViewSlide1 ? "visible" : "hidden"}
        variants={fadeVariant}
      >
        <Swiper
          className="flex container"
          spaceBetween={10}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          speed={2000}
          modules={[Autoplay]}
          dir="rtl"
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
        </Swiper>
      </motion.div>

      {/* Slide 2 */}
      <motion.div
        ref={refSlide2}
        initial="hidden"
        animate={inViewSlide2 ? "visible" : "hidden"}
        variants={fadeVariant}
      >
        <Swiper
          className="flex container"
          spaceBetween={10}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          speed={2000}
          modules={[Autoplay]}
          dir="ltr"
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
          <SwiperSlide>
            <TestmonialsCard />
          </SwiperSlide>
        </Swiper>
      </motion.div>

      {/* زر عرض المزيد */}
      <motion.div
        ref={refButton}
        initial="hidden"
        animate={inViewButton ? "visible" : "hidden"}
        variants={fadeVariant}
        className="w-full flex justify-center apply-fonts-normal"
      >
        <button className="px-5 py-3 bg-mainColor hoverEle hover:bg-mainColorHoverLight text-white rounded-3xl">
          عرض المزيد
        </button>
      </motion.div>
    </div>
  );
};

export default TestimonialsHome;
