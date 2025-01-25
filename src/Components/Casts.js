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
        <div className='w-full md:w-11/12 min-h-[40vh] mx-auto px-6 md:px-14 py-5'>
            <h3 className='w-11/12 mx-auto text-2xl py-3 md:py-5'>Cast</h3>
            <div className='w-full md:w-11/12 mx-auto h-full flex gap-5 md:gap-10 py-2 md:py-5 overflow-x-scroll scrollbar-hide md:px-auto'>
                {cast.map(person => {
                    return person?.profile_path && <div key={person?.id} className='w-4/12 flex flex-col items-center '>
                        <div className='w-24 md:w-36 rounded-full overflow-hidden cursor-pointer hover:scale-105'>
                            <img src={'https://image.tmdb.org/t/p/w220_and_h330_face' + person?.profile_path}
                                alt={person?.name}
                                className='aspect-square object-cover'
                            />
                        </div>
                        <h3 className='text-sm md:text-lg text-center font-semibold mt-4'>{person?.character}</h3>
                        <h4 className='text-xs md:text-sm'>{person?.name}</h4>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Credits;
