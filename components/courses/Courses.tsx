"use client";
import React, { useEffect, useState } from "react";
// import Spinner from "../spinner/Spinner";
import axios from "axios";
import CourseCard from "./courseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./swiperStyle.css";
import { Course } from "@/types/course";

type ShowCourse = {
  category: string;
  courses: Course[];
};

const Courses = () => {
  const [courses, setCourses] = useState<ShowCourse[]>([]);

  // const loadingCourses = useCoursesStore((state) => state.loading);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/courses/getCategory`
        );
        setCourses(data.data.courses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourse();
  }, []);
  return (
    <div className="my-4">
      {/* {loadingCourses ? (
          // Spinner أثناء التحميل
          <div>
            <Spinner />
          </div>
        ) : ( */}

      {courses?.length > 0 &&
        courses.map((coursesAndCate, index) => {
          return (
            <div key={index}>
              <h2 className="text-3xl font-bold text-gray-800 apply-fonts-normal">
                {coursesAndCate.category}
              </h2>
              <div className="px-4 py-4">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  spaceBetween={10}
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
                  {coursesAndCate.courses.map((course) => {
                    return (
                      <SwiperSlide key={course._id}>
                        <CourseCard
                          courseId={course._id}
                          courseDescription={course.description}
                          courseImg={course.imageCover}
                          courseName={course.title}
                          coursePrice={course.price}
                          courseRating={course.avgRatings}
                          students={course.studentsCount}
                          numberOfVideo={course.videos.length}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Courses;
