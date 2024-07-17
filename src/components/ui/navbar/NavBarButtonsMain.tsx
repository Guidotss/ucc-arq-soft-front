import { useContext, useState } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { CoursesContext , AuthContext , UiContext} from "@/context";
import AddIcon from '@mui/icons-material/Add';


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
  const { user } = useContext(AuthContext);
  const { openCreateModal } = useContext(UiContext);
  const [inputValue, setInputValue] = useState("");

  console.log(user)
  const handleSearch = async () => {
    await filterCourses(inputValue);
  };

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
      ) : pathname === "/courses" ? (
        <div className="flex items-center gap-2">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-slate-50 py-3 px-5 w-96 rounded-2xl border-none 
          outline-none font-normal"
            placeholder="Buscar cursos"
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button
            className="rounded-r-2xl hover:opacity-30 hover:bg-slate-300 p-3 relative right-14 transition-all ease-in-out duration-300"
            onClick={handleSearch}
          >
            <SearchIcon />
          </button>
          {user?.role == "admin" && (
              <button className="bg-purple-700 relative left-16 flex justify-center items-center 
              text-white py-4 px-5 rounded-2xl transition-all ease-in-out duration-300 hover:opacity-80"
              onClick={() => openCreateModal()}
              >
                <AddIcon className="mr-3"/>
                Create course
              </button>
          )}

        </div>
      ) : pathname === "/my-courses" || pathname === "/course-info" ?(
        <>
          <Link href="/courses">
            <span className="text-white">All courses</span>
          </Link>
        </>
      ) : null}
    </nav>
  );
};
