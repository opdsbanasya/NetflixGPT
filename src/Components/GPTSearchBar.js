import React from 'react';

const GPTSearchBar = () => {
    return (
        <div className='w-full'>
            <form className='w-[60%] mx-auto flex gap-5'>
                <input type='text' className='w-full mx-auto px-3 py-2 outline-none rounded-md text-black font-semibold text-lg' placeholder='What do you want to watch today?' />
                <input type='submit' className='text-white font-semibold text-xl bg-purple-600 px-4 py-2 rounded-md cursor-pointer' value="Search" />
            </form>
        </div>
    );
}

export default GPTSearchBar;
