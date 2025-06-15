import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const MyEnrolled = () => {
    const { user } = use(AuthContext)
    const [myEnrolled, setMyEnrolled] = useState([]);
    console.log(myEnrolled)
    useEffect(() => {
        if(user?.email){
            axios.get(`http://localhost:3000/enrolled-courses?email=${user.email}`)
            .then(res => {
                setMyEnrolled(res.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }, [user])
    return (
        <div className="overflow-x-auto my-10 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">My Enrolled Courses</h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gradient-to-r from-green-100 to-green-200 text-gray-700">
                    <tr>
                        <th className="text-left px-4 py-3 font-semibold">Title</th>
                        <th className="text-left px-4 py-3 font-semibold">Description</th>
                        <th className="text-left px-4 py-3 font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myEnrolled.map(course => (
                        <tr key={course._id} className="border-t hover:bg-gray-50 transition duration-200">
                            <td className="px-4 py-3 text-sm text-gray-800">{course.title}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{course.description}</td>
                            <td className="px-4 py-3">
                                <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
                                    Remove Enrollment
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyEnrolled;