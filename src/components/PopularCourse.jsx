import React, { useEffect, useState } from "react";
import axios from "axios";

function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    axios.get("https://edupath-server.vercel.app/popular-courses")
      .then(response => {
        setCourses(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error.message)
        setLoading(false)
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
   <div className="w-11/12 mx-auto my-14 px-4">
  <h2 className="text-4xl font-bold text-center text-primary mb-2">Popular Courses</h2>
  <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
    Discover the most enrolled courses chosen by thousands of learners to upgrade their skills fast.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {courses.map(course => (
      <div
        key={course._id}
        className="bg-white border border-transparent hover:border-primary/30 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
      >
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-primary mb-2">{course.title}</h3>
          <p className="text-sm text-green-600 font-bold mb-1">
            🔥 Enrollments: {course.enrollCount}
          </p>
          <p className="text-gray-600">{course.description?.slice(0, 100)}...</p>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}

export default PopularCourses;