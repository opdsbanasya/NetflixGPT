import React from 'react';
import { useLocation } from 'react-router-dom';
import useMovieDetails from '../hooks/useMovieDetails';
import { useSelector } from 'react-redux';

const MoviePage = () => {

    const { state } = useLocation() || {};
    useMovieDetails(state);

    const { movieDetails } = useSelector( store => store?.moviedetail)
    console.log(movieDetails);
    
    return (
        <div className='w-full bg-black text-white pt-20 '>
            <article className='w-11/12 mx-auto px-10 py-5 flex items-start gap-8'>
                <div className='w-3/12 h-[60vh] bg-zinc-50'>
                    <image src="https://image.tmdb.org/t/p/w220_and_h330_face/lurEK87kukWNaHd0zYnsi3yzJrs.jpg" alt="Mufasa: The Lion King" />
                </div>
                <div className='w-7/12'>
                    <h2 className='text-4xl font-bold'>Mufasa: The Lion King</h2>
                    <div className='flex gap-5'>
                        <h5>language: en</h5>
                        <h5>US</h5>
                        <h5>2024-12-18</h5>
                    </div>
                    <div >
                        <h5>Adventure</h5>
                        <h5>Animation</h5>
                        <h5>Drama</h5>
                    </div>
                    <p>Told in flashbacks, Mufasa is an orphaned cub, lost and alone until he meets a sympathetic lion named Taka—the heir to a royal bloodline. The chance meeting sets in motion a journey of misfits searching for their destiny and working together to evade a threatening and deadly foe.</p>
                    <button>Play</button>
                </div>
            </article>
        </div>
    );
}
export default MoviePage;
