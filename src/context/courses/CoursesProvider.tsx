"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, FC, useEffect } from "react";
import { CoursesContext, coursesReducer } from ".";
import { Course, CreateCoursesDto } from "@/types";
import { courseMapper, useToast } from "@/utils";
import Cookies from "js-cookie";

interface CoursesProviderProps {
  children: React.ReactNode;
}

export interface CoursesState {
  courses: Course[];
  coursesFiltered: Course[];
}

const COURSES_INITIAL_STATE: CoursesState = {
  courses: [],
  coursesFiltered: [],
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
          console.log(data);
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
    dispatch({
      type: "[Courses] - Create",
      payload: course as unknown as Course,
    });
  };

  const deleteCourse = (id: string) => {};
  const updateCourse = (course: any) => {};
  const filterCourses = async (search: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses?filter=${search}`
      );
      const data = await response.json();
      const courses = data.map((course: any) => courseMapper(course));
      dispatch({ type: "[Courses] - Filter", payload: courses });
    } catch (error) {
      console.log(error);
      showToast("Error al filtrar los cursos", "error");
    }
  };

  const myCourses = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/myCourses/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status !== 200) {
        showToast("Error al cargar mis cursos", "error");
        return;
      }
      const data = await response.json();
      const courses = data.map((course: any) => courseMapper(course));
      dispatch({ type: "[Courses] - My Courses", payload: courses });
    } catch (error) {
      console.log(error);
      showToast("Error al cargar mis cursos", "error");
    }
  };
  return (
    <CoursesContext.Provider
      value={{
        ...state,
        createCourse,
        deleteCourse,
        updateCourse,
        filterCourses,
        myCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
