import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";

function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("https://coursemanagementserver-production.up.railway.app/popular-courses")
      .then(response => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-cyan-500 dark:border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4"
        >
          Popular Courses
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Discover the most enrolled courses chosen by thousands of learners to upgrade their skills fast.
        </motion.p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {courses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20 dark:border-gray-700/20 shadow-lg flex flex-col"
          >
            {/* Course Image with Gradient Overlay */}
            <div className="overflow-hidden rounded-xl mb-4 relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 sm:h-40 md:h-48 object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient Overlay on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              
              {/* Popular Badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  🔥 Popular
                </span>
              </div>
            </div>

            {/* Course Content */}
            <div className="flex flex-col flex-1">
              {/* Title */}
              <div className="mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white line-clamp-2 leading-tight mb-2">
                  {course.title}
                </h3>
                
                {/* Enrollment Count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 font-medium px-3 py-1 rounded-full border border-green-500/20">
                    📚 {course.enrollCount} Enrolled
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                {course.description?.slice(0, 100)}...
              </p>

              {/* View Details Button */}
              <Link 
                to={`/course-details/${course._id}`} 
                className="mt-auto"
              >
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group-hover:shadow-green-500/20">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Courses Message */}
      {courses.length === 0 && !loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <div className="text-gray-500 dark:text-gray-400 text-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/20">
            No popular courses available at the moment.
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default PopularCourses;