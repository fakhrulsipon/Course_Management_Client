import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
    const {loginUser, signInGoogle, signInGithub } = use(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        loginUser(email, password)
        .then(res => {
            console.log(res.user)
        })
        .catch(error => {
            console.log(error)
        })
    }

const handleGoogle = () => {
signInGoogle()
.then(res => {
    console.log(res.user)
})
.catch(error => {
    console.log(error)
})
}

const handleGithub = () => {
signInGithub()
.then(res => {
    console.log(res.user)
})
.catch(error => {
    console.log(error)
})
}

    return (

        <div className='flex justify-center  mt-20'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className='text-3xl font-bold text-center'>Login Now</h1>
                    <form onSubmit={handleLogin} className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />

                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />

                        <button className="btn btn-neutral mt-4">Login</button>
                    </form>

                    {/* Social Login Buttons */}
                    <div className="divider">OR</div>
                    <div className="flex flex-col gap-2">
                        <button onClick={handleGoogle} className="btn btn-outline btn-error">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.24 0 5.96 1.11 8.17 2.93l6.1-6.1C34.35 2.33 29.52 0 24 0 14.84 0 6.91 5.8 3.3 14.06l7.88 6.13C13.08 13.58 18.15 9.5 24 9.5z" />
                                <path fill="#34A853" d="M46.64 24.5c0-1.44-.14-2.83-.4-4.17H24v7.89h12.74c-.55 2.97-2.21 5.49-4.71 7.14l7.26 5.65c4.26-3.94 6.35-9.81 6.35-16.51z" />
                                <path fill="#FBBC05" d="M10.41 28.56c-.6-1.8-.95-3.73-.95-5.72s.35-3.92.95-5.72L2.53 11C.91 14.09 0 17.43 0 21c0 3.57.91 6.91 2.53 10l7.88-6.13z" />
                                <path fill="#4285F4" d="M24 42c5.52 0 10.35-1.83 13.8-4.94l-7.26-5.65c-2.01 1.35-4.58 2.15-7.54 2.15-5.84 0-10.8-4.08-12.57-9.6L3.3 33.94C6.91 42.2 14.84 48 24 48z" />
                            </svg>
                            Continue with Google
                        </button>

                        <button onClick={handleGithub} className="btn btn-outline">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.375 0 0 5.375 0 12c0 5.301 3.438 9.8 8.207 11.387.6.112.793-.262.793-.581 0-.287-.012-1.237-.018-2.244-3.338.726-4.042-1.609-4.042-1.609-.546-1.387-1.332-1.756-1.332-1.756-1.089-.744.082-.729.082-.729 1.204.084 1.838 1.237 1.838 1.237 1.07 1.836 2.807 1.305 3.492.997.107-.775.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.932 0-1.311.469-2.381 1.237-3.221-.124-.303-.537-1.524.118-3.176 0 0 1.008-.322 3.301 1.23a11.44 11.44 0 0 1 3.002-.404c1.018.005 2.047.138 3.002.404 2.291-1.552 3.297-1.23 3.297-1.23.657 1.652.244 2.873.12 3.176.771.84 1.236 1.91 1.236 3.221 0 4.61-2.807 5.625-5.479 5.921.429.369.813 1.096.813 2.212 0 1.597-.015 2.884-.015 3.273 0 .321.192.697.801.578C20.565 21.796 24 17.298 24 12c0-6.625-5.375-12-12-12z" />
                            </svg>
                            Continue with GitHub
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;