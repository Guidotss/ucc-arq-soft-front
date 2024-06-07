"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavbarButtons, NavBarMainButtons } from ".";
import { useNavbar } from "@/utils";
import { AuthContext } from "@/context";

export const Navbar = () => {
  const {
    ref,
    bgColor,
    pathname,
    handleNavigateAbout,
    handleNavigateHome,
    handleNavigateCourses,
  } = useNavbar();

  return (
    <div
      ref={ref}
      className={`w-[95vw] red-200 fixed flex justify-between items-center backdrop-blur-xl ${bgColor} font-bold p-5 shadow-lg rounded-xl z-10 transition-all duration-300 ease-out mt-1`}
    >
      <Link className="flex items-center" href="/">
        <Image
          src="/assets/images/deer.png"
          alt="DuoMingo Logo"
          width={50}
          height={50}
        />
        <h1 className="text-3xl text-white tracking-tighter">DuoMingo</h1>
      </Link>
        <NavBarMainButtons
          pathname={pathname}
          handleNavigateAbout={handleNavigateAbout}
          handleNavigateHome={handleNavigateHome}
          handleNavigateCourses={handleNavigateCourses}
        />

      <NavbarButtons pathName={pathname} />
    </div>
  );
};
