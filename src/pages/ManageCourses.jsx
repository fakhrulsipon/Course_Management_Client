import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const ManageCourses = () => {

    useEffect(() => {
        document.title = 'Manage Courses | EduPath';
    }, []);

    const { user } = use(AuthContext)
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true)
    // console.log(myCourses)

    useEffect(() => {
        setLoading(true)
        if (user?.email) {
            axios.get(`http://localhost:3000/my-courses?email=${user.email}`)
                .then(res => {
                    setMyCourses(res.data)
                    setLoading(false)
                })
                .catch(error => {
                    Swal.fire({
                        title: "Error!",
                        text: error.message,
                        icon: "error"
                    });
                    setLoading(false)
                })
        }
    }, [user])

     if(loading){
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-bars loading-xl text-green-600"></span>
      </div>
    );
  }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`http://localhost:3000/delete-course/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remaining = myCourses.filter(course => course._id !== id)
                            setMyCourses(remaining)
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: error.message,
                            icon: "error"
                        });
                    })
            }
        });

    }
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
                                    <button onClick={() => handleDelete(course._id)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
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



