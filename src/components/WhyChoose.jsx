import React from 'react';

const WhyChoose = () => {
    return (
       <div className="bg-gray-50 py-10 px-4">
  <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Expert" className="w-16 mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">Expert Instructors</h3>
      <p className="text-gray-600">Learn from industry professionals with real-world experience.</p>
    </div>
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
      <img src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png" alt="Flexible" className="w-16 mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">Flexible Learning</h3>
      <p className="text-gray-600">Study anytime, anywhere at your own pace with lifetime access.</p>
    </div>
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
      <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Certification" className="w-16 mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">Certification</h3>
      <p className="text-gray-600">Get certificates that enhance your resume and career.</p>
    </div>
  </div>
</div>
    );
};

export default WhyChoose;