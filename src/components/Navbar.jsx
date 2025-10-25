import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import Swal from 'sweetalert2';
import ThemeToggle from './ThemeToggle';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
  const { user, logoutUser } = use(AuthContext)
  const hangleLogout = () => {
    logoutUser()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logged out',
          text: 'You have successfully signed out!',
          timer: 1500,
          showConfirmButton: false
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      })
  }

  const NavLinkClass = ({ isActive }) => 
  isActive 
    ? "text-blue-600 dark:text-cyan-400 font-semibold bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300 shadow-sm" 
    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-white/40 dark:hover:bg-gray-800/40 px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300";

  return (
    <div className="relative z-50 w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div className="navbar bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl mt-4 shadow-lg border border-white/20 dark:border-gray-700/20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-blue-600 dark:text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl mt-3 w-52 p-2 shadow-2xl font-medium z-50 border border-white/20 dark:border-gray-700/20">
              <li><NavLink to="/" className={NavLinkClass}>Home</NavLink></li>
              <li><NavLink to="/courses" className={NavLinkClass}>Courses</NavLink></li>
              {user && <>
                <li><NavLink to="/dashboard" className={NavLinkClass}>Dashboard</NavLink></li>
              </>}
              <li><NavLink to="/about-us" className={NavLinkClass}>About Us</NavLink></li>
            </ul>
          </div>
          <div className="flex items-center space-x-3">
            <img className="h-12 w-12 rounded-full border-2 border-blue-400 dark:border-cyan-400 shadow-lg" src="/website-logo.avif" alt="Logo" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              EduPath
            </span>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium gap-2">
            <li><NavLink to="/" className={NavLinkClass}>Home</NavLink></li>
            <li><NavLink to="/courses" className={NavLinkClass}>Courses</NavLink></li>
            {user && <>
            <li><NavLink to="/dashboard" className={NavLinkClass}>Dashboard</NavLink></li>
            </>}
            <li><NavLink to="/about-us" className={NavLinkClass}>About Us</NavLink></li>
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          <ThemeToggle></ThemeToggle>
          
          <div>
            {
            user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-blue-400 dark:hover:ring-cyan-400 transition-all duration-300 shadow-md">
                  <div className="w-10 rounded-full ring-2 ring-blue-400 dark:ring-cyan-400">
                    <img src={user?.photoURL} alt="User" />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl font-medium border border-white/20 dark:border-gray-700/20">
                  <li><button onClick={hangleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition duration-200 rounded-lg">Logout</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" 
                  to="/login"
                >
                  Login
                </Link>
              </>
            )
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;