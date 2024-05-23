import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export const useNavbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [bgColor, setBgColor] = useState<string>("");

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
  };

  return {
    ref,
    bgColor,
    
    handleNavigateHome,
    handleNavigateAbout,
    pathname,
  }
};
