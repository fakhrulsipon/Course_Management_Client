import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';


const Register = () => {

    useEffect(() => {
        document.title = 'Register | EduPath';
    }, []);

    const navigate = useNavigate()
    const { registerUser, setUser, updateUserProfile } = use(AuthContext)
    const [error, setError] = useState('');
    const handleRegister = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        // console.log(name, photo, email, password, confirmPassword)

        setError('');

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

        if (!passwordRegex.test(password)) {
            return setError(
                'Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.'
            );
        }
        if (password !== confirmPassword) {
            return setError('Password and Confirm Password do not match.');
        }
        if (password.includes(email)) {
            return setError('Password cannot contain your email address.');
        }

        registerUser(email, password)
            .then(res => {
                const updateUser = {
                    displayName: name, photoURL: photo
                }
                updateUserProfile(updateUser)
                    .then(() => {
                        setUser({ ...res.user, displayName: name, photoURL: photo })
                        Swal.fire({
                            icon: 'success',
                            title: 'Register Successful',
                            text: `Welcome, ${res?.user?.displayName || 'User'}!`,
                            timer: 1500,
                            showConfirmButton: false
                        });
                        navigate('/')
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed',
                            text: error.message || 'Something went wrong!',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    })
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Register Failed',
                    text: error.message || 'Something went wrong!',
                    timer: 1500,
                    showConfirmButton: false
                });
            })
    }
    return (

        <div className="pt-10 flex items-center justify-center min-h-screen bg-gradient-to-tr from-green-50 via-white to-green-100 px-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-transform duration-300 hover:scale-[1.01]">
    <h1 className="text-4xl font-bold text-center text-green-600 mb-6">Register Now</h1>

    <form onSubmit={handleRegister} className="space-y-4">

      <div>
        <label className="block text-sm font-semibold text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Photo URL</label>
        <input
          type="text"
          name="photo"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your photo URL"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter password"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Confirm password"
          required
        />
      </div>

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        Register
      </button>
    </form>

    <p className="mt-6 text-center text-sm text-gray-600">
      Already have an account?
      <a href="/login" className="ml-1 text-green-600 font-semibold hover:underline">
        Login here
      </a>
    </p>
  </div>
</div>
    );
};

export default Register;