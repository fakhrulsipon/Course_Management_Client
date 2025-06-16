import React, { useEffect } from 'react';
import HeroSlider from './HeroSlider';
import LatestCourse from './LatestCourse';
import WhyChoose from './WhyChoose';
import StudentFeedback from './StudentFeedback';
import PopularCourses from './PopularCourse';


const Home = () => {
    useEffect(() => {
        document.title = 'Home | EduPath';
    }, []);
    return (
        <div>
            <HeroSlider></HeroSlider>
            <LatestCourse></LatestCourse>
            <PopularCourses></PopularCourses>
            <WhyChoose></WhyChoose>
            <StudentFeedback></StudentFeedback>
        </div>
    );
};

export default Home;