"use client";
import { createContext } from "react";
import { Course, CreateCoursesDto } from "@/types";

interface CoursesContextProps {
  courses: Course[];
  createCourse: (course: CreateCoursesDto) => void;
  deleteCourse: (id: string) => void;
  updateCourse: (course: any) => void;
}

export const CoursesContext = createContext({} as CoursesContextProps);
