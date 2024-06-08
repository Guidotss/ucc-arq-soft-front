"use client";
import { createContext } from "react";
import { Course, CreateCoursesDto ,  Category } from "@/types";

interface CoursesContextProps {
  courses: Course[];
  coursesFiltered: Course[];
  categories: Category[];
  createCourse: (course: CreateCoursesDto) => void;
  deleteCourse: (id: string) => void;
  updateCourse: (course: any) => void;
  filterCourses: (search: string) => Promise<void>;
  myCourses: (search: string) => Promise<void>;
  newCategory : (category: string) => void;
  getCategories : () => void;
}

export const CoursesContext = createContext({} as CoursesContextProps);
