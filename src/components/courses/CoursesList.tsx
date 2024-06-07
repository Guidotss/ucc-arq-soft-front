"use client"
import { useContext, useState } from "react";
import { CoursesContext } from "@/context";
import Image from "next/image";
import { CourseCard } from "./card";
import Link from "next/link";
import { CourseModal } from "./CourseDetail";
import { Course } from "@/types";

export const CoursesList = () => {
  const { coursesFiltered } = useContext(CoursesContext);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  return (
    <>
    <div className="flex flex-col justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 p-10 gap-x-10 " >

        {coursesFiltered.slice(0,4).map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={() => setSelectedCourse(course)}
          />
        ))}

      </div>
    </div>
    {selectedCourse && (
        <CourseModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </>
  ) 
}