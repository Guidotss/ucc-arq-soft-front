"use client";
import { AuthContext } from "@/context";
import { Course } from "@/types";
import Image from "next/image";
import { useContext } from "react";

interface CourseCardProps {
  course: Course;
}
export const CourseCard = ({ course }: Readonly<CourseCardProps>) => {
  const { user } = useContext(AuthContext);
  return (
    <div
      key={course.id}
      className="flex gap-5 bg-gray-50 rounded-xl shadow-lg w-full max-h-80 2xl:w-[30vw] 2xl:min-h-96 cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out"
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

          <p className="text-sm text-gray-500 text-pretty capitalize">
            {course.description}
          </p>
          <div className="h-full w-full flex items-end">
            <button
              className={`${
                user ? "bg-purple-600" : "bg-orange-500"
              } w-full text-white px-5 py-2 rounded-lg mt-5 hover:bg-opacity-80 transition-all duration-300 ease-in-out`}
            >
              {user ? "Enroll" : "Login to Enroll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
