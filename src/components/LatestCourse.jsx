
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const LatestCourse = () => {
  const [courses, setCourses] = useState([]);
  

  useEffect(() => {
    axios.get('http://localhost:3000/latest-course')
      .then(res => {
        setCourses(res.data);
      })
      .catch(error => {
        console.error('Error fetching latest courses:', error);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-white shadow rounded-lg p-4">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-4">{course.title}</h3>
            <p className="text-gray-600">{new Date(course.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700 mt-2">{course.description?.slice(0, 80)}...</p>
            <Link to={`/course-details/${course._id}`}>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Details
            </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCourse;