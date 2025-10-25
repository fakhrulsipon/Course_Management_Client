import { FaEdit, FaBookOpen, FaLightbulb, FaClock, FaDollarSign, FaUsers, FaImage } from "react-icons/fa";
import axios from 'axios';
import React, { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const EditCourse = () => {

    useEffect(() => {
        document.title = 'Edit Course | EduPath';
    }, []);

    const course = useLoaderData()
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const editCourse = Object.fromEntries(formData.entries())

        axios.put(`https://coursemanagementserver-production.up.railway.app/update-course/${course._id}`, editCourse)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Course updated successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdrop: 'rgba(0, 0, 0, 0.5)'
                    });
                    navigate('/manage-course')
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdrop: 'rgba(0, 0, 0, 0.5)'
                });
            })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8 relative">
            
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/30 to-transparent dark:via-gray-800/10 animate-pulse"></div>
                
                {/* Floating dots - Light mode only */}
                <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce dark:hidden"></div>
                <div className="absolute top-40 right-40 w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-300 dark:hidden"></div>
                <div className="absolute bottom-40 left-60 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-700 dark:hidden"></div>
                
                {/* Dark mode floating stars */}
                <div className="hidden dark:block absolute top-20 left-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="hidden dark:block absolute top-40 right-40 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse delay-500"></div>
                
                {/* Gradient blobs - Light mode */}
                <div className="absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 blur-3xl dark:hidden"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-15 blur-3xl dark:hidden"></div>
                
                {/* Dark mode subtle blobs */}
                <div className="hidden dark:block absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-900/30 to-indigo-900/20 rounded-full blur-3xl"></div>
                <div className="hidden dark:block absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-purple-900/20 to-gray-900/30 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-2xl shadow-lg">
                            <FaEdit className="text-white text-xl" />
                        </div>
                        Edit Course
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Update your course information to keep it relevant and engaging for students
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    
                    {/* Left Side - Information Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 lg:p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg">
                                <FaBookOpen className="text-white text-xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Why Keep Your Courses Updated?
                            </h3>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                            A well-maintained course ensures that students get the latest knowledge and resources.
                            Keeping your course details updated increases student engagement and trust.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-white/20 dark:border-gray-600/30 shadow-lg">
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                                    <FaLightbulb className="text-white" />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Stay relevant with industry trends</span>
                            </div>
                            
                            <div className="flex items-center gap-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-white/20 dark:border-gray-600/30 shadow-lg">
                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                                    <FaLightbulb className="text-white" />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Attract more learners with updated info</span>
                            </div>
                            
                            <div className="flex items-center gap-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-white/20 dark:border-gray-600/30 shadow-lg">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                                    <FaLightbulb className="text-white" />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Improve the overall learning experience</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 lg:p-8"
                    >
                        <form onSubmit={handleUpdate} className="space-y-6">
                            
                            {/* Course Title */}
                            <div>
                                <label className="block mb-3 text-lg font-semibold text-gray-800 dark:text-white">
                                    Course Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={course.title}
                                    className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 text-gray-800 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                                    placeholder="Enter course title"
                                />
                            </div>

                            {/* Short Description */}
                            <div>
                                <label className="block mb-3 text-lg font-semibold text-gray-800 dark:text-white">
                                    Course Description
                                </label>
                                <textarea
                                    name="description"
                                    defaultValue={course.description}
                                    className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 text-gray-800 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                                    rows={4}
                                    placeholder="Enter course description"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block mb-3 text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                    <FaImage className="text-cyan-500" />
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    defaultValue={course.image}
                                    className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 text-gray-800 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                                    placeholder="Enter image URL"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Duration */}
                                <div>
                                    <label className="block mb-3 text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                        <FaClock className="text-cyan-500" />
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        name="duration"
                                        defaultValue={course.duration}
                                        className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 text-gray-800 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                                        placeholder="e.g., 10 weeks"
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block mb-3 text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                        <FaDollarSign className="text-cyan-500" />
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        defaultValue={course.price}
                                        className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 text-gray-800 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                                        placeholder="Enter price"
                                    />
                                </div>
                            </div>

                            {/* Available Seats */}
                            <div>
                                <label className="block mb-3 text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                    <FaUsers className="text-cyan-500" />
                                    Available Seats
                                </label>
                                <input
                                    type="number"
                                    name="availableSeats"
                                    min="1"
                                    defaultValue={course.availableSeats}
                                    className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 text-gray-800 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                                    placeholder="Enter available seats"
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform flex items-center justify-center gap-3"
                            >
                                <FaEdit className="text-white" />
                                Update Course
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default EditCourse;