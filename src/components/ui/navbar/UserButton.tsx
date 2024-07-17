"use client"
import { useState , useContext} from "react";
import { User } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext, CoursesContext } from "@/context";

interface UserButtonProps {
  user: User;
}

export const UserButton = ({ user }: UserButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { cleanCourseList } = useContext(CoursesContext);
  const pathname = usePathname(); // Corrección aquí
  const handLogout = () => {
    cleanCourseList();
    logout();
  }
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
    >
        <div className="px-3 bg-slate-800 shadow-md rounded-2xl justify-between text-lg tracking-widest w-40 py-2.5 text-slate-50 flex gap-2 ">
            <button className="ml-4">
                {user.username.split(" ")[0]}
            </button>
            <img src={user.avatar} className="w-10 h-10 rounded-full" />
        </div>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 shadow-xl bg-white border border-gray-200 rounded-lg"
        onMouseLeave={() => setIsOpen(false)}
        >
          <Link href="/profile">
            <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Profile</span>
          </Link>
          {pathname !== "/my-courses" && (
            <Link href="/my-courses">
              <span className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Courses</span>
            </Link>
          )}
          <button 
            onClick={handLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Signout
          </button>
        </div>
      )}
    </div>
  );
};