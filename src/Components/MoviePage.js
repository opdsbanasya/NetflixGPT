import React from 'react';
import { useLocation } from 'react-router-dom';
import useMovieDetails from '../hooks/useMovieDetails';
import { useSelector } from 'react-redux';

const MoviePage = () => {

    const { state } = useLocation() || {};
    useMovieDetails(state);

    const { movieDetails } = useSelector( store => store?.moviedetail)
    if(!movieDetails) return;
    console.log(movieDetails);
    const {title, original_language, 
        revenue, status, release_date, genres, overview, poster_path
    } = movieDetails;
    return (
        <div className='w-full bg-black text-white pt-20 '>
            <article className='w-11/12 min-h-[80vh] mx-auto px-10 py-5 flex items-start gap-8'>
                <div className='w-3/12 h-[60vh] bg-zinc-50'>
                    <img className='w-full' src={"https://image.tmdb.org/t/p/w220_and_h330_face" + poster_path} alt="Mufasa: The Lion King" />
                </div>
                <div className='w-7/12'>
                    <h2 className='text-4xl font-bold'>Mufasa: The Lion King</h2>
                    <div className='flex gap-5'>
                        <h5 className='bg-slate-700 px-2 py-[2px]'>lang: {original_language}</h5>
                        <h5 className='bg-slate-700 px-2 py-[2px]'>{revenue}</h5>
                        <h5 className='bg-slate-700 px-2 py-[2px]'>{status === "Released" ? release_date : "Upcoming"}</h5>
                    </div>
                    <div className='flex gap-5'>
                        {genres.map((item) => (
                            <h2 className='bg-slate-700 px-2 py-[2px]' key={item?.id}>#{item?.name}</h2>
                        ))}
                    </div>
                    <p className='text-lg text-justify mt-5'>{overview}</p>
                    <button>Play</button>
                </div>
            </article>
        </div>
    );
}
export default MoviePage;
