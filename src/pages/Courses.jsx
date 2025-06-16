import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
                <span className="loading loading-bars loading-lg text-green-600"></span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 my-10 w-11/12 mx-auto">
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

                    <div className="p-5 space-y-3">
                        <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
                        <p className="text-gray-600 text-sm">
                            {course.description?.slice(0, 100)}...
                        </p>

                        <div className="flex items-center justify-between mt-4">
                            <span className="text-sm text-gray-500 italic">
                                Instructor: {course.instructorName}
                            </span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full">
                                {course.category || 'General'}
                            </span>
                        </div>

                        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                            View Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Courses;
