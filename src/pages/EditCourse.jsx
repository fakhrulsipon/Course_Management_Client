import React from 'react';
import { useLoaderData } from 'react-router';

const EditCourse = () => {
    const editCourse = useLoaderData()
    console.log(editCourse)
    return (
        <div>
            <h1>this is edit course</h1>
        </div>
    );
};

export default EditCourse;