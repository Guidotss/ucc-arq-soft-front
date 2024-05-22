"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NavbarButtons } from ".";

export const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [bgColor, setBgColor] = useState<string>("");

  //! MOVER TODO ESTO A UN CUSTOM HOOK
  useEffect(() => {
    if (pathname.includes("auth")) {
      console.log(pathname.includes("auth"));
      setBgColor("bg-slate-950 bg-opacity-40");
    } else if (pathname === "/") {
      setBgColor("bg-transparent");
    }

    return () => {
      setBgColor("");
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname.includes("auth")) return;
    const scrollHandler = () => {
      if (window.scrollY > 500) {
        setBgColor("bg-slate-950 bg-opacity-50");
      } else {
        setBgColor("bg-transparent");
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      setBgColor("");
    };
  }, [pathname]);

  const handleNavigateAbout = () => {
    if (pathname === "/") {
      window.scrollTo({
        top: ref?.current?.offsetHeight! + window.innerHeight,
        behavior: "smooth",
      });
    } else {
      router.push("/#about");
    }
  };

  const handleNavigateHome = () => { 
    if (pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      router.push("/");
    }
  }

  return (
    <div
      ref={ref}
      className={`w-[95vw] fixed flex justify-between items-center backdrop-blur-xl ${bgColor} font-bold p-5 shadow-lg rounded-xl z-10 transition-all duration-300 ease-out mt-1`}
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
      <nav className="flex items-center gap-10">
        <button 
          className="text-white"
          onClick={handleNavigateHome}
        >
            Home
          </button>
        <button onClick={handleNavigateAbout} className="text-white">
          About
        </button>
        <a href="#contact" className="text-white">
          Contact
        </a>
      </nav>
      <NavbarButtons pathName={pathname} />
    </div>
  );
};
