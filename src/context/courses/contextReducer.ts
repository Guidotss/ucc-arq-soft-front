import { CreateCoursesDto } from "@/types";
import { CoursesState } from ".";

type CoursesAction =
  | { type: "[Courses] - Load All"; payload: any[] }
  | { type: "[Courses] - Create"; payload: CreateCoursesDto };

export const coursesReducer = (
  state: CoursesState,
  action: CoursesAction
): CoursesState => {
  switch (action.type) {
    case "[Courses] - Load All":
      return {
        ...state,
        courses: action.payload,
      };
    case "[Courses] - Create":
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    default:
      return state;
  }
};
