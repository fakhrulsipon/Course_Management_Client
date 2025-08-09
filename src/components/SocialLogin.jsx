import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';



const SocialLogin = () => {
    const { signInGoogle, signInGithub } = use(AuthContext)
    const location = useLocation()
   const navigate = useNavigate()

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
        <div>
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
        </div>
    );
};

export default SocialLogin;