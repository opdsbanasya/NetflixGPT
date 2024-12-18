import React, { useRef } from 'react';
import { llamaModel } from '../utils/llama';
import { API_OPTIONS } from "../utils/constant";

const GPTSearchBar = () => {

    const searchInput = useRef();

    const tmdbSearchData = async (movie) =>{
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" 
                        + movie +
                        "&include_adult=false&language=en-US&page=1",
                        API_OPTIONS
                    );
        const json = await data.json();

        return json;
    }

    const handleClickGPTSearch = async () => {
        const query = "Act as a movie recommendation system and suggest some movies for the query: "+searchInput.current.value+". Only give me 5 movie name, comma seperated like example result given ahead. examples: sholay, gadar, spiderman, karan arjun, koi mil gya. Give me only names no other content.";
        const llamaResult = await llamaModel(query);
        console.log(llamaResult);
        
        const movieArray = await llamaResult.split(",")
        const tmdbMovies = movieArray.map(movie => tmdbSearchData(movie));
        // Here it give array of Promises than need to resolve it.

        const searchedMovies = await Promise.all(tmdbMovies);

        console.log(searchedMovies);
    }

    return (
        <div className='w-full'>
            <form className='w-[60%] mx-auto flex gap-5 bg-[#FBF6E9] text-black pr-5 py-2 pl-3 rounded-md'
                onSubmit={(e) => e.preventDefault()}
            >
                <textarea
                    ref={searchInput}
                    type='text'
                    className='w-full h-20 mx-auto px-3 py-2 resize-none outline-none  bg-transparent font-semibold text-lg' placeholder='What do you want to watch today?' />
                <input type='submit'
                    onClick={handleClickGPTSearch}
                    className='text-white font-semibold text-xl h-fit my-auto bg-purple-600 px-4 py-2 rounded-md cursor-pointer' value="Search" />
            </form>
        </div>
    );
}

export default GPTSearchBar;
