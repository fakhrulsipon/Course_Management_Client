import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const HomeLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Glassmorphism Navbar */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-2xl dark:bg-gray-950/95 border-b border-blue-200/50 dark:border-gray-800/50">
              <Navbar></Navbar>  
            </nav>
            
            {/* Premium Animated Gradient Background */}
            <div className='flex-1 bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-200 
                          dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-800
                          relative pb-16 overflow-hidden'>
                
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/30 to-transparent dark:via-gray-800/10 animate-pulse"></div>
                
                {/* Floating dots - Light mode only */}
                <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce dark:hidden"></div>
                <div className="absolute top-40 right-40 w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-300 dark:hidden"></div>
                <div className="absolute bottom-40 left-60 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-700 dark:hidden"></div>
                
                {/* Dark mode floating stars */}
                <div className="hidden dark:block absolute top-20 left-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="hidden dark:block absolute top-40 right-40 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse delay-500"></div>
                <div className="hidden dark:block absolute bottom-40 left-60 w-1 h-1 bg-indigo-300 rounded-full animate-pulse delay-1000"></div>
                <div className="hidden dark:block absolute top-60 right-60 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-700"></div>
                <div className="hidden dark:block absolute bottom-60 left-40 w-1 h-1 bg-slate-300 rounded-full animate-pulse delay-300"></div>
                
                {/* Gradient blobs - Light mode */}
                <div className="absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 blur-3xl dark:hidden"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-15 blur-3xl dark:hidden"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400 to-sky-400 rounded-full opacity-10 blur-2xl dark:hidden"></div>
                
                {/* Dark mode subtle blobs */}
                <div className="hidden dark:block absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-blue-900/30 to-indigo-900/20 rounded-full blur-3xl"></div>
                <div className="hidden dark:block absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-purple-900/20 to-gray-900/30 rounded-full blur-3xl"></div>
                <div className="hidden dark:block absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-slate-800/10 to-gray-900/20 rounded-full blur-2xl"></div>
                
                {/* Content */}
                <div className="relative z-20">
                    <Outlet></Outlet>
                </div>
            </div>
            
            {/* Stylish Footer */}
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;