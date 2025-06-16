import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigation } from 'react-router';

const Register = () => {

    useEffect(() => {
        document.title = 'Register | EduPath';
    }, []);

    const navigate = useNavigation()
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

        <div className='flex justify-center mt-20'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className='text-3xl font-bold text-center'>Register Now</h1>
                <div className="card-body">
                    <form onSubmit={handleRegister} className="fieldset">

                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="Name" />

                        <label className="label">Photo URL</label>
                        <input type="text" name='photo' className="input" placeholder="Photo URL" />

                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />

                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />

                        <label className="label">Confirm Password</label>
                        <input type="password" name='confirmPassword' className="input" placeholder="Confirm Password" />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button className="btn btn-neutral mt-4">Register</button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Register;