"use client"
import { useState, useContext, useEffect } from "react";
import { CourseCarrusel} from "@/components";
import { CourseModal } from "@/components/courses/CourseDetail";
import { Course } from "@/types";
import { CoursesContext } from "@/context";


export default function MyCoursesPage() {
const { enrollments } = useContext(CoursesContext);
const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  return (
    <main className="mt-32">
        {selectedCourse && (
          <CourseModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
        )}
        <section className="flex flex-col items-center justify-center py-2 pt-0 
        drop-shadow-2xl shadow-2xl bg-violet-200 m-5 rounded-3xl">
        <div className="p-3 w-full mx-60 bg-purple-700 rounded-t-2xl shadow-2xl">
          <h1 className="text-4xl font-bold text-center text-gray-50 ">
            My Courses
          </h1>
        </div>
          <CourseCarrusel courses={enrollments} handlerSelected={setSelectedCourse}/>
        </section>
    </main>
  )
}
