/*"use client";

import { useContext } from "react";
import { CoursesContext } from "@/context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import Image from "next/image";

export const CourseCarrusel = () => {
  const { courses } = useContext(CoursesContext);
  return (
    <Swiper
      className="w-full h-full swiper_container"
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
        scale: 1, // Ajusta esta propiedad
      }}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      breakpoints={{
        // when window width is >= 640px
        640: {
          slidesPerView: 2,
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 3,
        },
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
    >
      {courses.filter((course) => course.ratingavg > 2).map((course) => (
        <SwiperSlide key={course.id} className="swiper-slide">
          <div className="flex flex-col justify-center">
            <div className="p-10 gap-5 -my-3">
              <Image
                src={course.image}
                width={500}
                height={300}
                alt="course image"
                className="swiper_image"
              />
              <div className="flex flex-col justify-center my-6">
                <h1 className="text-4xl font-bold text-center text-gray-800">
                  {course.courseName}
                </h1>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
*/
"use client";

import { useContext } from "react";
import { CoursesContext } from "@/context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";


export const CourseCarrusel = () => {
  const { courses } = useContext(CoursesContext);
  return (
    <Swiper
      className="w-full h-full swiper_container"
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
        scale: 1,
      }}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
    >
      {courses.filter((course) => course.ratingavg > 2).map((course) => (
        <SwiperSlide key={course.id} className="swiper-slide">
          <div>
          <div className=" card-container rounded-t-xl flex flex-col justify-center items-center p-6 bg-white rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
            <Image
              src={course.image}
              width={500}
              height={300}
              alt="course image"
              className="rounded-t-xl"
            />
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                {course.courseName}
              </h1>
              <p className="text-lg text-center text-gray-600">{course.description}</p>
          </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};