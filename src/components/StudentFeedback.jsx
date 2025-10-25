import React from 'react';
import { motion } from 'framer-motion';

const StudentFeedback = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rafiul Islam",
      role: "Frontend Developer",
      avatar: "https://i.pravatar.cc/150?img=1",
      feedback: "This platform helped me get a job as a frontend developer. The instructors are top-notch and the project-based approach made learning practical and engaging!",
      rating: 5,
      delay: 0.1
    },
    {
      id: 2,
      name: "Mim Akter",
      role: "UX Designer",
      avatar: "https://i.pravatar.cc/150?img=2",
      feedback: "The courses are very clear and updated. Loved the interface and the flexibility to learn at my own pace while balancing work and studies.",
      rating: 5,
      delay: 0.2
    },
    {
      id: 3,
      name: "Jubayer Khan",
      role: "Backend Developer",
      avatar: "https://i.pravatar.cc/150?img=3",
      feedback: "I enrolled in 3 backend courses and I feel confident enough to apply for backend roles. The real-world projects were incredibly valuable.",
      rating: 5,
      delay: 0.3
    },
    {
      id: 4,
      name: "Tahmina Rahman",
      role: "Full Stack Developer",
      avatar: "https://i.pravatar.cc/150?img=4",
      feedback: "The mentorship program and career guidance helped me transition from traditional IT to modern web development. Life-changing experience!",
      rating: 5,
      delay: 0.4
    },
    {
      id: 5,
      name: "Sakib Hasan",
      role: "Mobile App Developer",
      avatar: "https://i.pravatar.cc/150?img=5",
      feedback: "The community support and hands-on projects gave me the confidence to publish my first app on Play Store. Highly recommended!",
      rating: 5,
      delay: 0.5
    },
    {
      id: 6,
      name: "Nusrat Jahan",
      role: "Data Scientist",
      avatar: "https://i.pravatar.cc/150?img=6",
      feedback: "The data science track covered everything from basics to advanced ML. The certificate helped me land my dream job at a tech company.",
      rating: 5,
      delay: 0.6
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center mb-3">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-lg ${
              index < rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

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
          What Our Students Say
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Join thousands of successful learners who have transformed their careers and achieved their dreams
        </motion.p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: testimonial.delay }}
            whileHover={{ 
              scale: 1.03,
              y: -5
            }}
            className="group relative"
          >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition duration-300"></div>
            
            {/* Testimonial Card */}
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              
              {/* Quote Icon */}
              <div className="text-4xl text-cyan-500/20 mb-4">❝</div>

              {/* Star Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Feedback Text */}
              <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed mb-6 flex-1">
                "{testimonial.feedback}"
              </p>

              {/* Student Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-2 border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition duration-300 -z-10">
                <div className="absolute inset-[2px] rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentFeedback;