import { CourseCarrusel, CoursesList } from "@/components";

export default function CoursesPage() {


  return (
    <main className="mt-32">
        <section className="flex flex-col items-center justify-center py-2 bg-slate-800 h-auto">
            <h1 className="text-4xl font-bold text-center text-white mb-10 mt-3">
              Top Courses
            </h1>
        <CourseCarrusel/>
        </section>
        <section className="flex flex-col items-center justify-center py-20 bg-violet-100">
            <h1 className="text-4xl font-bold text-center text-gray-800">
            Courses
            </h1>
            <p className="text-lg text-center text-gray-600">
            Choose from a variety of courses
            </p>
            <section  id="courses">
              <CoursesList/>
            </section>
        </section>
       
    </main>
  )
}
