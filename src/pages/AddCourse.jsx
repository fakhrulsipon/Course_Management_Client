import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FiBookOpen, FiFileText, FiImage, FiClock, FiUsers } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";


const AddCourse = () => {
    const navigate = useNavigate()
    const [userImage, setUserImage] = useState('');


    useEffect(() => {
        document.title = 'Add Course | EduPath';
    }, []);

    const { user } = use(AuthContext)
    const handleAddCourse = (e) => {
        e.preventDefault()
        const title = e.target.title.value;
        const description = e.target.description.value;
        const image = userImage;
        const duration = e.target.duration.value;
        const availableSeats = e.target.availableSeats.value;
        const price = e.target.price.value;
        // console.log(title, description, image, duration)

        const newCourse = {
            title,
            description,
            image,
            duration,
            availableSeats,
            price,
            instructorEmail: user?.email,
            instructorName: user?.displayName,
            createdAt: new Date().toISOString()

        }

        axios.post('http://localhost:3000/add-course', newCourse)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Course Added',
                        text: 'New course added successfully!',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    navigate('/courses')
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error || 'Failed to add course. Please try again.',
                    timer: 2000,
                    showConfirmButton: false
                });
            })
    }

    const handleImage = async (e) => {
        const image = e.target.files[0];

        const formData = new FormData();
        formData.append('image', image)

        const imgUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(imgUrl, formData)
        setUserImage(res.data.data.url)

    }

    return (

<div className="min-h-screen pt-10 px-4 sm:px-8 lg:px-16 xl:px-24">
    <h2 className="text-3xl font-bold text-center text-blue-400">Add New Course</h2>
  <div className="flex justify-center items-center gap-10 w-full">
    
    {/* Form Section */}
    <div className="max-w-lg w-full md:pt-8">
     
      <form onSubmit={handleAddCourse} className="space-y-5">
        {/* Course Title */}
        <div>
          <label className="block text-md font-semibold mb-1 flex items-center gap-2 text-blue-900">
            <FiBookOpen className="text-xl" /> Course Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full bg-white border border-blue-400 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition placeholder:text-blue-700 text-blue-900 text-sm"
            placeholder="Enter course title"
            required
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-md font-semibold mb-1 flex items-center gap-2 text-blue-900">
            <FiFileText className="text-xl" /> Short Description
          </label>
          <textarea
            name="description"
            rows="3"
            className="w-full border border-blue-400 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition resize-none bg-white placeholder:text-blue-700 text-blue-900 text-sm"
            placeholder="Enter short description"
            required
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-md font-semibold mb-1 flex items-center gap-2 text-blue-900">
            <FiImage className="text-xl" /> Image URL
          </label>
          <input
            type="file"
            onChange={handleImage}
            className="w-full border border-blue-400 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition bg-white placeholder:text-blue-700 text-blue-900 text-sm"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-md font-semibold mb-1 flex items-center gap-2 text-blue-900">
            <FiClock className="text-xl" /> Duration (e.g., 4 Month)
          </label>
          <input
            type="text"
            name="duration"
            className="w-full border border-blue-400 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition bg-white placeholder:text-blue-700 text-blue-900 text-sm"
            placeholder="Enter course duration"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-md font-semibold mb-1 flex items-center gap-2 text-blue-900">
            <FaMoneyBillWave className="text-xl" /> Price (tk)
          </label>
          <input
            type="number"
            name="price"
            className="w-full border border-blue-400 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition bg-white placeholder:text-blue-700 text-blue-900 text-sm"
            placeholder="Enter Price Course"
            required
          />
        </div>

        {/* Available Seats */}
        <div>
          <label className="block text-md font-semibold mb-1 flex items-center gap-2 text-blue-900">
            <FiUsers className="text-xl" /> Available Seats
          </label>
          <input
            type="number"
            name="availableSeats"
            min="1"
            required
            className="w-full border border-blue-400 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition bg-white placeholder:text-blue-700 text-blue-900 text-sm"
          />
        </div>

        {/* Submit button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-750 text-white px-6 py-2 rounded-md shadow-md font-semibold transition-transform duration-300 hover:scale-105"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>

    {/* Static Text Section */}
    <div className="hidden lg:block lg:w-1/3 max-w-sm bg-blue-50 bg-opacity-50 rounded-lg p-6 shadow-md text-blue-900">
      <h3 className="text-xl font-semibold mb-4">Why Add Courses?</h3>
      <p className="mb-3 leading-relaxed">
        Adding new courses helps learners enhance their skills and knowledge. 
        Make sure to provide accurate and detailed information so that students get the best experience.
      </p>
      <p className="mb-3 leading-relaxed">
        Our Course Management System supports:
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>Easy course creation</li>
          <li>Managing course duration and seats</li>
          <li>Tracking enrolled students</li>
          <li>Organized learning paths</li>
        </ul>
      </p>
      <p className="font-semibold mt-4">
        Let's build a strong learning community together!
      </p>
    </div>
  </div>
</div>




    );
};

export default AddCourse;