"use client"
import { useContext } from "react";
import { CoursesContext } from "@/context";
import Image from "next/image";

export const CoursesList = () => {
  const { courses } = useContext(CoursesContext);
  console.log(courses)

  return (
    <div className="flex">
      {courses.map((course) => (
        <div 
          key={course.id}
          className="flex flex-col items-center justify-center gap-5 p-5 bg-slate-50 rounded-lg shadow-lg m-5"
        >
          <Image
            loading="lazy"
            width={300}
            height={200}
            src={course.image} 
            alt={course.course_name} 
          />
          <h1>{course.course_name}</h1>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  )
}