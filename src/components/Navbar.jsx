import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import logo from '../../public/website-logo.avif'
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
  return (
    <div className="navbar bg-base-100 shadow-sm w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/courses'>Courses</NavLink></li>
            {user && <>
              <li><NavLink to='/add-course'>Add Course</NavLink></li>
              <li><NavLink to='/manage-course'>Manage Course</NavLink></li>
              <li><NavLink to='/my-enrolled'>My Enrolled</NavLink></li>
              <li><NavLink to='/about-us'>About Us</NavLink></li>
            </>}
          </ul>
        </div>
        <img className='h-12 w-12 rounded-full mr-2' src={logo} alt="" />
        <a className="btn btn-ghost text-xl">EduPath</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/courses'>Courses</NavLink></li>
          {
            user && <>
              <li><NavLink to='/add-course'>Add Course</NavLink></li>
              <li><NavLink to='/manage-course'>Manage Course</NavLink></li>
              <li><NavLink to='/my-enrolled'>My Enrolled</NavLink></li>
              <li><NavLink to='/about-us'>About Us</NavLink></li>
            </>
          }
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? <>
            <div className="dropdown dropdown-center">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="User" />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box font-bold text-xl">
                <li><Link onClick={hangleLogout}>Logout</Link></li>
              </ul>
            </div>
          </> :
            <>
              <Link className='btn mr-3' to='/login'>Login</Link>
              <Link className='btn' to='/register'>Register</Link>
            </>
        }
      </div>
    </div>
  );
};

export default Navbar;

