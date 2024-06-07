"use client";
import { AuthContext } from "@/context";
import { Course } from "@/types";
import Image from "next/image";
import { useContext } from "react";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}; 
export const CourseCard = ({ course , onClick}: Readonly<CourseCardProps>) => {
  const { user } = useContext(AuthContext);
  return (
    <div
      key={course.id}
      className="flex gap-5 bg-gray-300 m-3 mx-3 p-2 rounded-xl shadow-lg w-full max-h-80 2xl:w-[30vw] 2xl:min-h-96 cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      <div className="flex justify-between h-full">
        <Image
          loading="lazy"
          loader={({ src }) => src}
          width={300}
          height={200}
          src={course.image}
          alt={course.courseName}
          className="rounded-lg object-fill h-full shadow-xs w-1/2"
        />
        <div className="flex flex-col p-5 text-start">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-lg font-semibold tracking-tighter capitalize">
              {course.courseName}
            </h1>
            <p className="text-sm text-gray-500 text-pretty font-semibold">
              {course.price === 0 ? "Free" : `$${course.price}`}
            </p>
          </div>

          <p className="text-sm text-gray-500 text-pretty capitalize  ">
          {truncateText(course.description, 60)}
          </p>

        </div>
      </div>
    </div>
  );
};
