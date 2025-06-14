import React from 'react';
import { useLoaderData } from 'react-router';

const CourseDetails = () => {
  const course = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
        <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
        <p className="text-gray-500 mb-2">
          Posted on: {new Date(course.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700">{course.description}</p>

        {/* Enroll Button */}
        <div className="mt-6">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
