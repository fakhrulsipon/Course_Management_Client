import React from 'react';
import { motion } from 'framer-motion';

const WhyChoose = () => {
  const features = [
    {
      id: 1,
      title: "Expert Instructors",
      description: "Learn from industry professionals with real-world experience and proven track records.",
      icon: "👨‍🏫",
      gradient: "from-cyan-500 to-blue-500",
      delay: 0.1
    },
    {
      id: 2,
      title: "Flexible Learning",
      description: "Study anytime, anywhere at your own pace with lifetime access to all course materials.",
      icon: "⏰",
      gradient: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      id: 3,
      title: "Certification",
      description: "Get industry-recognized certificates that enhance your resume and career prospects.",
      icon: "📜",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.3
    },
    {
      id: 4,
      title: "Hands-on Projects",
      description: "Build real-world projects and portfolios that showcase your skills to employers.",
      icon: "💻",
      gradient: "from-orange-500 to-red-500",
      delay: 0.4
    },
    {
      id: 5,
      title: "Community Support",
      description: "Join active learning communities and get support from peers and mentors.",
      icon: "👥",
      gradient: "from-indigo-500 to-purple-500",
      delay: 0.5
    },
    {
      id: 6,
      title: "Career Guidance",
      description: "Get career counseling and job placement assistance to kickstart your career.",
      icon: "🎯",
      gradient: "from-teal-500 to-cyan-500",
      delay: 0.6
    }
  ];

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
          Why Choose Us
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Discover the unique advantages that make us the preferred choice for thousands of successful learners worldwide
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: feature.delay }}
            whileHover={{ 
              scale: 1.05,
              y: -5
            }}
            className="group relative"
          >
            {/* Background Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition duration-300`}></div>
            
            {/* Feature Card */}
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              
              {/* Icon Container */}
              <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition duration-300 -z-10`}>
                <div className="absolute inset-[2px] rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-12 md:mt-16"
      >
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto border border-white/20 dark:border-gray-700/20">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of successful learners who have transformed their careers with us.
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WhyChoose;