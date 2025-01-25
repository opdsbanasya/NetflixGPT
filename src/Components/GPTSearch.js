import React from 'react';
import GPTSearchBar from './GPTSearchBar';
import GPTMovieSuggestion from './GPTMovieSuggestion';
import { MAIN_BG_IMG } from '../utils/constant';

const GPTSearch = () => {
    return (
        <div className="w-full min-h-screen text-white space-y-7 px-5 md:px-10 py-10 pt-28 bg-[#111]">
            <GPTSearchBar />
            <GPTMovieSuggestion />
        </div>
    );
}

export default GPTSearch;
