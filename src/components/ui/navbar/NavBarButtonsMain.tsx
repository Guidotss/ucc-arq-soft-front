import { useContext,useState } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { CoursesContext } from "@/context";
interface Props {
  pathname: string;
  handleNavigateAbout: () => void;
  handleNavigateHome: () => void;
  handleNavigateCourses: () => void;
}



export const NavBarMainButtons = ({
  pathname,
  handleNavigateAbout,
  handleNavigateCourses,
  handleNavigateHome,
}: Props) => {
  const { filterCourses } = useContext(CoursesContext);
  const [inputValue, setInputValue] = useState("");
  const handleSearch = async () => {
    await filterCourses(inputValue);
  }
  return (
    <nav className="flex items-center gap-10">
      {pathname === "/" ? (
        <>
          <button className="text-white" onClick={handleNavigateHome}>
            Home
          </button>
          <button onClick={handleNavigateAbout} className="text-white">
            About
          </button>
          <button onClick={handleNavigateCourses} className="text-white">
            Courses
          </button>
        </>
      ) :  pathname === "/courses" && (
        <div>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-slate-50 py-3 px-5 w-96 rounded-2xl border-none 
          outline-none font-normal"
            placeholder="Buscar cursos"
            value={inputValue}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch() }}
          />
          <button
            className="relative right-12 rounded-r-2xl hover:opacity-30 
            hover:bg-slate-300 p-3 transition-all ease-in-out duration-300"
            onClick={handleSearch}
          >
            <SearchIcon />
          </button>
        </div>
      )}
    </nav>
  );
};
