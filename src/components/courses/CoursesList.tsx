"use client"
import { useContext } from "react";
import { CoursesContext } from "@/context";
import Image from "next/image";
import { CourseCard } from "./card";
import Link from "next/link";

export const CoursesList = () => {
  const { courses } = useContext(CoursesContext);
  console.log(courses)

  return (
    <div className="flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 p-10 gap-5">

        {courses.slice(0,4).map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}

      </div>
      <div className="flex justify-center ">
        <Link href="/courses" className="bg-purple-600 text-white rounded-md px-10 py-1 mb-4 hover:bg-opacity-80 duration-300 ease-in-out transition-all">
          View All
        </Link>
      </div>
    </div>
  )
}