"use client"
import { useState } from "react";
import { CourseCarrusel, CoursesList } from "@/components";
import { CourseModal } from "@/components/courses/CourseDetail";
import { Course } from "@/types";
export default function CoursesPage() {

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
            Top Courses
          </h1>
        </div>
          <CourseCarrusel handlerSelected={setSelectedCourse}/>
        </section>
        <section className="flex flex-col items-center justify-center 
              py-20 pt-0 bg-violet-200 m-5 rounded-2xl shadow-2xl mt-10">
            <div className="p-3 w-full mx-60 bg-purple-700 rounded-t-2xl shadow-2xl">
            <h1 className="text-4xl font-bold text-center text-gray-50 ">
            Courses
            </h1>
            <p className="text-lg text-center  text-gray-50">
            Choose from a variety of courses
            </p>
            </div>
            <section  id="courses">
              <CoursesList/>
            </section>
        </section>
    </main>
  )
}
