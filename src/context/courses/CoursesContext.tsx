"use client";
import { createContext } from "react";
import { Course, CreateCoursesDto } from "@/types";

interface CoursesContextProps {
  courses: Course[];
  coursesFiltered: Course[];
  createCourse: (course: CreateCoursesDto) => void;
  deleteCourse: (id: string) => void;
  updateCourse: (course: any) => void;
  filterCourses: (search: string) => Promise<void>;
  myCourses: (search: string) => Promise<void>;
}

export const CoursesContext = createContext({} as CoursesContextProps);
