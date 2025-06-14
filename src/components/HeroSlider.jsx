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
    title: "Learn From Experts",
    subtitle: "Get guidance from experienced instructors",
    image: "https://i.ibb.co/r2RMN22L/colleagues-working-project-discussing-details-114579-2817.jpg"
  },
  {
    title: "Enroll & Grow",
    subtitle: "One click to enroll, a lifetime to benefit",
    image: "https://i.ibb.co/pj3nvvrr/550288-28d3b31889f84de8a7039fedb67c6ec0-mv2.jpg"
  },
  {
    title: "Track Your Progress",
    subtitle: "Stay organized and focused on your learning journey",
    image: "https://i.ibb.co/KjNDKd9F/stock-photo-track-your-progress-advice-white-chalk-text-on-a-vintage-slate-blackboard-306632363.jpg"
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