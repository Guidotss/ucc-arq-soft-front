import { Course } from "@/types";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
}
export const CourseCard = ({ course }: Readonly<CourseCardProps>) => {
  return (
    <div
      key={course.id}
      className="flex flex-col items-center justify-center gap-5 bg-gray-50 rounded-xl shadow-lg w-96 min-h-96 cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      <Image
        loading="lazy"
        loader={({ src }) => src}
        width={300}
        height={200}
        src={course.image}
        alt={course.courseName}
        className="rounded-lg object-cover w-full h-full shadow-xs"
      />
      <div className="flex flex-col p-5">
        <h1 className="text-lg text-center mb-2 font-semibold tracking-wide capitalize">
          {course.courseName}
        </h1>
        <p className="text-sm text-start text-gray-500 text-pretty capitalize">
          {course.description}
        </p>
      </div>
    </div>
  );
};
