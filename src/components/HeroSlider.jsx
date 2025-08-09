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
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex); 
    }
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index}>
          <div
            className="relative h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Animated Text Content */}
            {currentSlide === index && (
              <motion.div
                key={index} // Force re-render
                initial={{ opacity: 0, y: 90 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative text-center text-white px-4 z-10"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg md:text-2xl">{slide.subtitle}</p>
              </motion.div>
            )}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;