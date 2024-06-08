import { Course, CreateCoursesDto } from "@/types";
import { CoursesState } from ".";

type CoursesAction =
  | { type: "[Courses] - Load All"; payload: Course[] }
  | { type: "[Courses] - Create"; payload: Course }
  | { type: "[Courses] - Filter"; payload: Course[] }
  | { type: "[Courses] - My Courses"; payload: Course[] };


export const coursesReducer = (
  state: CoursesState,
  action: CoursesAction
): CoursesState => {
  switch (action.type) {
    case "[Courses] - Load All":
      return {
        ...state,
        courses: action.payload,
        coursesFiltered: action.payload,
      };
    case "[Courses] - Create":
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    case "[Courses] - Filter":
      return {
        ...state,
        coursesFiltered: action.payload,
      };
    case "[Courses] - My Courses":
      return {
        ...state,
        coursesFiltered: action.payload,
      };
    default:
      return state;
  }
};
