import React from 'react';

const WhyChoose = () => {
  return (
    <div className="mt-8 md:mt-12 lg:mt-16 w-11/12 mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 dark:text-white">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">

        <div className="p-6 border border-blue-200 bg-white/80 dark:bg-white rounded-xl shadow-md transition-transform duration-300 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Expert"
            className="w-16 mx-auto mb-4 drop-shadow-md"
          />
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Expert Instructors</h3>
          <p className="text-gray-600">Learn from industry professionals with real-world experience.</p>
        </div>

        <div className="p-6 border border-blue-200 bg-white/80 dark:bg-white rounded-xl shadow-md transition-transform duration-300 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
            alt="Flexible"
            className="w-16 mx-auto mb-4 drop-shadow-md"
          />
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Flexible Learning</h3>
          <p className="text-gray-600">Study anytime, anywhere at your own pace with lifetime access.</p>
        </div>

        <div className="p-6 border border-blue-200 bg-white/80 dark:bg-white rounded-xl shadow-md transition-transform duration-300 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="Certification"
            className="w-16 mx-auto mb-4 drop-shadow-md"
          />
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Certification</h3>
          <p className="text-gray-600">Get certificates that enhance your resume and career.</p>
        </div>

      </div>
    </div>
  );
};

export default WhyChoose;