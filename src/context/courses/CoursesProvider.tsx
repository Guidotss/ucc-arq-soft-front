"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, FC, useEffect, useCallback } from "react";
import { CoursesContext, coursesReducer } from ".";
import { Category, Course, CreateCoursesDto, UpdateCoursesDto, Comment, User , Rating} from "@/types";
import { courseMapper, useToast , commentMapper} from "@/utils";
import Cookies from "js-cookie";

interface CoursesProviderProps {
  children: React.ReactNode;
}

export interface CoursesState {
  courses: Course[];
  currentCourse: Course | null;
  coursesFiltered: Course[];
  categories: Category[];
  enrollments: Course[];
  comments: Comment[];
  ratings: Rating[];
}

const COURSES_INITIAL_STATE: CoursesState = {
  courses: [],
  currentCourse: null,
  coursesFiltered: [],
  categories: [],
  enrollments: [],
  comments: [],
  ratings: [],
};

export const CoursesProvider: FC<CoursesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(coursesReducer, COURSES_INITIAL_STATE);
  const { showToast } = useToast();

  useEffect(() => {
    getCategories();
    fetchCourses();
    myCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const reponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
      if (reponse.ok) {
        const data = await reponse.json();
        console.log("Courses from server: ", data);
        const courses = data.map((course: any) => courseMapper(course));
        dispatch({ type: "[Courses] - Load All", payload: courses });
      }
    } catch (error) {
      console.log(error);
      showToast("Error al cargar los cursos", "error");
    }
  };
  


  const getComments = useCallback(async (courseId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment/${courseId}`
      );
      if (response.status === 404) {
        // Si el servidor responde con 404, considera que no hay comentarios
        dispatch({ type: "[Comments] - Load All Comments", payload: [] });
        return;
      }
      const data = await response.json();
      if (response.status !== 200) {
        showToast("Error al cargar los comentarios", "error");
        return;
      }
      const comments = data.map((comment: any) => commentMapper(comment));
      dispatch({ type: "[Comments] - Load All Comments", payload: comments });
    } catch (error) {
      console.log(error);
      showToast("Error al cargar los comentarios", "error");
    }
  }, [showToast]);

  const getRatings = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rating`
      );
      const data = await response.json();
      if (response.status !== 200) {
        showToast("Error al cargar las calificaciones", "error");
        return;
      }
      dispatch({ type: "[Ratings] - Load All Ratings", payload: data });
    } catch (error) {
      console.log(error);
      showToast("Error al cargar las calificaciones", "error");
    }
  }

  const createComment = async (courseId: string, userId: string, comment: string) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ course_id: courseId, user_id: userId, text: comment }),
        }
      );
      if (response.status !== 201) {
        showToast("Error al crear el comentario", "error");
        return;
      }
      getComments(courseId);
      showToast("Comentario creado exitosamente", "success");
    } catch (error) {
      console.log(error);
      showToast("Error al crear el comentario", "error");
    }
  }

  const updateComment = async (text: string , course_id: string , user_id : string) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        return;
      }
      const comment = {
        text,
        course_id,
        user_id
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(comment),
        }
      );
      if (response.status !== 200) {
        showToast("Error al editar el comentario", "error");
        return;
      }
      getComments(course_id);
      showToast("Comentario editado exitosamente", "success");
      return;
    } catch (error) {
      console.log(error);
      showToast("Error al editar el comentario", "error");
    }
  }

  const createRating = async (courseId: string, userId: string, rating: number) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ course_id: courseId, user_id: userId, rating }),
        }
      );
      if (response.status !== 201) {
        showToast("Error al calificar el curso", "error");
        return;
      }
      getRatings();
      showToast("Calificación creada exitosamente", "success");
    } catch (error) {
      console.log(error);
      showToast("Error al calificar el curso", "error");
    }
  }
  const updateRating = async (rating: number , course_id: string , user_id : string) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        return;
      }
      const ratingObj = {
        rating,
        course_id,
        user_id
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rating`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ratingObj),
        }
      );
      if (response.status !== 200) {
        showToast("Error al editar la calificación", "error");
        return;
      }
      getRatings();
      showToast("Calificación editada exitosamente", "success");
      return;
    } catch (error) {
      console.log(error);
      showToast("Error al editar la calificación", "error");
    }
  }

  const createCourse = async (course: CreateCoursesDto) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(course),
        }
      );
      const data = await response.json();
      if (response.status !== 201) {
        showToast("Error al crear el curso", "error");
        return;
      }
      dispatch({ type: "[Courses] - Create", payload: courseMapper(data) });
    } catch (error) {
      console.log(error);
      showToast("Error al crear el curso", "error");
    }
  };

  const deleteCourse = (id: string) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        return;
      }
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.status !== 200) {
          showToast("Error al eliminar el curso", "error");
          return;
        }
        dispatch({ type: "[Courses] - Delete", payload: id });
        fetchCourses();
        showToast("Curso eliminado exitosamente", "success");
      });
    } catch (error) {
      console.log(error);
      showToast("Error al eliminar el curso", "error");
    }
  };

  const updateCourse = async (course: UpdateCoursesDto) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        return;
      }
      console.log("course updated: ", course);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/update/${course.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(course),
        }
      );
      const data = await response.json();
      console.log("data del response: ", data)
      if (response.status !== 200) {
        showToast("Error al editar el curso", "error");
        return;
      }
      showToast("Curso editado exitosamente", "success");
      //window.location.reload();
      await fetchCourses();
      //dispatch({ type: "[Courses] - Update", payload: courseMapper(data.data) });

    } catch (error) {
      console.log(error);
      showToast("Error al editar el curso", "error");
    }
  };

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
      if (!token) {
        return;
      }
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
      if (response.status === 500) {
        showToast("Error al cargar mis cursos", "error");
        return;
      }
      const data = await response.json();
      const courses = data?.map((course: any) => courseMapper(course));
      console.log("courses: ", courses);
      dispatch({ type: "[Courses] - My Courses", payload: courses });
    } catch (error) {
      console.log(error);
      showToast("Error al cargar mis cursos", "error");
    }
  };
  const newCategory = async (category: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_name: category }),
        }
      );
      const data = await response.json();
      if (response.status !== 201) {
        showToast("Error al crear la categoria", "error");
        return;
      }
      dispatch({ type: "[Category] - New Category", payload: data });
    } catch (error) {
      console.log(error);
      showToast("Error al crear la categoria", "error");
    }
  };
  const getCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
      );
      const data = await response.json();
      if (response.status !== 200) {
        showToast("Error al cargar las categorias", "error");
        return;
      }
      dispatch({ type: "[Categories] - Load All Categories", payload: data });
    } catch (error) {
      console.log(error);
      showToast("Error al cargar las categorias", "error");
    }
  };
  const enroll = async (courseId: string) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/enroll`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ course_id: courseId }),
        }
      );
      if (response.status !== 201) {
        showToast("Error al inscribirse al curso", "error");
        return;
      }
      dispatch({ type: "[Courses] - Enroll", payload: courseId });
      showToast("Inscripción exitosa", "success");
    } catch (error) {
      console.log(error);
      showToast("Error al inscribirse al curso", "error");
    }
  };
  const cleanCourseList = () => {
    dispatch({ type: "[Courses] - Clean All" });
  };

  const setCurrentCourse = (course: Course) => {
    dispatch({ type: "[Courses] - Set Current", payload: course });
  };

  return (
    <CoursesContext.Provider
      value={{
        ...state,
        createComment,
        getComments,
        updateComment,
        createRating,
        updateRating,
        getRatings,
        createCourse,
        deleteCourse,
        updateCourse,
        filterCourses,
        myCourses,
        newCategory,
        getCategories,
        enroll,
        cleanCourseList,
        fetchCourses,
        setCurrentCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
