"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, FC, useEffect } from "react";
import { CoursesContext, coursesReducer } from ".";
import { CreateCoursesDto } from "@/types";
import { courseMapper, useToast } from "@/utils";

interface CoursesProviderProps {
  children: React.ReactNode;
}

export interface CoursesState {
  courses: any[];
}

const COURSES_INITIAL_STATE: CoursesState = {
  courses: [],
};

export const CoursesProvider: FC<CoursesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(coursesReducer, COURSES_INITIAL_STATE);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const reponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/courses`
        );
        if (reponse.ok) {
          const data = await reponse.json();
          const courses = data.map((course: any) => courseMapper(course));
          dispatch({ type: "[Courses] - Load All", payload: courses });
        }
      } catch (error) {
        console.log(error);
        showToast("Error al cargar los cursos", "error");
      }
    };
    fetchCourses();
  }, []);

  const createCourse = (course: CreateCoursesDto) => {
    dispatch({ type: "[Courses] - Create", payload: course });
  };

  const deleteCourse = (id: string) => {};
  const updateCourse = (course: any) => {};

  return (
    <CoursesContext.Provider
      value={{
        ...state,
        createCourse,
        deleteCourse,
        updateCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
