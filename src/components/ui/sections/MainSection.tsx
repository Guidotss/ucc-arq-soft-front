"use client";
import { useRef, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import { CoursesList } from "@/components/courses";
import { AuthContext, CoursesContext } from "@/context";

export const MainSection = () => {
  const { user } = useContext(AuthContext);
  const { fetchCourses , myCourses , getRatings} = useContext(CoursesContext);
  useEffect(() => {
    fetchCourses();
    myCourses();
    getRatings();
  }, []);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <section className="w-full bg-violet-50">
        <div className="h-[100vh] relative">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-b-lg"
            src="/assets/table.mp4"
          />
          <div className="absolute top-[50vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="tracking-widest">
              <h1 className="text-5xl font-bold text-white">
                Welcome to DuoMingo
              </h1>
              <p className="text-xl text-white">
                The best place to learn new languages
              </p>
              {!user && (
                <Link href="/auth/login">
                  <p className="bg-slate-50 text-slate-950 p-3 text-lg font-semibold tracking-wider rounded-full mt-5 cursor-pointer hover:bg-opacity-80 transition-all duration-300 ease-in-out">
                    Get Started
                  </p>
                </Link>
              )}
            </div>
          </div>
          <button
            onClick={() => ref.current?.scrollIntoView({ behavior: "smooth" })}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
          >
            <FaArrowDown className="text-5xl text-white cursor-pointer animate-bounce" />
          </button>
        </div>
      </section>
      <section
        ref={ref}
        id="about"
        className="w-full min-h-screen flex items-center justify-center gap-10 bg-slate-50 py-16"
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 w-full max-w-6xl">
          <Image
            src="/assets/images/boy.jpg"
            alt="Random Image"
            width={500}
            height={300}
            className="rounded-xl shadow-lg w-full h-auto object-cover xl:max-h-[70vh]"
          />
          <div className="flex flex-col justify-between h-full">
            <div>
              <h1 className="text-4xl mb-4 font-bold text-slate-950 w-36 text-pretty">
                Learn a new language
              </h1>

              <p className="text-xl leading-9 text-slate-950 mt-5">
                At <strong>DuoMingo</strong>, we believe in the power of language to
                connect and inspire. Our expert, native-speaking instructors use
                immersive, interactive methods to help you achieve your language
                goals. With flexible scheduling and a supportive learning
                environment, we make language learning accessible and enjoyable.
                Join us and start your language journey today!
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <Image
                src="/assets/images/computer-girl.jpg"
                alt="Random Image"
                width={600}
                height={600}
                className="rounded-xl object-cover shadow-lg w-full h-auto"
              />
              <Image
                src="/assets/images/computer-hands.jpg"
                alt="Random Image"
                width={500}
                height={500}
                className="rounded-xl object-cover shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className="flex flex-col items-center justify-center 
              pt-0 bg-violet-200 m-5 rounded-2xl shadow-2xl mt-5 mb-11"
        id="courses"
      >
        <CoursesList />
        <div className="flex justify-center pb-5">
          <Link
            href="/courses"
            className="bg-purple-600 
        text-white rounded-md px-10 py-1 hover:bg-opacity-80 duration-300 ease-in-out transition-all"
          >
            View All
          </Link>
        </div>
      </section>
      <div className="mt-10 h-1"></div>
    </>
  );
};
