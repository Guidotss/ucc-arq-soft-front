"use client";
import React, { useContext, useEffect, useState } from "react";
import { CoursesContext, AuthContext } from "@/context";
import { Comment } from "@/types";

interface CommentsListProps {
  courseId: string;
}

export const CommentsList: React.FC<CommentsListProps> = ({ courseId }) => {
  const { comments, getComments, enrollments, createComment, updateComment, ratings } = useContext(CoursesContext);
  const { user } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [existingComment, setExistingComment] = useState<Comment | null>(null);
  const isEnrolled = enrollments?.some((enrollment) => enrollment.id === courseId);

  useEffect(() => {
    if (courseId) {
      getComments(courseId);
    }
  }, [courseId]);

  useEffect(() => {
    if (user && comments.length > 0) {
      const userComment = comments.find((comment) => comment.user_id === user.id) || null;
      setExistingComment(userComment);
      setNewComment(userComment ? userComment.comment : "");
    }
  }, [comments, user]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      if (existingComment) {
        updateComment(newComment, courseId, user?.id || "");
      } else {
        createComment(courseId, user?.id || "", newComment);
      }
      setNewComment("");
    }
  };

  const getUserRating = (userId: string): number | null => {
    const rating = ratings.find((rating) => rating.user_id === userId && rating.course_id === courseId);
    return rating ? rating.rating : null;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-5 w-5 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 p-10 gap-x-10 ">
          {comments.map((comment) => (
            <div key={comment.user_id} className="bg-white shadow-md rounded-md p-4 relative mt-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <img
                    src={comment.user_avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <h3 className="text-lg font-semibold">{comment.user_id === user?.id ? "Tu" : comment.user_name}</h3>
                </div>
                {getUserRating(comment.user_id) !== null && (
                  <div className="absolute top-0 right-0 m-2">
                    {renderStars(getUserRating(comment.user_id)!)}
                  </div>
                )}
              </div>
              <p className="text-gray-500">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
      {isEnrolled && (
        <div className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            placeholder="Write your comment here..."
          ></textarea>
          <button
            onClick={handleCommentSubmit}
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {existingComment ? "Update Comment" : "Submit Comment"}
          </button>
        </div>
      )}
    </div>
  );
};
