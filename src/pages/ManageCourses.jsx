import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router';

const ManageCourses = () => {
    const { user } = use(AuthContext)
    const [myCourses, setMyCourses] = useState([]);
    console.log(myCourses)

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/my-courses?email=${user.email}`)
                .then(res => {
                    setMyCourses(res.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [user])
    return (
        <div className="overflow-x-auto my-10 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Added Courses</h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700">
                    <tr>
                        <th className="text-left px-4 py-3 font-semibold">Title</th>
                        <th className="text-left px-4 py-3 font-semibold">Short Description</th>
                        <th className="text-left px-4 py-3 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myCourses.map(course => (
                        <tr key={course._id} className="border-t hover:bg-gray-50 transition duration-200">
                            <td className="px-4 py-3 text-sm text-gray-800">{course.title}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{course.description}</td>
                            <td className="px-4 py-3">
                                <div className="flex flex-wrap gap-2">
                                    <Link to={`/edit-course/${course._id}`}><button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
                                        Edit
                                    </button></Link>
                                    <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageCourses;