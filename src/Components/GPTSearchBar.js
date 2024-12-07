import React from 'react';

const GPTSearchBar = () => {
    return (
        <div className='w-full'>
            <form className='w-1/2 mx-auto'>
                <input type='text' className='w-full mx-auto px-3 py-2 outline-none rounded-md text-black font-semibold text-lg' placeholder='What do you want to watch today?' />
            </form>
        </div>
    );
}

export default GPTSearchBar;
