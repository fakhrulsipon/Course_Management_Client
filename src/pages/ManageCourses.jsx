import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiBook,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiSearch,
} from "react-icons/fi";

const ManageCourses = () => {
  useEffect(() => {
    document.title = "Manage Courses | EduPath";
  }, []);

  const { user } = use(AuthContext);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 6;

  useEffect(() => {
    setLoading(true);
    if (user?.email) {
      axios
        .get(
          `https://coursemanagementserver-production.up.railway.app/my-courses?email=${user.email}&page=${currentPage}&limit=${limit}&search=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        )
        .then((res) => {
          setMyCourses(res.data.courses);
          setTotalPages(res.data.totalPages);
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
  }, [user, currentPage, limit, searchTerm]);

  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Delete Course?",
      text: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "white",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://coursemanagementserver-production.up.railway.app/delete-course/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your course has been deleted successfully.",
                icon: "success",
                background: "#1f2937",
                color: "white",
              });
              const remaining = myCourses.filter((course) => course._id !== id);
              setMyCourses(remaining);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex justify-center items-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-cyan-500 dark:border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Loading your courses...
          </p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            Manage Your Courses
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            View, edit, and manage all the courses you've created
          </p>
        </motion.div>

        {/* Courses Grid */}
        {myCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-white/20 dark:border-gray-700/20 shadow-2xl max-w-md mx-auto">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                No Courses Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {searchTerm
                  ? `No courses found for "${searchTerm}".`
                  : "You haven't created any courses yet."}
              </p>
              {!searchTerm && (
                <Link to="/add-course">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    Create Your First Course
                  </motion.button>
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {myCourses.map((course, index) => (
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
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {course.availableSeats} Seats
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 text-lg">
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
                        <FiDollarSign className="text-green-500" />
                        <span>৳{course.price}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiUsers className="text-purple-500" />
                        <span>{course.enrollments || 0} enrolled</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                      <Link
                        to={`/edit-course/${course._id}`}
                        className="flex-1"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                        >
                          <FiEdit className="text-sm" />
                          Edit
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(course._id, course.title)}
                        className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                      >
                        <FiTrash2 className="text-sm" />
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-gray-700/20 shadow-lg">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Previous Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-sm"
                    >
                      ← Previous
                    </motion.button>

                    {/* Page Numbers */}
                    {(() => {
                      const pages = [];
                      const maxVisiblePages = 5;
                      let startPage, endPage;

                      if (totalPages <= maxVisiblePages) {
                        startPage = 1;
                        endPage = totalPages;
                      } else {
                        const half = Math.floor(maxVisiblePages / 2);
                        if (currentPage <= half + 1) {
                          startPage = 1;
                          endPage = maxVisiblePages;
                        } else if (currentPage >= totalPages - half) {
                          startPage = totalPages - maxVisiblePages + 1;
                          endPage = totalPages;
                        } else {
                          startPage = currentPage - half;
                          endPage = currentPage + half;
                        }
                      }

                      if (startPage > 1) {
                        pages.push(
                          <motion.button
                            key={1}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(1)}
                            className="px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm"
                          >
                            1
                          </motion.button>
                        );
                        if (startPage > 2) {
                          pages.push(
                            <span
                              key="start-ellipsis"
                              className="px-2 py-2 text-gray-400 text-sm"
                            >
                              ...
                            </span>
                          );
                        }
                      }

                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(i)}
                            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm ${
                              currentPage === i
                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                                : "hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400"
                            }`}
                          >
                            {i}
                          </motion.button>
                        );
                      }

                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                          pages.push(
                            <span
                              key="end-ellipsis"
                              className="px-2 py-2 text-gray-400 text-sm"
                            >
                              ...
                            </span>
                          );
                        }
                        pages.push(
                          <motion.button
                            key={totalPages}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(totalPages)}
                            className="px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm"
                          >
                            {totalPages}
                          </motion.button>
                        );
                      }

                      return pages;
                    })()}

                    {/* Next Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-sm"
                    >
                      Next →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageCourses;
