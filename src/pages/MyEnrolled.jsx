import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FiBook,
  FiClock,
  FiUsers,
  FiTrash2,
  FiPlay,
  FiBarChart2,
} from "react-icons/fi";
import { Link } from "react-router";

const MyEnrolled = () => {
  useEffect(() => {
    document.title = "My Enrolled Courses | EduPath";
  }, []);

  const { user } = use(AuthContext);
  const [myEnrolled, setMyEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://coursemanagementserver-production.up.railway.app/enrolled-courses?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          setMyEnrolled(res.data);
          setLoading(false);
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
          });
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex justify-center items-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-cyan-500 dark:border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Loading your enrolled courses...
          </p>
        </div>
      </div>
    );
  }

  const handleRemove = (id, title) => {
    Swal.fire({
      title: "Remove Enrollment?",
      text: `Are you sure you want to unenroll from "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "white",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://coursemanagementserver-production.up.railway.app/delete-enrolled/${id}/${user.email}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Removed!",
                text: "You have been unenrolled from the course.",
                icon: "success",
                background: "#1f2937",
                color: "white",
              });
              const remaining = myEnrolled.filter((item) => item._id !== id);
              setMyEnrolled(remaining);
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
              background: "#1f2937",
              color: "white",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            My Learning Journey
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Continue your learning adventure with these enrolled courses
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/20 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FiBook className="text-white text-xl" />
              </div>
              <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {myEnrolled.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enrolled Courses
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FiClock className="text-white text-xl" />
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {myEnrolled.reduce(
                  (total, course) => total + (parseInt(course.duration) || 0),
                  0
                )}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Learning Hours
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <FiBarChart2 className="text-white text-xl" />
              </div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(
                  (myEnrolled.filter((course) => course.progress > 50).length /
                    myEnrolled.length) *
                    100
                ) || 0}
                %
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Completion Rate
              </p>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        {myEnrolled.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-white/20 dark:border-gray-700/20 shadow-2xl max-w-md mx-auto">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                No Enrolled Courses
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You haven't enrolled in any courses yet. Start your learning
                journey today!
              </p>
              <Link to="/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
                >
                  Explore Courses
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {myEnrolled.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-lg overflow-hidden group"
              >
                {/* Course Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-cyan-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Enrolled
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <FiClock className="text-cyan-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiUsers className="text-green-500" />
                      <span>{course.enrollments || 0} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiBook className="text-purple-500" />
                      <span>{course.lessons || "12"} lessons</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{course.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                    <Link
                      to={`/course-details/${course._id}`}
                      className="flex-1"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <FiPlay className="text-sm" />
                        Continue
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRemove(course._id, course.title)}
                      className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <FiTrash2 className="text-sm" />
                      Remove
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Motivational Section */}
        {myEnrolled.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Keep Learning! 🚀
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                You're doing amazing! Continue your learning journey and unlock
                new skills. Every lesson brings you closer to your goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/courses">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    Explore More Courses
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
                >
                  Set Learning Goals
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyEnrolled;
