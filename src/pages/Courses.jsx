import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FaTag, FaUserTie } from 'react-icons/fa';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 12;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 1200);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchCourses = (sort = '', page = 1, search = '') => {
    setLoading(true);
    axios.get(`http://localhost:3000/courses?limit=${limit}&page=${page}&sort=${sort}&search=${search}`)
      .then(res => {
        setCourses(res.data.courses);
        setTotalPages(res.data.totalPages)
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
  };

  useEffect(() => {
    fetchCourses(sortOrder, currentPage, debouncedSearch);
  }, [sortOrder, currentPage, debouncedSearch]);

  useEffect(() => {
    document.title = 'All Courses | EduPath';
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-sky-600"></div>
      </div>
    );
  }

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-11/12 mx-auto pt-16 px-4">
      {/* Static Section Title + Description */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2 dark:text-white">All Available Courses</h2>
      <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto dark:text-white">
        Browse through our collection of diverse and high-quality courses designed by expert instructors to help you upgrade your skills and knowledge.
      </p>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search courses by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-400 rounded-lg px-3 py-2 w-96 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border border-gray-400 rounded-lg px-3 py-2 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Sort by Price</option>
          <option value="ascending">Low to High</option>
          <option value="descending">High to Low</option>
        </select>
      </div>


      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No courses found.</p>
        ) : (
          courses.map(course => (
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
          ))
        )}
      </div>



      {/* Pagination Buttons */}
      <div className="join flex flex-wrap justify-center mt-6 gap-2">
        {/* Previous Button */}
        <button
          className="join-item btn btn-sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          «
        </button>

        {/* Dynamic Page Numbers */}
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
                className={`join-item btn btn-sm ${currentPage === 1 ? 'btn-active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
            );
            if (startPage > 2) {
              pages.push(<span key="start-ellipsis" className="join-item btn btn-sm disabled">...</span>);
            }
          }

          for (let i = startPage; i <= endPage; i++) {
            pages.push(
              <button
                key={i}
                className={`join-item btn btn-sm ${currentPage === i ? 'btn-active' : ''}`}
                onClick={() => setCurrentPage(i)}
              >
                {i}
              </button>
            );
          }

          if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
              pages.push(<span key="end-ellipsis" className="join-item btn btn-sm disabled">...</span>);
            }
            pages.push(
              <button
                key={totalPages}
                className={`join-item btn btn-sm ${currentPage === totalPages ? 'btn-active' : ''}`}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            );
          }

          return pages;
        })()}

        {/* Next Button */}
        <button
          className="join-item btn btn-sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>

    </div>

  );
};

export default Courses;
