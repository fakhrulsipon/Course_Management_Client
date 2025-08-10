import React from 'react';

const StudentFeedback = () => {
  return (
    <div className="w-11/12 mx-auto px-4 mt-8 md:mt-12 lg:mt-16">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 dark:text-white">What Our Students Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="p-6 rounded-xl bg-white shadow-lg  transition duration-300 transform">
          <p className="italic text-gray-700 text-lg">
            “This platform helped me get a job as a frontend developer. The instructors are top-notch!”
          </p>
          <div className="mt-4 flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full border-2 border-blue-400"
              src="https://i.pravatar.cc/40?img=1"
              alt="Student 1"
            />
            <div>
              <h4 className="font-semibold text-gray-900">Rafiul Islam</h4>
              <p className="text-sm text-gray-500">Frontend Developer</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-xl bg-white shadow-lg l transition duration-300 transform">
          <p className="italic text-gray-700 text-lg">
            “The courses are very clear and updated. Loved the interface and the flexibility.”
          </p>
          <div className="mt-4 flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full border-2 border-blue-400"
              src="https://i.pravatar.cc/40?img=2"
              alt="Student 2"
            />
            <div>
              <h4 className="font-semibold text-gray-900">Mim Akter</h4>
              <p className="text-sm text-gray-500">UX Designer</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-xl bg-white shadow-lg transition duration-300 transform">
          <p className="italic text-gray-700 text-lg">
            “I enrolled in 3 backend courses and I feel confident enough to apply for backend roles.”
          </p>
          <div className="mt-4 flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full border-2 border-blue-400"
              src="https://i.pravatar.cc/40?img=3"
              alt="Student 3"
            />
            <div>
              <h4 className="font-semibold text-gray-900">Jubayer Khan</h4>
              <p className="text-sm text-gray-500">Backend Developer</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentFeedback;