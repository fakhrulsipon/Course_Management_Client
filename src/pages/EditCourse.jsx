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
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
    
    {/* Left Side - Form */}
    <div className="p-6">
      <h2 className="flex items-center justify-center text-2xl font-bold mb-6 text-gray-800 gap-2">
        <FaEdit className="text-blue-500" /> Edit Course
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Course Title</label>
          <input
            type="text"
            name="title"
            defaultValue={course.title}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Short Description</label>
          <textarea
            name="description"
            defaultValue={course.description}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={course.image}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            defaultValue={course.duration}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Available Seats</label>
          <input
            type="number"
            name="availableSeats"
            min="1"
            defaultValue={course.availableSeats}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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

    {/* Right Side - Static Text */}
    <div className="bg-blue-100 p-8 rounded-lg border border-blue-200 flex flex-col justify-center">
      <h3 className="flex items-center text-2xl font-bold text-blue-700 mb-4 gap-2">
        <FaBookOpen className="text-blue-500" /> Why Keep Your Courses Updated?
      </h3>
      <p className="text-gray-700 mb-4 leading-relaxed">
        A well-maintained course ensures that students get the latest knowledge and resources. 
        Keeping your course details updated increases student engagement and trust.
      </p>
      <ul className="space-y-2 text-gray-700">
        <li className="flex items-center gap-2">
          <FaLightbulb className="text-yellow-500" /> Stay relevant with industry trends.
        </li>
        <li className="flex items-center gap-2">
          <FaLightbulb className="text-yellow-500" /> Attract more learners with updated info.
        </li>
        <li className="flex items-center gap-2">
          <FaLightbulb className="text-yellow-500" /> Improve the overall learning experience.
        </li>
      </ul>
    </div>

  </div>
</div>

    );
};

export default EditCourse;