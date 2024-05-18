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
        className="w-full h-screen flex bg-slate-50 p-10 justify-around"
      >
        {/* Random size image */}
        <div className="grid grid-cols-4 gap-5">
          <Image
            src="/assets/images/boy.jpg"
            alt="Random Image"
            width={500}
            height={500}
            className="rounded-xl shadow-sm h-[60vh]"
          />
          <div className="flex flex-col gap-y-5">
            <Image
              src="/assets/images/computer-girl.jpg"
              alt="Random Image"
              width={600}
              height={600}
              className="rounded-xl object-cover shadow-sm w-full"
            />
            <Image
              src="/assets/images/computer-hands.jpg"
              alt="Random Image"
              width={500}
              height={500}
              className="rounded-xl object-cover shadow-sm w-full"
            />
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center gap-y-5"
          style={{ flex: 1 }}
        />

        <div>
          <h1 className="text-xl font-bold text-slate-950">Learn a new language</h1>
          <p className="text-xl text-slate-950">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            euismod, urna non feugiat luctus, sapien metus placerat lacus, nec
            varius odio nunc nec justo. Sed auctor, nunc in fermentum ultricies,
            erat metus tincidunt felis, nec varius odio nunc nec justo. Sed
            auctor, nunc in fermentum ultricies, erat metus tincidunt felis.
          </p>
        </div>
      </section>
    
    </>
  );
};
