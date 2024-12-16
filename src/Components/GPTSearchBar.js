import React, { useRef } from 'react';
import { llamaModel } from '../utils/llama';

const GPTSearchBar = () => {

    const searchInput = useRef();

    const handleClickGPTSearch = async () => {
        console.log(searchInput.current.value);
        const query = "Act as a movie recommendation system and suggest some movies for the query: "+searchInput.current.value+". Only give me 5 movie name, comma seperated like example result given ahead. examples: sholay, gadar, spiderman, karan arjun, koi mil gya. Give me only names no other content.";
        llamaModel(query);
    }

    return (
        <div className='w-full'>
            <form className='w-[60%] mx-auto flex gap-5'
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    ref={searchInput}
                    type='text'
                    className='w-full mx-auto px-3 py-2 outline-none rounded-md text-black font-semibold text-lg' placeholder='What do you want to watch today?' />
                <input type='submit'
                    onClick={handleClickGPTSearch}
                    className='text-white font-semibold text-xl bg-purple-600 px-4 py-2 rounded-md cursor-pointer' value="Search" />
            </form>
        </div>
    );
}

export default GPTSearchBar;
