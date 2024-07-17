import { Category, Course, CreateCoursesDto , Comment, Rating} from "@/types";
import { CoursesState } from ".";

type CoursesAction =
  | { type: "[Courses] - Load All"; payload: Course[] }
  | { type: "[Courses] - Create"; payload: Course }
  | { type: "[Courses] - Update"; payload: Course }
  | { type: "[Courses] - Delete"; payload: string }
  | { type: "[Courses] - Filter"; payload: Course[] }
  | { type: "[Courses] - My Courses"; payload: Course[] }
  | { type: "[Category] - New Category"; payload: Category }
  | { type: "[Categories] - Load All Categories"; payload: Category[] }
  | { type: "[Courses] - Clean All" }
  | {type : "[Courses] - Enroll"; payload: string}
  | {type : "[Courses] - Set Current"; payload: Course}
  | {type : "[Comments] - Load All Comments"; payload: Comment[]}
  | {type : "[Ratings] - Load All Ratings"; payload: Rating[]};



export const coursesReducer = (
  state: CoursesState,
  action: CoursesAction
): CoursesState => {
  switch (action.type) {
    case "[Comments] - Load All Comments":
      return {
        ...state,
        comments: action.payload
    }
    case "[Courses] - Load All":
      return {
        ...state,
        courses: action.payload,
        coursesFiltered: action.payload,
      };
    case "[Ratings] - Load All Ratings":
      return {
        ...state,
        ratings: action.payload
      }
    case "[Courses] - Create":
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    case "[Courses] - Update":
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.id === action.payload.id ? action.payload : course
        ),
      };
    case "[Courses] - Delete":
      return {
        ...state,
        courses: state.courses.filter((course) => course.id !== action.payload),
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
        enrollments: [...state?.enrollments, course!],
      };
    case "[Courses] - Set Current":
      return {
        ...state,
        currentCourse: action.payload,
      };
    default:
      return state;
  }
};
