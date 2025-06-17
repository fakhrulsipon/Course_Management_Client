
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const LatestCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    axios.get('https://edupath-server.vercel.app/latest-course')
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
        <span className="loading loading-bars loading-xl text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-3 text-primary">Latest Courses</h2>
      <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
        Explore our newest additions — handpicked to help you gain in-demand skills faster and smarter.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <div
            key={course._id}
            className="group bg-white shadow-xl rounded-2xl p-5 transition-transform hover:-translate-y-2 border border-transparent hover:border-primary/30"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-2xl font-semibold mt-4 text-primary">{course.title}</h3>
            <p className="text-sm text-gray-500">{new Date(course.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700 mt-2">{course.description?.slice(0, 100)}...</p>
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