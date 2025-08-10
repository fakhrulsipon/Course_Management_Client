import React, { useEffect } from 'react';
import { FaRocket, FaUsers, FaCheckCircle, FaGraduationCap } from 'react-icons/fa';

const AboutUs = () => {
    useEffect(() => {
    document.title = 'About Us | EduPath';
}, []);
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-2 dark:text-white">About Us</h1>

            <p className="text-gray-700 text-base sm:text-lg text-center leading-relaxed mb-10 max-w-3xl mx-auto px-2 dark:text-white">
                Welcome to <span className="font-semibold text-blue-500">EduPath</span> — your trusted course management platform!
                We believe in the power of learning and strive to deliver high-quality education for everyone. Whether you're just starting
                out or advancing your career, we're here to support your growth.
            </p>

            {/* Mission and Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-blue-50 p-6 sm:p-8 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 text-blue-400 flex items-center gap-2">
                        <FaRocket /> Our Mission
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        To provide accessible, affordable, and engaging learning experiences that empower individuals to succeed in today's fast-changing world.
                    </p>
                </div>
                <div className="bg-green-50 p-6 sm:p-8 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 text-green-400 flex items-center gap-2">
                        <FaGraduationCap /> Our Vision
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        To be a global leader in online education, transforming lives through knowledge and technology.
                    </p>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="mb-12">
                <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6 dark:text-white">Our Core Values</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                        <h4 className="font-bold text-blue-400 mb-2 text-lg">📚 Lifelong Learning</h4>
                        <p className="text-gray-600 text-sm sm:text-base">
                            We believe education is a journey, not a destination. We encourage learning at every stage of life.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                        <h4 className="font-bold text-green-600 mb-2 text-lg">🤝 Inclusivity</h4>
                        <p className="text-gray-600 text-sm sm:text-base">
                            We welcome learners from all backgrounds and strive to build a diverse and inclusive environment.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                        <h4 className="font-bold text-red-400 mb-2 text-lg">💡 Innovation</h4>
                        <p className="text-gray-600 text-sm sm:text-base">
                            We embrace technology to create smarter, more engaging, and effective ways to learn.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="text-center px-2">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 dark:text-white">Our Community</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-sm sm:text-base leading-relaxed dark:text-white">
                    We are more than a platform — we are a learning family. With thousands of learners and instructors worldwide, we grow together through collaboration and support.
                </p>
                <div className="flex justify-center text-4xl text-green-500">
                    <FaUsers />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;