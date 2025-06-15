import React from 'react';
import HeroSlider from './HeroSlider';
import LatestCourse from './LatestCourse';
import PopularCourse from './PopularCourse';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <LatestCourse></LatestCourse>
            <PopularCourse></PopularCourse>
        </div>
    );
};

export default Home;