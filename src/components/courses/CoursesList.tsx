"use client"
import { useContext } from "react";
import { CoursesContext } from "@/context";
import Image from "next/image";
import { CourseCard } from "./card";

export const CoursesList = () => {
  const { courses } = useContext(CoursesContext);
  console.log(courses)

  return (
    <div className="flex justify-between p-10">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}
    </div>
  )
}