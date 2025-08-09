import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Login = () => {

    useEffect(() => {
        document.title = 'Login | EduPath';
    }, []);

    const location = useLocation()
    const navigate = useNavigate()
    const { loginUser, signInGoogle, signInGithub } = use(AuthContext)
    const [show, setShow] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        loginUser(email, password)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome, ${res?.user?.displayName || 'User'}!`,
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate(location.state || '/')
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message || 'Something went wrong!',
                    timer: 1500,
                    showConfirmButton: false
                });
            })
    }

    const handleGoogle = () => {
        signInGoogle()
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome, ${res?.user?.displayName || 'User'}!`,
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate(location.state || '/')
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message || 'Something went wrong!',
                    timer: 1500,
                    showConfirmButton: false
                });
            })
    }

    const handleGithub = () => {
        signInGithub()
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome, ${res?.user?.displayName || 'User'}!`,
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate(location.state || '/')
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message || 'Something went wrong!',
                    timer: 1500,
                    showConfirmButton: false
                });
            })
    }

    return (

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-green-50 via-white to-green-100 px-4 pt-10">
  <div className="w-full max-w-md bg-white border border-green-300 rounded-2xl shadow-xl p-8 transition duration-300 hover:scale-[1.01]">
    <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">Login Now</h2>

    <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="relative">
        <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
        <input
          type={show ? "text" : "password"}
          name="password"
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-9 text-gray-500 hover:text-green-600"
        >
          {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>

      <button className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">
        Login
      </button>
    </form>

    <div className="flex items-center my-6">
      <div className="flex-grow h-px bg-gray-300"></div>
      <span className="mx-4 text-sm text-gray-500">OR</span>
      <div className="flex-grow h-px bg-gray-300"></div>
    </div>

    <div className="space-y-3">
      <button
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-red-50 transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
        <span className="font-medium text-sm">Continue with Google</span>
      </button>

      <button
        onClick={handleGithub}
        className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.375 0 0 5.375 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6 0-.3 0-1.2 0-2.2-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.9-.2 1.9-.4 3-.4s2.1.1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2 0 1.6 0 2.9 0 3.3 0 .3.2.7.8.6C20.6 21.8 24 17.3 24 12c0-6.6-5.4-12-12-12z" />
        </svg>
        <span className="font-medium text-sm">Continue with GitHub</span>
      </button>
    </div>

    <p className="mt-6 text-center text-sm text-gray-600">
      Don't have an account?
      <a href="/register" className="ml-1 text-green-600 font-semibold hover:underline">
        Register here
      </a>
    </p>
  </div>
</div>
    );
};

export default Login;