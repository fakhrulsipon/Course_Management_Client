import React, { useEffect } from 'react';
import { FaRocket, FaUsers, FaGraduationCap, FaHandsHelping, FaStar, FaAward, FaHeart, FaGlobeAmericas } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutUs = () => {
    useEffect(() => {
        document.title = 'About Us | EduPath';
    }, []);

    // Refined animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        },
        hover: {
            scale: 1.02,
            y: -5,
            transition: {
                duration: 0.3
            }
        }
    };

    const stats = [
        { number: '10K+', label: 'Happy Students', icon: '👨‍🎓', delay: 0.1 },
        { number: '50+', label: 'Expert Instructors', icon: '👨‍🏫', delay: 0.2 },
        { number: '100+', label: 'Courses Available', icon: '📚', delay: 0.3 },
        { number: '95%', label: 'Success Rate', icon: '🎯', delay: 0.4 }
    ];

    const values = [
        {
            icon: '📚',
            title: 'Lifelong Learning',
            description: 'Education is a continuous journey that transforms lives at every stage.',
            color: 'from-cyan-500 to-blue-500',
            delay: 0.1
        },
        {
            icon: '🤝',
            title: 'Inclusivity',
            description: 'Building bridges across diverse backgrounds where every voice is valued.',
            color: 'from-green-500 to-emerald-500',
            delay: 0.2
        },
        {
            icon: '💡',
            title: 'Innovation',
            description: 'Pioneering cutting-edge learning technologies for effective education.',
            color: 'from-purple-500 to-pink-500',
            delay: 0.3
        },
        {
            icon: '🌟',
            title: 'Excellence',
            description: 'Setting the highest standards in educational quality and support.',
            color: 'from-orange-500 to-red-500',
            delay: 0.4
        },
        {
            icon: '🌍',
            title: 'Global Community',
            description: 'Connecting minds across continents for collaborative learning.',
            color: 'from-indigo-500 to-purple-500',
            delay: 0.5
        },
        {
            icon: '🚀',
            title: 'Growth Mindset',
            description: 'Empowering learners to embrace challenges and achieve growth.',
            color: 'from-teal-500 to-cyan-500',
            delay: 0.6
        }
    ];

    const features = [
        { icon: FaStar, text: "Industry Certifications", color: "text-yellow-400" },
        { icon: FaAward, text: "Award-Winning Content", color: "text-purple-400" },
        { icon: FaHeart, text: "Student-First Approach", color: "text-pink-400" },
        { icon: FaGlobeAmericas, text: "Global Network", color: "text-green-400" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-400/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-400/10 rounded-full blur-2xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6"
                    >
                        <FaGraduationCap className="text-white text-2xl" />
                    </motion.div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        About EduPath
                    </h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        Welcome to <span className="font-semibold text-cyan-600">EduPath</span> — 
                        transforming aspirations into achievements through innovative education.
                    </motion.p>

                    {/* Stats Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                custom={stat.delay}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 border border-white/20 dark:border-gray-700/20 shadow-lg text-center"
                            >
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Mission and Vision */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16"
                >
                    {/* Mission */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="group"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
                                    <FaRocket className="text-white text-lg" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Our Mission
                                </h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                To democratize world-class education by creating accessible, engaging, and transformative 
                                learning experiences that empower individuals to thrive in an ever-evolving global landscape.
                            </p>
                        </div>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="group"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                                    <FaGraduationCap className="text-white text-lg" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Our Vision
                                </h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                To pioneer the future of education by creating a world where learning knows no boundaries 
                                and technology unlocks unprecedented opportunities for personal transformation.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Features Highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-16"
                >
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-white/50 to-white/20 dark:from-gray-700/50 dark:to-gray-700/20"
                                >
                                    <feature.icon className={`text-xl ${feature.color}`} />
                                    <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                                        {feature.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Core Values Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mb-16"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                            The principles that guide our mission and shape your learning experience
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                custom={value.delay}
                                whileHover="hover"
                                className="group"
                            >
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-5 border border-white/20 dark:border-gray-700/20 shadow-lg h-full">
                                    <div className="text-2xl mb-3">{value.icon}</div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Community Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-16"
                >
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-200/20 dark:border-cyan-500/20 shadow-lg">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                                <FaUsers className="text-white text-xl" />
                            </div>
                            
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                Join Our Learning Community
                            </h2>
                            
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mb-6">
                                We're a vibrant community of lifelong learners, educators, and innovators united by 
                                a shared commitment to growth and excellence.
                            </p>
                            
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md"
                            >
                                <FaHandsHelping className="inline mr-2" />
                                Join Community
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-center"
                >
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                            Ready to Begin Your Journey?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                            Start your learning adventure with our expert-led courses and supportive community
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md"
                        >
                            <FaRocket className="inline mr-2" />
                            Explore Courses
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;