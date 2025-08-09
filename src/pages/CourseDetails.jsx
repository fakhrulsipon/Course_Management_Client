import React, { use, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

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
            alert(err?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
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
                <p className="text-gray-700 mb-2">{course.description}</p>

                <p className="text-lg font-medium mt-4">
                    Seats Left: {seats > 0 ? seats : <span className="text-red-500">No seats left</span>}
                </p>

                {/* Enroll / Unenroll Button */}
                <div className="mt-6">
                    {
                        seats > 0 || enrolled ? (
                            <button
                                onClick={handleEnrollToggle}
                                disabled={!user || loading}
                                className={`px-6 py-2 rounded text-white ${enrolled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} disabled:bg-gray-400 disabled:cursor-not-allowed`}
                            >
                                {enrolled ? 'Unenroll' : 'Enroll'}
                            </button>
                        ) : (
                            <span className="text-red-500 font-semibold">No seats left</span>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
