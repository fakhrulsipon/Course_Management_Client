import React, { useEffect, useState } from "react";
import axios from "axios";

function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:3000/popular-courses")
      .then(response => {
        setCourses(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error.message)
      });
  }, []);

  if(loading){
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-bars loading-xl text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Popular Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-700 mb-1">
                <strong>Enrollments:</strong> {course.enrollCount}
              </p>
              <p className="text-gray-600">{course.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularCourses;