"use client";
import React, { useContext, useEffect } from 'react';
import { Course } from "@/types";
import Image from "next/image";
import { AuthContext } from "@/context";

interface CourseModalProps {
  course: Course;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl relative flex flex-col"
        onClick={handleModalClick}
      >
        <div className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-lg p-4">
          <h1 className="text-3xl font-bold text-white mb-2">{course.courseName}</h1>
          <button
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <div className="flex flex-row mb-4">
            <Image
              src={course.image}
              width={500}
              height={300}
              alt="course image"
              className="rounded-lg w-1/2 mr-6"
            />
            <p className="text-lg text-gray-700 w-1/2">{course.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800"><strong>Price:</strong> ${course.price}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800"><strong>Duration:</strong> {course.duration} hours</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800"><strong>Capacity:</strong> {course.capacity} students</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800"><strong>Category:</strong> {course.categoryName}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800"><strong>Rating:</strong> {course.ratingavg.toFixed(1)}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800"><strong>Start Date:</strong> {new Date(course.initDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="w-full mt-5">
            <button
              className={`${
                user ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-orange-500"
              } w-full text-white px-5 py-3 rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300 ease-in-out`}
            >
              {user ? "Enroll" : "Login to Enroll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};