import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation()
    if (loading) {
        return <div className='flex items-center justify-center min-h-[60vh]'>
            <div className="h-10 w-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-sky-600"></div>;
        </div>

    }
    if (!user) {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    return children
};

export default PrivetRoute;