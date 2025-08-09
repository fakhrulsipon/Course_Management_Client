import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className='flex items-center justify-center min-h-[60vh]'>
                <div className=" h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 animate-[spin_1s_linear_infinite] rounded-full border-4 border-sky-400 border-r-sky-900"></div>;
            </div>
        </div>
    );
};

export default Loading;