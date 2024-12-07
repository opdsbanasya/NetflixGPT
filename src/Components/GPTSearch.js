import React from 'react';
import GPTSearchBar from './GPTSearchBar';
import GPTMovieSuggestion from './GPTMovieSuggestion';

const GPTSearch = () => {
    return (
        <div className='w-[55%] absolute top-5 -translate-x-1/2 left-1/2 text-white space-y-7'>
            <GPTSearchBar />
            <GPTMovieSuggestion />
        </div>
    );
}

export default GPTSearch;
