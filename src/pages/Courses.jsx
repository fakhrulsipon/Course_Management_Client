import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import {
  FaTag,
  FaUserTie,
  FaSearch,
  FaSort,
  FaStar,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Courses = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 12;

  // ✅ প্রথমবার সব courses load করুন - সঠিক API ব্যবহার করে
  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = () => {
    setLoading(true);
    axios
      .get(`https://coursemanagementserver-production.up.railway.app/courses?limit=1000&page=1`) // ✅ সঠিক endpoint
      .then((res) => {
        console.log("API Response:", res.data); // Debugging
        const allCoursesData = res.data.courses || [];
        setAllCourses(allCoursesData);
        setFilteredCourses(allCoursesData);
        setTotalPages(Math.ceil(allCoursesData.length / limit));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to Load Courses",
          text: error.response?.data?.error || "Something went wrong. Please try again.",
        });
        setLoading(false);
      });
  };

  // ✅ Search এবং Sort apply করুন - Client-side
  useEffect(() => {
    let results = [...allCourses];

    // Search filter
    if (searchTerm) {
      results = results.filter(course =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort apply - Price string থেকে number এ convert
    if (sortOrder === "ascending") {
      results.sort((a, b) => {
        const priceA = parseFloat(a.price?.toString().replace(/[^\d.]/g, '') || 0);
        const priceB = parseFloat(b.price?.toString().replace(/[^\d.]/g, '') || 0);
        return priceA - priceB;
      });
    } else if (sortOrder === "descending") {
      results.sort((a, b) => {
        const priceA = parseFloat(a.price?.toString().replace(/[^\d.]/g, '') || 0);
        const priceB = parseFloat(b.price?.toString().replace(/[^\d.]/g, '') || 0);
        return priceB - priceA;
      });
    }

    setFilteredCourses(results);
    setTotalPages(Math.ceil(results.length / limit));
    setCurrentPage(1);
  }, [allCourses, searchTerm, sortOrder]);

  // ✅ Current page-এর courses calculate করুন
  const getCurrentPageCourses = () => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredCourses.slice(startIndex, endIndex);
  };

  useEffect(() => {
    document.title = "All Courses | EduPath";
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const currentCourses = getCurrentPageCourses();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex justify-center items-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-cyan-500 dark:border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading courses...</p>
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
          className="text-center mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
            Explore Courses
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive collection of expert-led courses designed
            to accelerate your career growth and skill development
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/20 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses by title, instructor, or category..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full lg:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSort className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="block w-full pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none transition-all duration-300"
              >
                <option value="">Sort by Price</option>
                <option value="ascending">Low to High</option>
                <option value="descending">High to Low</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-between items-center mb-6"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Showing{" "}
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">
              {filteredCourses.length}
            </span>{" "}
            courses
            {searchTerm && (
              <span>
                {" "}
                for "<span className="font-semibold">{searchTerm}</span>"
              </span>
            )}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Page{" "}
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">
              {totalPages}
            </span>
          </p>
        </motion.div>

        {/* Course Grid */}
        {currentCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 border border-white/20 dark:border-gray-700/20 shadow-lg max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                No Courses Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {searchTerm
                  ? `No courses found for "${searchTerm}". Try different keywords.`
                  : "No courses available at the moment. Please check back later."}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Clear Search
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          >
            {currentCourses.map((course, index) => (
              <motion.div
                key={course._id || index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                }}
                transition={{ duration: 0.3 }}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-white/20 dark:border-gray-700/20 transition-all duration-300 flex flex-col"
              >
                {/* Course Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      course.image ||
                      "https://images.unsplash.com/photo-1497636577773-f1231844b336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    }
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                      <FaTag className="text-white text-xs" />
                      {course.category || "General"}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                    <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                      {course.price || "Free"}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                    {course.title || "Untitled Course"}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
                    {course.description ||
                      "No description available for this course."}
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <FaUsers className="text-cyan-500" />
                      <span>{course.enrollments || 0} enrolled</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span>{course.rating || "4.5"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-purple-500" />
                      <span>{course.duration || "Self-paced"}</span>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center gap-3 mb-4 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {course.instructorName?.charAt(0) || "I"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                        {course.instructorName || "Expert Instructor"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        Professional Educator
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/course-details/${course._id}`}
                    className="mt-auto"
                  >
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl group-hover:shadow-cyan-500/20 flex items-center justify-center gap-2">
                      <span>View Details</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-gray-700/20 shadow-lg">
              <div className="flex flex-wrap items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </button>

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
                      <button
                        key={1}
                        onClick={() => setCurrentPage(1)}
                        className="px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400"
                      >
                        1
                      </button>
                    );
                    if (startPage > 2) {
                      pages.push(
                        <span
                          key="start-ellipsis"
                          className="px-2 py-2 text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }
                  }

                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                          currentPage === i
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                            : "hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400"
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }

                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span
                          key="end-ellipsis"
                          className="px-2 py-2 text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400"
                      >
                        {totalPages}
                      </button>
                    );
                  }

                  return pages;
                })()}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
                >
                  Next
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;