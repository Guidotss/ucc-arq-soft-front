import { Course } from "@/types";

export const courseMapper = (course: any): Course => {
  return {
    id: course.id,
    courseName: course.course_name,
    description: course.description,
    price: course.price ?? 0,
    duration: course.duration ?? 0,
    capacity: course.capacity ?? 15,
    categoryId: course.categoryId ?? "",
    initDate: course.initDate ?? new Date(),
    state: course.state ?? true,
    image: course.image,
    ratingavg: course.ratingavg ?? 0,
    categoryName: course.category_name,
  }};
