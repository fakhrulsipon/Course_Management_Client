import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const MyEnrolled = () => {
    useEffect(() => {
        document.title = 'My Enrolled Courses | EduPath';
    }, []);

    const { user } = use(AuthContext)
    const [myEnrolled, setMyEnrolled] = useState([]);
    // console.log(myEnrolled)
    const [loading, setLoading] = useState(true)
    const[currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 1;

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/enrolled-courses?email=${user.email}&page=${currentPage}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(res => {
                    setMyEnrolled(res.data.courses)
                    setTotalPages(res.data.totalPages)
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
    }, [user, currentPage, limit])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="h-10 w-10 animate-[spin_2s_linear_infinite] rounded-full border-4 border-dashed border-sky-600"></div>;
            </div>
        );
    }

    const handleRemove = (id) => {
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
                axios.delete(`http://localhost:3000/delete-enrolled/${id}/${user.email}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remaining = myEnrolled.filter(item => item._id !== id);
                            setMyEnrolled(remaining);
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
        <div className='pt-16'>
            <div className="overflow-x-auto w-11/12 mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Enrolled Courses</h2>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-gradient-to-r from-green-100 to-green-200 text-gray-700">
                        <tr>
                            <th className="text-left px-4 py-3 font-semibold">Title</th>
                            <th className="text-left px-4 py-3 font-semibold">Description</th>
                            <th className="text-left px-4 py-3 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myEnrolled?.map(course => (
                            <tr key={course._id} className="border-t hover:bg-gray-50 transition duration-200">
                                <td className="px-4 py-3 text-sm text-gray-800">{course.title}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{course.description}</td>
                                <td className="px-4 py-3">
                                    <button onClick={() => handleRemove(course._id)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
                                        Remove Enrollment
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Buttons */}
            <div className="join flex flex-wrap justify-center mt-6 gap-2">
                {/* Previous Button */}
                <button
                    className="join-item btn btn-sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    «
                </button>

                {/* Dynamic Page Numbers */}
                {(() => {
                    const pages = [];
                    const maxVisiblePages = 5;
                    let startPage, endPage;

                    if (totalPages <= maxVisiblePages) {
                        startPage = 1;
                        endPage = totalPages;
                    } else {
                        const half = Math.floor(maxVisiblePages / 2);
                        if (currentPage <= half + 1) {
                            startPage = 1;
                            endPage = maxVisiblePages;
                        } else if (currentPage >= totalPages - half) {
                            startPage = totalPages - maxVisiblePages + 1;
                            endPage = totalPages;
                        } else {
                            startPage = currentPage - half;
                            endPage = currentPage + half;
                        }
                    }

                    if (startPage > 1) {
                        pages.push(
                            <button
                                key={1}
                                className={`join-item btn btn-sm ${currentPage === 1 ? 'btn-active' : ''}`}
                                onClick={() => setCurrentPage(1)}
                            >
                                1
                            </button>
                        );
                        if (startPage > 2) {
                            pages.push(<span key="start-ellipsis" className="join-item btn btn-sm disabled">...</span>);
                        }
                    }

                    for (let i = startPage; i <= endPage; i++) {
                        pages.push(
                            <button
                                key={i}
                                className={`join-item btn btn-sm ${currentPage === i ? 'btn-active' : ''}`}
                                onClick={() => setCurrentPage(i)}
                            >
                                {i}
                            </button>
                        );
                    }

                    if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                            pages.push(<span key="end-ellipsis" className="join-item btn btn-sm disabled">...</span>);
                        }
                        pages.push(
                            <button
                                key={totalPages}
                                className={`join-item btn btn-sm ${currentPage === totalPages ? 'btn-active' : ''}`}
                                onClick={() => setCurrentPage(totalPages)}
                            >
                                {totalPages}
                            </button>
                        );
                    }

                    return pages;
                })()}

                {/* Next Button */}
                <button
                    className="join-item btn btn-sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    »
                </button>
            </div>

        </div>
    );
};

export default MyEnrolled;