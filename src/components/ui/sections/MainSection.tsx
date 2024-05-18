"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaArrowDown } from "react-icons/fa";

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
            className="w-full h-full object-cover"
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
        id="more"
        className="w-full h-screen flex justify-between bg-slate-50 p-10"
      >
        {/* Random size image */}
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-2 2xl:gap-5 lg:gap-2 align-middle">
          <Image
            src="/assets/images/boy.jpg"
            alt="Random Image"
            width={500}
            height={500}
            className="rounded-xl shadow-md lg:w-96 2xl:h-[60vh] lg:h-[90vh] col-span-1"
          />
          <div className="flex flex-col gap-y-3 col-span-1">
            <Image
              src="/assets/images/computer-girl.jpg"
              alt="Random Image"
              width={600}
              height={600}
              className="rounded-xl object-cover shadow-md 2xl:w-full w-96"
            />
            <Image
              src="/assets/images/computer-hands.jpg"
              alt="Random Image"
              width={500}
              height={500}
              className="rounded-xl object-cover shadow-md 2xl:w-full w-96"
            />
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center gap-y-5"
          style={{ flex: 1 }}
        />

        <div className="w-96">
          <h1 className="text-2xl mb-3 font-bold text-slate-950">
            Learn a new language
          </h1>
          {/* add description */}
          <p className="text-lg text-slate-950">
            At <strong>DuoMingo</strong>, we believe in the power of language to connect and
            inspire. Our expert, native-speaking instructors use immersive,
            interactive methods to help you achieve your language goals. With
            flexible scheduling and a supportive learning environment, we make
            language learning accessible and enjoyable. Join us and start your
            language journey today!
          </p>
        </div>
      </section>
    </>
  );
};
