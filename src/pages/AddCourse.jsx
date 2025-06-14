import React from "react";

const AddCourse = () => {
    const handleAddCourse = (e) => {
        e.preventDefault()
        const title = e.target.title.value;
        const description = e.target.description.value;
        const image = e.target.image.value;
        const duration = e.target.duration.value;
        console.log(title, description, image, duration)
    }
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Course</h2>

            <form onSubmit={handleAddCourse} className="space-y-4">
                {/* Course Title */}
                <div>
                    <label className="block font-medium mb-1">Course Title</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter course title"
                        required
                    />
                </div>

                {/* Short Description */}
                <div>
                    <label className="block font-medium mb-1">Short Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter short description"
                        required
                    ></textarea>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block font-medium mb-1">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                {/* Duration */}
                <div>
                    <label className="block font-medium mb-1">Duration (e.g., 4 Month)</label>
                    <input
                        type="text"
                        name="duration"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter course duration"
                        required
                    />
                </div>

                {/* Submit button (optional) */}
                <div className="text-center pt-4">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
                    >
                        Add Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCourse;