"use client";
import React from 'react'
import useCast from '../hooks/useCast';
import { useSelector } from 'react-redux';

const Credits = ({ movieId }) => {

    useCast(movieId);

    const { movieCast } = useSelector(store => store?.moviedetail)
    console.log(movieCast);

    if (!movieCast) return;

    const { cast } = movieCast;

    return (
        <div className='w-full'>
            <div className='flex gap-4 md:gap-6 pb-4 overflow-x-auto hide-scrollbar snap-x'>
                {cast.map(person => {
                    return person?.profile_path && <div key={person?.id} className='w-32 md:w-40 flex-shrink-0 flex flex-col items-center group snap-start'>
                        <div className='w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 border border-white/10 group-hover:border-white/30'>
                            <img src={'https://image.tmdb.org/t/p/w220_and_h330_face' + person?.profile_path}
                                alt={person?.name}
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <h3 className='text-sm md:text-base text-center font-bold mt-4 text-white/90 leading-tight'>{person?.name}</h3>
                        <h4 className='text-xs md:text-sm text-netflix-primary text-center mt-1'>{person?.character}</h4>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Credits;
