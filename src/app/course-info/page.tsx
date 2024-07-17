"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AuthContext, CoursesContext } from "@/context";
import { CommentsList } from "@/components"; 
import { Rating } from "@/types"; // Asegúrate de importar el tipo Rating

export default function CoursePage() {
  const { user } = useContext(AuthContext);
  const { enrollments, enroll, currentCourse, getRatings, createRating, updateRating, ratings } = useContext(CoursesContext);
  const [userRating, setUserRating] = useState<Rating | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(currentCourse?.ratingavg || null);
  
  const isEnrolled = enrollments?.some(
    (enrollment) => enrollment.id === currentCourse?.id
  );

  useEffect(() => {
    if (currentCourse?.id && user?.id) {
      getRatings();
    }
  }, [currentCourse?.id, user?.id]);

  useEffect(() => {
    if (ratings.length > 0 && user?.id) {
      const rating = ratings.find(r => r.user_id === user.id && r.course_id === currentCourse?.id) || null;
      setUserRating(rating);
    }
  }, [ratings, user?.id, currentCourse?.id]);

  useEffect(() => {
    if (currentCourse?.id) {
      calculateAverageRating(currentCourse.id);
    }
  }, [ratings, currentCourse?.id]);

  const calculateAverageRating = (courseId: string) => {
    const courseRatings = ratings.filter(rating => rating.course_id === courseId);
    const total = courseRatings.reduce((sum, rating) => sum + rating.rating, 0);
    const average = total / courseRatings.length;
    setAverageRating(average);
  };

  const handleEnroll = () => {
    if (user && !isEnrolled) {
      enroll(currentCourse?.id as string);
    }
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ratingValue = parseInt(event.target.value);
    if (userRating) {
      updateRating(ratingValue, currentCourse?.id as string, user?.id as string);
      setUserRating({ ...userRating, rating: ratingValue });
    } else {
      createRating(currentCourse?.id as string, user?.id as string, ratingValue);
      setUserRating({ course_id: currentCourse?.id as string, user_id: user?.id as string, rating: ratingValue });
    }
    calculateAverageRating(currentCourse?.id as string);
  };

  return (
    <div className="container mx-auto mt-28 p-4 max-w-7xl">
      <div className="rounded-lg shadow-md overflow-hidden">
        <div className="w-full bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex items-center justify-between shadow-lg">
          <h1 className="text-4xl font-bold text-white">{currentCourse?.courseName}</h1>
          {user && isEnrolled && (
          <form className="ratingStars text-5xl">
            <input value="5" name="rating" id="star5" type="radio" checked={userRating?.rating === 5} onChange={handleRatingChange}/>
            <label htmlFor="star5"></label>
            <input value="4" name="rating" id="star4" type="radio" checked={userRating?.rating === 4} onChange={handleRatingChange}/>
            <label htmlFor="star4"></label>
            <input value="3" name="rating" id="star3" type="radio" checked={userRating?.rating === 3} onChange={handleRatingChange}/>
            <label htmlFor="star3"></label>
            <input value="2" name="rating" id="star2" type="radio" checked={userRating?.rating === 2} onChange={handleRatingChange}/>
            <label htmlFor="star2"></label>
            <input value="1" name="rating" id="star1" type="radio" checked={userRating?.rating === 1} onChange={handleRatingChange}/>
            <label htmlFor="star1"></label>
          </form>
        )}
        </div>
        <div className="p-6 bg-white">
          <div className="flex flex-wrap md:flex-nowrap mb-6">
            <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-6">
              <Image
                src={currentCourse?.image as string}
                width={500}
                height={300}
                alt="course image"
                className="rounded-lg w-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-lg text-gray-700">{currentCourse?.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800">
                <strong>Price:</strong> ${currentCourse?.price}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800">
                <strong>Duration:</strong> {currentCourse?.duration} hours
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800">
                <strong>Capacity:</strong> {currentCourse?.capacity} students
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800">
                <strong>Category:</strong> {currentCourse?.categoryName}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800">
                <strong>Rating:</strong> {averageRating ? averageRating.toFixed(1) : currentCourse?.ratingavg.toFixed(1)}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-800">
                <strong>Start Date:</strong> {new Date(currentCourse?.initDate || "").toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="w-full mb-6">
          <button
              className={`transition-all duration-300 ease-in-out ${
                user && !isEnrolled
                  ? "bg-gradient-to-r from-purple-600 to-pink-600"
                  : user && isEnrolled
                  ? "bg-gradient-to-r from-green-500 to-blue-500"
                  : "bg-orange-500"
              } w-full text-white px-5 py-3 rounded-lg shadow-md hover:bg-opacity-90`}
              onClick={handleEnroll}
            >
              {user && !isEnrolled
                ? "Enroll"
                : user && isEnrolled
                ? "Enrolled"
                : "Login to enroll"}
            </button>
          </div>
          <div className="comments-section">
            <CommentsList courseId={currentCourse?.id as string} />
          </div>
        </div>
      </div>
    </div>
  );
}
