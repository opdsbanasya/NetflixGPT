import React from 'react';
import { useSelector } from 'react-redux';
import MoviesCards from './MoviesCards';

const GPTMovieSuggestion = () => {

    const { movieName, movieResult } = useSelector(store => store.gptsearch);

    if (!movieName) return null;

    return (
        <div className='w-full p-5 space-y-5'>
            {movieName.map((movie, index) => {
                return <MoviesCards key={movie} title={movie} movies={movieResult[index]?.results} />
            })}
        </div>
    );
}

export default GPTMovieSuggestion;
