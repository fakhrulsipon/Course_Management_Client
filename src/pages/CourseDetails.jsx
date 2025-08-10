import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const CourseDetails = () => {
  const course = useLoaderData();
  const { user } = use(AuthContext);

  const [enrolled, setEnrolled] = useState(false);
  const [seats, setSeats] = useState(course.availableSeats || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Course Details | EduPath';
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:3000/check-enroll?email=${user.email}&courseId=${course._id}`)
        .then(res => {
          setEnrolled(res.data.enrolled);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [user, course._id]);

  const handleEnrollToggle = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:3000/enroll', {
        email: user.email,
        courseId: course._id
      });


      if (data.message === 'Enrollment removed successfully') {
        setEnrolled(false);
        setSeats(prev => prev + 1);
      }


      if (data.message === 'Enrolled successfully') {
        setEnrolled(true);
        setSeats(prev => prev - 1);
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="w-full rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">

        {/* Image Section */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
          <p className="mt-4 text-sm text-gray-500 italic">
            "Empowering learners to achieve their career goals."
          </p>
        </div>

        {/* Content Section */}
        <div>
          {/* Title */}
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            {course.title}
          </h2>

          {/* Duration & Posted Date */}
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Duration:</span> {course.duration}
          </p>
          <p className="text-gray-500 mb-4">
            <span className="font-semibold">Posted on:</span>{" "}
            {new Date(course.createdAt).toLocaleDateString()}
          </p>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {course.description}
          </p>

          {/* Seats Info */}
          <p className="text-lg font-medium">
            Seats Left:{" "}
            {seats > 0 ? (
              seats
            ) : (
              <span className="text-red-500">No seats left</span>
            )}
          </p>

          <p className='font-medium text-xl'>Price: {course.price}</p>

          {/* Enroll/Unenroll Button */}
          <div className="mt-6">
            {seats > 0 || enrolled ? (
              <button
                onClick={handleEnrollToggle}
                disabled={!user || loading}
                className={`px-6 py-2 rounded-lg shadow-md text-white font-semibold transition duration-300 ${enrolled
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                  } disabled:bg-gray-400 disabled:cursor-not-allowed`}
              >
                {enrolled ? "Unenroll" : "Enroll"}
              </button>
            ) : (
              <span className="text-red-500 font-semibold">No seats left</span>
            )}
          </div>

          {/* Static Motivational Text */}
          <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Why Join This Course?
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Learn from industry-leading instructors.</li>
              <li>Hands-on projects & real-world scenarios.</li>
              <li>Lifetime access to all course materials.</li>
              <li>Boost your career with recognized certification.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CourseDetails;
