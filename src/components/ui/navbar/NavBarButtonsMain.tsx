import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
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
      ) : (
        <div>
          <input className="bg-slate-50 py-3 px-5 w-96 rounded-2xl border-none outline-none font-normal"></input>
            <button className="relative right-12 rounded-r-2xl hover:opacity-30 hover:bg-slate-300 p-3 transition-all ease-in-out duration-300">
                <SearchIcon />
            </button>
        </div>
      )}
    </nav>
  );
};
