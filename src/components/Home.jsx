import React from 'react';
import HeroSlider from './HeroSlider';
import LatestCourse from './LatestCourse';
import WhyChoose from './WhyChoose';
import StudentFeedback from './StudentFeedback';


const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <LatestCourse></LatestCourse>
            <WhyChoose></WhyChoose>
            <StudentFeedback></StudentFeedback>
        </div>
    );
};

export default Home;