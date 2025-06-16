
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
        console.log(editCourse)

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
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Course</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Course Title</label>
                    <input
                        type="text"
                        name='title'
                        defaultValue={course.title}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Short Description</label>
                    <textarea
                        name='description'
                        defaultValue={course.description}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={4}
                    />
                </div>
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Image URL</label>
                    <input
                        type="text"
                        name='image'
                        defaultValue={course.image}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Duration</label>
                    <input
                        type="text"
                        name='duration'
                        defaultValue={course.duration}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Update Course
                </button>
            </form>
        </div>
    );
};

export default EditCourse;