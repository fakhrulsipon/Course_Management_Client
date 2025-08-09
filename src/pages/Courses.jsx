import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FaTag, FaUserTie } from 'react-icons/fa';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'All Courses | EduPath';
    setLoading(true)
    axios.get('http://localhost:3000/courses')
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Load Courses',
          text: error.message || 'Something went wrong. Please try again.',
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-sky-600"></div>;
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto pt-16 px-4">
      {/* Static Section Title + Description */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">All Available Courses</h2>
      <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
        Browse through our collection of diverse and high-quality courses designed by expert instructors to help you upgrade your skills and knowledge.
      </p>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map(course => (
          <div
            key={course._id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <img
              src={course.image || 'https://via.placeholder.com/400x200?text=Course+Image'}
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5 space-y-2">
              <h2 className="text-xl font-bold text-blue-400">{course.title}</h2>
              <p className="text-gray-600 text-sm">
                {course.description?.slice(0, 50)}...
              </p>
              <p className='font-medium'>Price: {course.price}</p>
              <div className="flex items-center justify-between border-t border-gray-100">
                {/* Instructor */}
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaUserTie className="text-blue-500 text-lg" />
                  {course.instructorName}
                </span>

                {/* Category */}
                <span className="flex items-center gap-1 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow">
                  <FaTag className="text-white text-sm" />
                  {course.category || 'General'}
                </span>
              </div>

              <Link to={`/course-details/${course._id}`}>
                <button className="mt-4 w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Courses;
