import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    title: "Master New Skills",
    subtitle: "Explore courses that boost your career",
    image: "https://i.ibb.co/8Ddkk8xG/657c2a4ca54cee8b9672049b-pexels-antoni-shkraba-4348401-1.jpg"
  },
  {
    title: "Unlock Your Potential",
    subtitle: "Learn with expert guidance and real-world projects",
    image: "https://i.ibb.co.com/xNCWLb4/slider-img2.jpg"
  },
  {
    title: "Learn Anytime, Anywhere",
    subtitle: "Access high-quality lessons from any device, any time",
    image: "https://i.ibb.co.com/YByDrcsk/slider-img3.jpg"
  },
  {
    title: "Track & Achieve Your Goals",
    subtitle: "Stay motivated and monitor your learning progress",
    image: "https://i.ibb.co.com/67KhksG7/Untitled-design.png"
  },
  {
    title: "Flexible Learning",
    subtitle: "Access your courses anytime, anywhere",
    image: "https://i.ibb.co/C53mZW69/a47caca0-b45b-44cb-9897-881360e7a289-6-ALearning-Hub-4990826.jpg"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          fade: false,
          speed: 800,
          cssEase: 'ease'
        }
      },
      {
        breakpoint: 768,
        settings: {
          fade: false,
          speed: 600,
          cssEase: 'ease',
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          fade: false,
          speed: 500,
          cssEase: 'ease',
          dots: true
        }
      }
    ],
    appendDots: dots => (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
        i === currentSlide ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'
      }`}></div>
    )
  };

  return (
    <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl mx-2 md:mx-4 mt-2 md:mt-4">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/50 to-transparent"></div>
              
              {/* Dynamic Color Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/25 to-purple-600/25 mix-blend-overlay"></div>

              {/* Progress Bar for Auto Slide */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-700/50 z-10">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: 5, 
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  key={currentSlide}
                />
              </div>

              {/* Responsive Text Content - Card Size Optimized */}
              {currentSlide === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative text-center text-white px-3 sm:px-4 z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
                >
                  {/* Card Container - Size Optimized for All Devices */}
                  <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-xs rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-white/20 shadow-xl">
                    
                    {/* Title - Responsive Font Sizes */}
                    <motion.h2 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent leading-tight"
                    >
                      {slide.title}
                    </motion.h2>
                    
                    {/* Subtitle - Responsive Font Sizes */}
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 font-light leading-relaxed sm:leading-normal md:leading-relaxed"
                    >
                      {slide.subtitle}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;