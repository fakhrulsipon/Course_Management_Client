
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const LatestCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    axios.get(' https://edupath-server.vercel.app/latest-course')
      .then(res => {
        setCourses(res.data);
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching latest courses:', error);
        setLoading(false)
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
    <div className="w-11/12 mx-auto px-4 mt-8 md:mt-12 lg:mt-16">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2 dark:text-white">Latest Courses</h2>
      <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto dark:text-white">
        Explore our newest additions — handpicked to help you gain in-demand skills faster and smarter.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {courses.map(course => (
          <div
            key={course._id}
            className="group bg-white shadow-xl rounded-2xl p-5 transition-transform border border-transparent hover:border-primary/30"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold mt-4 text-blue-300">{course.title}</h3>
            <p className="text-sm text-gray-500">{new Date(course.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700 mt-2">{course.description?.slice(0, 50)}...</p>
            <Link to={`/course-details/${course._id}`}>
              <button className="mt-4 bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-2 rounded-lg shadow hover:brightness-110 transition duration-300">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCourse;