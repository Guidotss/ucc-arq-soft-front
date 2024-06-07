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
    <div className="flex flex-col justify-center p-">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 p-10 gap-5rounded-sm" >

        {courses.slice(0,4).map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}

      </div>
    </div>
  )
}