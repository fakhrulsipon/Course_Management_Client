import React from 'react';
import { Link } from 'react-router';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <FaExclamationTriangle className="text-red-500 text-7xl mb-6" />
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md text-center">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
