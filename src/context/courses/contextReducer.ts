import { Category, Course, CreateCoursesDto } from "@/types";
import { CoursesState } from ".";

type CoursesAction =
  | { type: "[Courses] - Load All"; payload: Course[] }
  | { type: "[Courses] - Create"; payload: Course }
  | { type: "[Courses] - Filter"; payload: Course[] }
  | { type: "[Courses] - My Courses"; payload: Course[] }
  | { type: "[Category] - New Category"; payload: Category }
  | { type: "[Categories] - Load All Categories"; payload: Category[] }
  | { type: "[Courses] - Clean All" }
  | {type : "[Courses] - Enroll"; payload: string};


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
        enrollments: action.payload,
      };
    case "[Category] - New Category":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "[Categories] - Load All Categories":
      return {
        ...state,
        categories: action.payload,
      };
    case "[Courses] - Clean All":
      return {
        ...state,
        enrollments: [],
      };
    case "[Courses] - Enroll":
      const course = state.courses.find((course) => course.id === action.payload);
      return {
        ...state,
        enrollments: [...state.enrollments, course!],
      };
    default:
      return state;
  }
};
