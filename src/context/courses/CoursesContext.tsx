"use client"
import { createContext } from "react";
import { CreateCoursesDto } from "@/types";

interface CoursesContextProps {
  courses: any[];
  createCourse: (course: CreateCoursesDto) => void;
  deleteCourse: (id: string) => void;
  updateCourse: (course: any) => void;
}

export const CoursesContext = createContext({} as CoursesContextProps);
