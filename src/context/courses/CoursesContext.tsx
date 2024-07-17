"use client";
import { createContext } from "react";
import { Course, CreateCoursesDto ,  Category , UpdateCoursesDto, Comment, Rating} from "@/types";

interface CoursesContextProps {
  courses: Course[];
  coursesFiltered: Course[];
  categories: Category[];
  enrollments: Course[];
  currentCourse: Course | null;
  comments: Comment[];
  ratings: Rating[];
  createComment: (courseId: string, userId: string, comment: string) => void;
  getComments: (courseId: string) => void; 
  updateComment: (text: string , course_id: string , user_id : string) => void;
  getRatings: () => void;
  createRating: (courseId: string, userId: string, rating: number) => void;
  updateRating: (rating: number , course_id: string , user_id : string) => void;
  createCourse: (course: CreateCoursesDto) => void;
  deleteCourse: (id: string) => void;
  updateCourse: (course: UpdateCoursesDto) => void;
  filterCourses: (search: string) => Promise<void>;
  myCourses: () => Promise<void>;
  setCurrentCourse: (course: Course) => void;
  newCategory : (category: string) => void;
  getCategories : () => void;
  enroll: (courseId: string) => void;
  cleanCourseList: () => void;
  fetchCourses: () => void;
}

export const CoursesContext = createContext({} as CoursesContextProps);
