import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FiBookOpen, FiFileText, FiImage, FiClock, FiUsers, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion";

const AddCourse = () => {
    const navigate = useNavigate()
    const [userImage, setUserImage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'Add Course | EduPath';
    }, []);

    const { user } = use(AuthContext)

    const handleAddCourse = (e) => {
        e.preventDefault()
        setLoading(true);
        
        const title = e.target.title.value;
        const description = e.target.description.value;
        const image = userImage;
        const duration = e.target.duration.value;
        const availableSeats = e.target.availableSeats.value;
        const price = e.target.price.value;

        const newCourse = {
            title,
            description,
            image,
            duration,
            availableSeats,
            price,
            instructorEmail: user?.email,
            instructorName: user?.displayName,
            createdAt: new Date().toISOString()
        }

        axios.post('https://coursemanagementserver-production.up.railway.app/add-course', newCourse)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Course Added Successfully!',
                        text: 'Your new course has been published.',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    navigate('/courses')
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Add Course',
                    text: error?.response?.data?.message || 'Please try again.',
                    timer: 2000,
                    showConfirmButton: false
                });
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleImage = async (e) => {
        const image = e.target.files[0];
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image)

        try {
            const imgUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
            const res = await axios.post(imgUrl, formData)
            setUserImage(res.data.data.url)
            Swal.fire({
                icon: 'success',
                title: 'Image Uploaded!',
                text: 'Course image uploaded successfully.',
                timer: 1000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'Failed to upload image. Please try again.',
            });
        }
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
                        Create New Course
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Share your expertise and inspire learners worldwide with your knowledge
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl">
                            <form onSubmit={handleAddCourse} className="space-y-6">
                                {/* Course Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                                            <FiBookOpen className="text-white text-lg" />
                                        </div>
                                        <span>Course Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                                        placeholder="Enter an engaging course title"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                            <FiFileText className="text-white text-lg" />
                                        </div>
                                        <span>Course Description</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                                        placeholder="Describe what students will learn in this course..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Duration */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                                <FiClock className="text-white text-lg" />
                                            </div>
                                            <span>Duration</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="duration"
                                            className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                                            placeholder="e.g., 4 Months, 12 Weeks"
                                            required
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                                <FiDollarSign className="text-white text-lg" />
                                            </div>
                                            <span>Price (৳)</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                                            placeholder="Enter course price"
                                            min="0"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Available Seats */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                                <FiUsers className="text-white text-lg" />
                                            </div>
                                            <span>Available Seats</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="availableSeats"
                                            min="1"
                                            required
                                            className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
                                            placeholder="Number of seats"
                                        />
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                                <FiImage className="text-white text-lg" />
                                            </div>
                                            <span>Course Image</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                onChange={handleImage}
                                                accept="image/*"
                                                className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
                                                required
                                            />
                                        </div>
                                        {userImage && (
                                            <div className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                Image uploaded successfully!
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Instructor Info */}
                                <div className="bg-cyan-500/10 rounded-2xl p-4 border border-cyan-500/20">
                                    <h4 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2">Instructor Information</h4>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {user?.displayName?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 dark:text-white">{user?.displayName || 'User'}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: loading ? 1 : 1.02 }}
                                    whileTap={{ scale: loading ? 1 : 0.98 }}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Adding Course...
                                        </>
                                    ) : (
                                        <>
                                            <FiBookOpen className="text-xl" />
                                            Publish Course
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl h-full">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
                                Course Creation Guide
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white font-bold text-sm">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Engaging Title</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            Choose a clear, descriptive title that captures the course essence and attracts learners.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white font-bold text-sm">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Compelling Description</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            Describe what students will achieve and the skills they'll gain from your course.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white font-bold text-sm">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Quality Visuals</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            Use high-quality images that represent your course content and attract attention.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-white font-bold text-sm">4</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Realistic Pricing</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            Set a fair price that reflects the value and depth of your course content.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-4 border border-cyan-500/20 mt-6">
                                    <h4 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2">Pro Tips</h4>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                                            Be specific about learning outcomes
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                                            Include practical projects and exercises
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                                            Set appropriate difficulty level
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                                            Plan your course structure in advance
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;