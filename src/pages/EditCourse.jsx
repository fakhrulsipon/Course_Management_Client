import { FaEdit, FaBookOpen, FaLightbulb } from "react-icons/fa";
import axios from 'axios';
import React, { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const EditCourse = () => {

    useEffect(() => {
        document.title = 'Edit Course | EduPath';
    }, []);

    const course = useLoaderData()
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const editCourse = Object.fromEntries(formData.entries())
        // console.log(editCourse)

        axios.put(`http://localhost:3000/update-course/${course._id}`, editCourse)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Course updated successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                        timerProgressBar: true
                    });
                    navigate('/manage-course')
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


    return (
        <div className="min-h-screen pt-16 px-6">
            <h1 className="flex items-center justify-center text-3xl font-bold mb-6 text-gray-800 gap-2">
                <FaEdit className="text-blue-500" /> Edit Course
            </h1>
            <div className="lg:flex justify-center items-center gap-8 w-full max-w-6xl mx-auto">

                {/* Left Side - Static Text */}
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg flex flex-col justify-center h-fit">
                    <h3 className="flex items-center text-xl font-bold text-blue-800 mb-4 gap-2">
                        <FaBookOpen className="text-blue-600" /> Why Keep Your Courses Updated?
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        A well-maintained course ensures that students get the latest knowledge and resources.
                        Keeping your course details updated increases student engagement and trust.
                    </p>
                    <ul className="space-y-2 text-gray-800 font-medium">
                        <li className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                            <FaLightbulb className="text-yellow-500" /> Stay relevant with industry trends.
                        </li>
                        <li className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                            <FaLightbulb className="text-yellow-500" /> Attract more learners with updated info.
                        </li>
                        <li className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                            <FaLightbulb className="text-yellow-500" /> Improve the overall learning experience.
                        </li>
                    </ul>
                </div>

                {/* Right Side - Form */}
                <div className=" p-6 rounded-xl max-w-md w-full mx-auto">
                    <form onSubmit={handleUpdate} className="space-y-4">

                        {/* Course Title */}
                        <div>
                            <label className="block mb-1 text-gray-700 font-medium">Course Title</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={course.title}
                                className="w-full bg-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Short Description */}
                        <div>
                            <label className="block mb-1 text-gray-700 font-medium">Short Description</label>
                            <textarea
                                name="description"
                                defaultValue={course.description}
                                className="w-full bg-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                rows={6}
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block mb-1 text-gray-700 font-medium">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={course.image}
                                className="w-full bg-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block mb-1 text-gray-700 font-medium">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                defaultValue={course.duration}
                                className="w-full bg-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* price */}
                        <div>
                            <label className="block mb-1 text-gray-700 font-medium">Price</label>
                            <input
                                type="number"
                                name="price"
                                defaultValue={course.price}
                                className="w-full bg-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Available Seats */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Available Seats</label>
                            <input
                                type="number"
                                name="availableSeats"
                                min="1"
                                defaultValue={course.availableSeats}
                                className="w-full bg-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                        >
                            Update Course
                        </button>
                    </form>
                </div>

            </div>
            
        </div>



    );
};

export default EditCourse;