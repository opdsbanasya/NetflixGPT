import React from 'react';
import { useLocation } from 'react-router-dom';
import useMovieDetails from '../hooks/useMovieDetails';
import { useSelector } from 'react-redux';

const MoviePage = () => {

    const { state } = useLocation() || {};
    useMovieDetails(state);

    const { movieDetails } = useSelector(store => store?.moviedetail)
    if (!movieDetails) return;
    console.log(movieDetails);
    const { title, original_language,
        revenue, status, release_date, genres, overview, poster_path, budget, homepage, production_companies, production_countries, spoken_languages, vote_average
    } = movieDetails;

    return (
        <div className='w-full bg-black text-white pt-20 '>
            <article className='w-11/12 min-h-[80vh] mx-auto px-10 py-5 flex items-start gap-20'>
                <div className='w-3/12 h-[60vh] bg-zinc-50'>
                    <img className='w-full' src={"https://image.tmdb.org/t/p/w220_and_h330_face" + poster_path} alt={title} />
                </div>
                <div className='w-7/12 space-y-7'>
                    <h2 className='text-6xl font-bold font-serif mb-8 text-[#ffffb6] title-shadow'>{title}</h2>
                    {/** Languages */}
                    <div className='flex text-lg space-x-5'>
                        <span className=' text-[#FF8000] mr-5'>Language </span> :
                        {spoken_languages.map((item, index) => <span
                            className='text-[#79D7BE] bg-zinc-800 px-2 text-[16px] h-fit'
                            key={item?.english_name}>{item?.english_name}</span>)}
                    </div>

                    {/** Rating/status */}
                    <div className='flex gap-10'>
                        <h5 className='py-[2px] text-lg space-x-5'>
                            <span className='text-[#FF8000] mr-5'>Rating</span>:
                            <span className='text-[#79D7BE] bg-zinc-800 px-2 text-lg'>{vote_average}/10</span>
                        </h5>
                        <h5 className='px-2 py-[2px] text-lg space-x-5'>
                            <span className='text-[#FF8000] mr-5'>{status === "Released" ? "Released on " : "Upcoming"}</span>:
                            <span className='text-[#79D7BE] bg-zinc-800 px-2 text-lg'>{status === "Released" && release_date}</span>
                        </h5>
                    </div>

                    {/* Budget/ Revenue */}
                    <div className='flex gap-10'>
                        <h5 className='py-[2px] text-lg space-x-5'>
                            <span className='text-[#FF8000] mr-5'>Budget</span>:
                            <span className='text-[#79D7BE] bg-zinc-800 px-2 text-lg'>{Math.floor(budget/1000000)}+ M</span>
                        </h5>
                        <h5 className='px-2 py-[2px] text-lg space-x-5'>
                            <span className='text-[#FF8000] mr-5'>Revenue</span>:
                            <span className='text-[#79D7BE] bg-zinc-800 px-2 text-lg'>{Math.floor(revenue/1000000)}+ M</span>
                        </h5>
                    </div>

                    {/** Genres */}
                    <div className='flex gap-5'>
                        {genres.map((item) => (
                            <h2 className='bg-[#E1FFBB] text-[#074799] font-bold px-2 py-[2px] text-lg cursor-pointer hover:text-[#175799] hover:bg-[#E1F1B1]' key={item?.id}># {item?.name}</h2>
                        ))}
                    </div>

                    {/** overview/play */}
                    <p className='text-justify mt-5'>{overview}</p>
                    <button className='px-4 py-2 bg-purple-500 text-xl font-semibold rounded-lg hover:bg-purple-400'>
                        <a href={homepage}>Play</a>
                    </button>
                </div>
            </article>
        </div>
    );
}
export default MoviePage;
