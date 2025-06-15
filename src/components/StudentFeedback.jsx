import React from 'react';

const StudentFeedback = () => {
    return (
        <div className="bg-white py-10 px-4">
  <h2 className="text-2xl font-bold text-center mb-6">What Our Students Say</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <p className="italic text-gray-700">“This platform helped me get a job as a frontend developer. The instructors are top-notch!”</p>
      <div className="mt-4 flex items-center gap-3">
        <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/40?img=1" alt="Student 1" />
        <div>
          <h4 className="font-semibold">Rafiul Islam</h4>
          <p className="text-sm text-gray-500">Frontend Developer</p>
        </div>
      </div>
    </div>
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <p className="italic text-gray-700">“The courses are very clear and updated. Loved the interface and the flexibility.”</p>
      <div className="mt-4 flex items-center gap-3">
        <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/40?img=2" alt="Student 2" />
        <div>
          <h4 className="font-semibold">Mim Akter</h4>
          <p className="text-sm text-gray-500">UX Designer</p>
        </div>
      </div>
    </div>
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <p className="italic text-gray-700">“I enrolled in 3 backend courses and I feel confident enough to apply for backend roles.”</p>
      <div className="mt-4 flex items-center gap-3">
        <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/40?img=3" alt="Student 3" />
        <div>
          <h4 className="font-semibold">Jubayer Khan</h4>
          <p className="text-sm text-gray-500">Backend Developer</p>
        </div>
      </div>
    </div>
  </div>
</div>
    );
};

export default StudentFeedback;