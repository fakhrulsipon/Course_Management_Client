import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import loginLottie from '../assets/loginLottie.json'
import Lottie from 'lottie-react';
import SocialLogin from '../components/SocialLogin';

const Login = () => {

  useEffect(() => {
    document.title = 'Login | EduPath';
  }, []);

  const location = useLocation()
  const navigate = useNavigate()
  const { loginUser } = use(AuthContext)
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

  return (
      <div className="flex lg:flex-row flex-col-reverse items-center justify-center min-h-screen px-4 pt-8">

        <div className="w-full max-w-md bg-white border border-blue-300 rounded-2xl p-8 transition duration-300">
          <h2 className="text-3xl font-extrabold text-center text-blue-500 mb-6">Login Now</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 dark:text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="relative">
              <label className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 dark:text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-9 text-gray-500 hover:text-blue-500"
              >
                {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <button className="w-full py-2 px-4 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300">
              Login
            </button>
          </form>

          <SocialLogin></SocialLogin>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            <a href="/register" className="ml-1 text-blue-400 font-semibold hover:underline">
              Register here
            </a>
          </p>
        </div>

        {/* ✅ Right: Responsive Lottie Animation */}
      <div className="w-full max-w-md">
        <Lottie animationData={loginLottie} loop={true} style={{ width: '100%', height: '100%' }} />
      </div>

      </div>

      
  );
};

export default Login;
