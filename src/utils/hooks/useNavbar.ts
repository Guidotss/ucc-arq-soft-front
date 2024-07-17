import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const useNavbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [bgColor, setBgColor] = useState<string>("");

  useEffect(() => {
    if (pathname.includes("auth") || pathname.includes("courses")) {
      setBgColor("bg-navbar");
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
        setBgColor("bg-navbar");
      } else if (window.scrollY < 500 && pathname === "/"){
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
        top: ref?.current?.offsetHeight! + window.innerHeight - 80,
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
  };
  const handleNavigateCourses = () => {
    if (pathname === "/") {
      window.scrollTo({
        top: ref?.current?.offsetHeight! + window.innerHeight + 850,
        behavior: "smooth",
      });
    } else {
      router.push("/#courses");
    }
  }

  return {
    ref,
    bgColor,
    
    handleNavigateHome,
    handleNavigateAbout,
    handleNavigateCourses,
    pathname,
  }
};
