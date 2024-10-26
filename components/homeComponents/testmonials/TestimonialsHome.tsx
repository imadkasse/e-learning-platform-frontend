"use client";
import React from "react";
import TestmonialsCard from "./TestmonialsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { motion } from "framer-motion";

const TestimonialsHome = () => {

  return (
    <div className="flex flex-col gap-6" id="testimonials">
      {/* slide 1 */}
      <Swiper
        className="flex container "
        spaceBetween={10} // مسافة بين الشرائح
        slidesPerView="auto" // عرض الشرائح حسب الحجم
        loop={true} // التكرار بلا نهاية
        autoplay={{
          delay: 0, // بدء الحركة مباشرةً
          disableOnInteraction: false, // استمرار الحركة عند تفاعل المستخدم
        }}
        grabCursor={true}
        speed={2000} // سرعة الحركة، عدلها حسب رغبتك
        modules={[Autoplay]} // إضافة ميزة autoplay
        dir="rtl"
        breakpoints={{
          640: {
            slidesPerView: 2, // عرض بطاقة واحدة في الشاشات الصغيرة (أقل من 640 بكسل)
          },
          768: {
            slidesPerView: 2, // عرض بطاقتين في الشاشات المتوسطة (أقل من 768 بكسل)
          },
          1024: {
            slidesPerView: 3, // عرض أربع بطاقات في الشاشات الكبيرة (أكثر من 1024 بكسل)
          },
          1280: {
            slidesPerView: 4,
          },
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
      {/* slide 2 */}
      <Swiper
        className="flex container "
        spaceBetween={10} // مسافة بين الشرائح
        slidesPerView="auto" // عرض الشرائح حسب الحجم
        loop={true} // التكرار بلا نهاية
        autoplay={{
          delay: 0, // بدء الحركة مباشرةً
          disableOnInteraction: false, // استمرار الحركة عند تفاعل المستخدم
        }}
        grabCursor={true}
        speed={2000} // سرعة الحركة، عدلها حسب رغبتك
        modules={[Autoplay]} // إضافة ميزة autoplay
        dir="ltr"
        breakpoints={{
          640: {
            slidesPerView: 2, // عرض بطاقة واحدة في الشاشات الصغيرة (أقل من 640 بكسل)
          },
          768: {
            slidesPerView: 2, // عرض بطاقتين في الشاشات المتوسطة (أقل من 768 بكسل)
          },
          1024: {
            slidesPerView: 3, // عرض أربع بطاقات في الشاشات الكبيرة (أكثر من 1024 بكسل)
          },
          1280: {
            slidesPerView: 4,
          },
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

      <motion.div
        className="w-full flex justify-center apply-fonts-normal"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button className="px-5 py-3 bg-mainColor hoverEle hover:bg-mainColorHoverLight text-white rounded-3xl">
          عرض المزيد
        </button>
      </motion.div>
    </div>
  );
};

export default TestimonialsHome;
