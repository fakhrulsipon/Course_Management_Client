import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

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
    ? "text-blue-400 border-b-2 border-blue-400 font-bold transition-all duration-200" 
    : "hover:text-blue-400 transition-all duration-200";

  return (
    <div className="relative z-50 navbar bg-base-100/80 backdrop-blur-md shadow-md w-full rounded-xl mt-3  px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-xl font-semibold z-1">
            <li><NavLink to="/" className={NavLinkClass}>Home</NavLink></li>
            <li><NavLink to="/courses" className={NavLinkClass}>Courses</NavLink></li>
            {user && <>
              <li><NavLink to="/add-course" className={NavLinkClass}>Add Course</NavLink></li>
              <li><NavLink to="/manage-course" className={NavLinkClass}>Manage Course</NavLink></li>
              <li><NavLink to="/my-enrolled" className={NavLinkClass}>My Enrolled</NavLink></li>
            </>}
            <li><NavLink to="/about-us" className={NavLinkClass}>About Us</NavLink></li>
          </ul>
        </div>
        <img className="h-12 w-12 rounded-full mr-2 border-2 border-primary" src="/website-logo.avif" alt="Logo" />
        <span className="text-2xl font-extrabold text-blue-400 tracking-wide hidden md:block">EduPath</span>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium gap-4">
          <li><NavLink to="/" className={NavLinkClass}>Home</NavLink></li>
          <li><NavLink to="/courses" className={NavLinkClass}>Courses</NavLink></li>
          {user && <>
            <li><NavLink to="/add-course" className={NavLinkClass}>Add Course</NavLink></li>
            <li><NavLink to="/manage-course" className={NavLinkClass}>Manage Course</NavLink></li>
            <li><NavLink to="/my-enrolled" className={NavLinkClass}>My Enrolled</NavLink></li>

          </>}
          <li><NavLink to="/about-us" className={NavLinkClass}>About Us</NavLink></li>
        </ul>
      </div>

      <div className="navbar-end relative z-50">
        {
          user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:ring hover:ring-primary transition-all duration-300">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL} alt="User" />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box font-medium">
                <li><button onClick={hangleLogout} className="hover:text-red-600 transition duration-200">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link className="btn bg-blue-400 text-white hover:bg-blue-600 hover:text-white mr-2 transition duration-300 hover:scale-105" to="/login">Login</Link>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;

