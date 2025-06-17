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

        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-200 px-4">
  <div className="card w-full max-w-md shadow-xl bg-white border border-green-300">
    <div className="card-body">
      <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">Login Now</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type={show ? "text" : "password"}
            name="password"
            className="input input-bordered w-full pr-10"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-9 text-gray-600 hover:text-gray-900"
          >
            {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>

        <button className="btn btn-neutral w-full">Login</button>
      </form>

      <div className="divider my-6">OR</div>

      {/* Social Login Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleGoogle}
          className="btn btn-outline btn-error w-full flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.24 0 5.96 1.11 8.17 2.93l6.1-6.1C34.35 2.33 29.52 0 24 0 14.84 0 6.91 5.8 3.3 14.06l7.88 6.13C13.08 13.58 18.15 9.5 24 9.5z" />
            <path fill="#34A853" d="M46.64 24.5c0-1.44-.14-2.83-.4-4.17H24v7.89h12.74c-.55 2.97-2.21 5.49-4.71 7.14l7.26 5.65c4.26-3.94 6.35-9.81 6.35-16.51z" />
            <path fill="#FBBC05" d="M10.41 28.56c-.6-1.8-.95-3.73-.95-5.72s.35-3.92.95-5.72L2.53 11C.91 14.09 0 17.43 0 21c0 3.57.91 6.91 2.53 10l7.88-6.13z" />
            <path fill="#4285F4" d="M24 42c5.52 0 10.35-1.83 13.8-4.94l-7.26-5.65c-2.01 1.35-4.58 2.15-7.54 2.15-5.84 0-10.8-4.08-12.57-9.6L3.3 33.94C6.91 42.2 14.84 48 24 48z" />
          </svg>
          Continue with Google
        </button>

        <button
          onClick={handleGithub}
          className="btn btn-outline w-full flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.375 0 0 5.375 0 12c0 5.301 3.438 9.8 8.207 11.387.6.112.793-.262.793-.581 0-.287-.012-1.237-.018-2.244-3.338.726-4.042-1.609-4.042-1.609-.546-1.387-1.332-1.756-1.332-1.756-1.089-.744.082-.729.082-.729 1.204.084 1.838 1.237 1.838 1.237 1.07 1.836 2.807 1.305 3.492.997.107-.775.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.932 0-1.311.469-2.381 1.237-3.221-.124-.303-.537-1.524.118-3.176 0 0 1.008-.322 3.301 1.23a11.44 11.44 0 0 1 3.002-.404c1.018.005 2.047.138 3.002.404 2.291-1.552 3.297-1.23 3.297-1.23.657 1.652.244 2.873.12 3.176.771.84 1.236 1.91 1.236 3.221 0 4.61-2.807 5.625-5.479 5.921.429.369.813 1.096.813 2.212 0 1.597-.015 2.884-.015 3.273 0 .321.192.697.801.578C20.565 21.796 24 17.298 24 12c0-6.625-5.375-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>
      </div>

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <a href="/register" className="ml-1 text-green-600 font-semibold hover:underline">
          Register here
        </a>
      </p>
    </div>
  </div>
</div>
    );
};

export default Login;