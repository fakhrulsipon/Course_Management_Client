import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const CourseDetails = () => {
    const course = useLoaderData();
    const { user } = use(AuthContext)
    const [enrolled, setEnrolled] = useState(false);

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

    const handleEnroll = () => {
        if (!user) return;

        const data = {
            email: user.email,
            courseId: course._id
        };

        axios.post('http://localhost:3000/enroll', data)
            .then(() => {
                setEnrolled(true);
            })
            .catch(err => {
                console.error('Enrollment error:', err);
            });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-white shadow-md rounded-lg p-6">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover rounded mb-6"
                />
                <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
                <p className="text-gray-500 mb-2">
                    Posted on: {new Date(course.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{course.description}</p>

                {/* Enroll Button */}
                <div className="mt-6">
                    <button
                        onClick={handleEnroll}
                        disabled={!user || enrolled}
                        className="disabled:bg-gray-400 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                    >
                        {enrolled ? 'Enrolled' : 'Enroll'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
