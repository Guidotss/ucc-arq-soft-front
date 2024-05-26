"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import { CoursesList } from "@/components/courses";

export const MainSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <section className="w-full">
        <div className="h-[100vh]">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-b-lg filte"
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
              <Link href="/auth/login">
                <p className="bg-slate-50 text-slate-950 p-3 text-lg font-semibold tracking-wider rounded-full mt-5 cursor-pointer hover:bg-opacity-80 transition-all duration-300 ease-in-out">
                  Get Started
                </p>
              </Link>
            </div>
          </div>
        </div>
        <button
          onClick={() => ref.current?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
        >
          <FaArrowDown className="text-5xl text-white absolute bottom-5 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce" />
        </button>
      </section>
      <section
        ref={ref}
        id="about"
        className="w-full h-screen flex items-center justify-between gap-x-10 bg-slate-50 p-10 mt-10"
      >
        {/* Random size image */}
        <div className="grid 2xl:grid-cols-2 lg:grid-cols-2 2xl:gap-10 lg:gap-2">
          <Image
            src="/assets/images/boy.jpg"
            alt="Random Image"
            width={500}
            height={500}
            className="rounded-xl shadow-lg lg:w-96 2xl:w-[50vw] 2xl:h-[69vh] lg:h-[90vh] col-span-1"
          />
          <div className="flex flex-col gap-y-6 col-span-1 h-full">
            <Image
              src="/assets/images/computer-girl.jpg"
              alt="Random Image"
              width={600}
              height={600}
              className="rounded-xl object-cover shadow-lg 2xl:w-full w-96 2xl:h-[33vh]"
            />
            <Image
              src="/assets/images/computer-hands.jpg"
              alt="Random Image"
              width={500}
              height={500}
              className="rounded-xl object-cover shadow-lg 2xl:w-full w-96 2xl: h-[33vh]"
            />
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center gap-y-5"
          style={{ flex: 1 }}
        />
        <div className="lg:w-96 2xl:w-full flex flex-col">
          <h1 className="text-4xl mb-4 font-bold text-slate-950">
            Learn a new language
          </h1>
          <p className="text-xl leading-9 text-slate-950">
            At <strong>DuoMingo</strong>, we believe in the power of language to
            connect and inspire. Our expert, native-speaking instructors use
            immersive, interactive methods to help you achieve your language
            goals. With flexible scheduling and a supportive learning
            environment, we make language learning accessible and enjoyable.
            Join us and start your language journey today!
          </p>
        </div>
      </section>
      <section className="bg-slate-50">
        <CoursesList />
      </section>
    </>
  );
};
