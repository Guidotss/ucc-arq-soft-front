import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-[95vw] fixed flex justify-between items-center backdrop-blur-xl font-bold p-5 shadow-lg rounded-xl z-10">
      <div className="flex items-center">
        <Image
          src="/assets/images/deer.png"
          alt="DuoMingo Logo"
          width={50}
          height={50}
        />
        <h1 className="text-3xl text-white tracking-tighter">DuoMingo</h1>
      </div>
      <nav className="flex items-center gap-10">
        <a href="#" className="text-white">
          Home
        </a>
        <a href="#about" className="text-white">
          About
        </a>
        <a href="#contact" className="text-white">
          Contact
        </a>
      </nav>
      <Link href="/auth/login">
        <p className="bg-slate-50 text-slate-950 p-3 text-lg font-semibold tracking-wider rounded-full cursor-pointer hover:bg-opacity-80 transition-all duration-300 ease-in-out">
          Get Started
        </p>
      </Link>
    </div>
  );
};
