import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const HomeLayout = () => {
    return (
        <div>
            
            <nav className="sticky top-0 z-50 bg-white shadow-md">
              <Navbar></Navbar>  
            </nav>
            <div className='pb-16'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;