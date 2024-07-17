"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AuthContext, CoursesContext, UiContext } from "@/context";
import { uploadImage } from "@/utils";
import { on } from "events";

interface CreateCourseModalProps {
  onClose: () => void;
}

interface NewCategoryModalProps {
  onClose: () => void;
  onSubmit: (categoryName: string) => void;
}

const NewCategoryModal: React.FC<NewCategoryModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [categoryName, setCategoryName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(categoryName);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity rounded-3xl duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-md  relative flex flex-col "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-slate-100 text-center rounded-t-md p-2">
          New Category
        </h2>
        <div className="p-6 flex flex-col">
          <input
            type="text"
            value={categoryName}
            onChange={handleInputChange}
            placeholder="Category Name"
            className="bg-purple-100 p-4 rounded-lg shadow-sm text-md text-gray-800 border border-gray-300 mb-4"
          />
          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-300 ease-in-out"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300 ease-in-out"
              onClick={handleSubmit}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  onClose,
}) => {
  const { user } = useContext(AuthContext);
  const { isEdit } = useContext(UiContext);
  const { categories, newCategory, createCourse, currentCourse , updateCourse } =
    useContext(CoursesContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    course_name: isEdit ? currentCourse?.courseName ?? "" : "",
    image: isEdit ? currentCourse?.image ?? "" : "",
    description: isEdit ? currentCourse?.description ?? "" : "",
    price: isEdit ? currentCourse?.price : "",
    duration: isEdit ? currentCourse?.duration : "",
    capacity: isEdit ? currentCourse?.capacity : "",
    category: isEdit ? currentCourse?.category_id ?? "" : "",
    initDate: isEdit ? currentCourse?.initDate ??  new Date().toISOString().split("T")[0] :  new Date().toISOString().split("T")[0],
  });
  console.log("currentCourse: ", currentCourse)
  console.log("courseData: ", courseData)
  const handlerCreateCourse = () => {
    const data = {
      ...courseData,
      price: +courseData.price! || 0,
      duration: +courseData.duration! || 0,
      capacity: +courseData.duration! || 0,
      category_id: courseData.category,
      init_date: courseData.initDate,
      state: true,
    };
    createCourse(data);
    onClose();
  };

 
  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
  const handlerFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;
    const imageUrl = await uploadImage(file);
    setCourseData((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "newCategory") {
      setIsCategoryModalOpen(true);
    } else {
      setCourseData((prevData) => ({
        ...prevData,
        category: value,
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCategory = (categoryName: string) => {
    newCategory(categoryName);
    setCourseData((prevData) => ({
      ...prevData,
      category: categoryName,
    }));
  };

  const handlerEditCourse = () => {
    const data = {
      ...courseData,
      id: currentCourse?.id! || "", 
      price: +courseData.price! || 0,
      duration: +courseData.duration! || 0,
      capacity: +courseData.capacity! || 0,
      category_id: courseData.category,
      init_date: courseData.initDate,
      state: true,
    };
    updateCourse(data);
    onClose();
  };

  

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-2xl w-full max-w-3xl relative flex flex-col transform transition-transform duration-300 ease-in-out"
          onClick={handleModalClick}
          style={{ transform: isVisible ? "scale(1)" : "scale(0.95)" }}
        >
          <div className={`w-full bg-gradient-to-r rounded-t-lg p-4 
            ${isEdit ? "bg-gradient-to-r from-green-500 to-blue-500" 
              : "from-purple-600 to-pink-600"} `} >
            <h1 className="text-3xl font-bold text-white mb-2">
              {isEdit ? "Update Course" : "Create Course"}
            </h1>
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-600 hover:text-gray-900"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <form className="p-6">
            <div className="flex flex-row mb-4">
              <div className="relative w-1/2 mr-6">
                {courseData.image ? (
                  <Image
                    src={courseData.image}
                    width={500}
                    height={300}
                    alt="course image"
                    className="rounded-lg object-cover max-h-96 max-w-full"
                  />
                ) : (
                  <div className="rounded-lg bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                    Click to add image URL
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  onChange={handlerFileUpload}
                  placeholder="Image URL"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                placeholder="Course Description"
                className="text-lg text-gray-700 w-1/2 resize-none rounded-lg border border-gray-300 p-2"
                rows={10}
                maxLength={260}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <input
                type="text"
                name="course_name"
                value={courseData.course_name}
                onChange={handleInputChange}
                placeholder="Course Name"
                className="bg-purple-100 p-4 rounded-lg shadow-sm text-md text-gray-800 border border-gray-300"
                required
              />
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleInputChange}
                placeholder="Price"
                required
                className="bg-purple-100 p-4 rounded-lg shadow-sm text-md text-gray-800 border no-spinner border-gray-300"
              />
              <input
                type="number"
                name="duration"
                value={courseData.duration}
                onChange={handleInputChange}
                placeholder="Duration (hours)"
                className="bg-purple-100 p-4 rounded-lg shadow-sm text-md text-gray-800 border no-spinner border-gray-300"
                required
              />
              <input
                type="number"
                name="capacity"
                value={courseData.capacity}
                onChange={handleInputChange}
                placeholder="Capacity (students)"
                className="bg-purple-100 p-4 rounded-lg shadow-sm text-md text-gray-800 border no-spinner border-gray-300"
              />
              <select
                name="categoryName"
                value={courseData.category}
                className="bg-purple-100 p-4 rounded-lg shadow-sm text-md text-gray-800 border border-gray-300"
                onChange={handleSelectChange}
                onLoad={handleSelectChange}
                required
              >
                {!isEdit && <option value="">Select Category</option>}
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                    defaultChecked={
                      category.category_id === courseData.category
                    }
                  >
                    {category.category_name}
                  </option>
                ))}
                <option value="newCategory">New Category</option>
              </select>
              <input
                type="date"
                name="initDate"
                value={new Date(courseData.initDate).toISOString().split("T")[0]}
                onChange={handleInputChange}
                placeholder="Start Date"
                className="bg-purple-100 p-4 rounded-lg shadow-sm text-md text-gray-800 border border-gray-300"
                required
              />
            </div>
            <div className="w-full mt-5">
              {isEdit ? (
                <button
                  className="bg-gradient-to-r from-green-500 to-blue-500 w-full
                   text-white px-5 py-3 rounded-lg shadow-md hover:bg-opacity-90 
                   transition-all duration-300 ease-in-out"
                  onClick={handlerEditCourse}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 w-full
                   text-white px-5 py-3 rounded-lg shadow-md hover:bg-opacity-90 
                   transition-all duration-300 ease-in-out"
                  onClick={handlerCreateCourse}
                >
                  Create Course
                </button>
                )
              }
            </div>
          </form>
        </div>
      </div>

      {isCategoryModalOpen && (
        <NewCategoryModal
          onClose={() => setIsCategoryModalOpen(false)}
          onSubmit={handleAddCategory}
        />
      )}
    </>
  );
};
