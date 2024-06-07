"use client";

import { useContext, useState  } from "react";
import { CoursesContext } from "@/context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { CourseModal } from "./CourseDetail";
import { Course } from "@/types";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";



const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
interface CourseCarruselProps {
  handlerSelected: (course: Course) => void;
}
export const CourseCarrusel = ({handlerSelected}:CourseCarruselProps) => {
  const { courses } = useContext(CoursesContext);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  return (
    <>
    <Swiper
      className="w-full h-full swiper_container"
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 150,
        modifier: 2.5,
        slideShadows: false,
        scale: 0.97,
        
      }}
      spaceBetween={35}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
      loop={true} // Activar loop
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
    >
      {courses.filter((course) => course.ratingavg > 2).map((course) => (
        <SwiperSlide key={course.id} className="swiper-slide bg-transparent ">
          <div className="rounded-t-3xl rounded-xl flex flex-col justify-center 
          text-ellipsis overflow-hidden items-center p-4 pb-10 bg-white shadow-3xl 
          transform transition-transform duration-300 hover:scale-105 card-swiper" 
          onClick={() => handlerSelected(course)}>
            <Image
              src={course.image}
              width={500}
              height={300}
              alt="course image"
              className="rounded-t-xl"
            />
              <h1 className="text-2xl font-bold text-center mt-3 mb-3  text-white ">
                {course.courseName}
              </h1>
              <p className="text-lg text-center text-white  max-h-16">
              {truncateText(course.description, 60)}
              </p>
          </div>

        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
};