import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useMovieDetails from '../hooks/useMovieDetails';
import { useSelector } from 'react-redux';
import MovieProductionsCompanies from './MovieProductionsCompanies';
import VideoBackground from './VideoBackground';
import Cast from './Casts';

const MoviePage = () => {
    const navigate = useNavigate();
    const { state } = useLocation() || {};
    useMovieDetails(state);

    const { movieDetails } = useSelector(store => store?.moviedetail)
    if (!movieDetails) return;

    const { id, title,
        revenue, status, release_date, genres, overview, poster_path, budget, homepage, production_companies, production_countries, spoken_languages, vote_average, tagline
    } = movieDetails;

    const handleBackButton = () => {
        navigate(-1);
        window.scrollTo({ top: 0 });
    }

    return (
        <div className='w-full bg-black text-white pt-20 '>
            <div className='w-full md:w-11/12 mx-auto px-10 py-5'>
                <button className='px-2 md:px-4 py-1 md:py-2 bg-purple-500 text-sm ms:text-lg font-semibold rounded-lg hover:bg-purple-400'
                    onClick={handleBackButton}
                    >Back
                </button>
            </div>
            <article className='w-full md:w-11/12 min-h-[80vh] mx-auto px-10 py-5 flex flex-col lg:flex-row items-start gap-20'>
                <div className='w-11/12 lg:w-3/12 mx-auto'>
                    <img className='w-full object-cover rounded-lg ' src={"https://image.tmdb.org/t/p/w220_and_h330_face" + poster_path} alt={title} />
                </div>
                <div className='w-full md:px-8 lg:px-0 lg:w-7/12 space-y-2 md:space-y-5 lg:space-y-7'>
                    <h2 className='text-3xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 text-[#ffffb6] title-shadow'>{title}</h2>
                    {/** Languages */}
                    <div className='flex text-lg flex-wrap gap-2 md:gap-5'>
                        <h4 className=' text-[#FF8000]'>Language </h4> :
                        {spoken_languages.map((item, index) => <span
                            className='text-[#79D7BE] bg-zinc-800 px-2 py-1 md:text-[16px] h-fit text-sm'
                            key={item?.english_name}>{item?.english_name}</span>)}
                    </div>

                    {/** Rating/status */}
                    <div className='flex gap-2 md:gap-10 flex-col md:flex-row'>
                        <h5 className='py-[2px] text-lg space-x-2 md:space-x-5'>
                            <span className='text-[#FF8000] mr-2 md:mr-5'>Rating</span>:
                            <span className='text-[#79D7BE] bg-zinc-800 px-2 py-1 md:text-[16px] h-fit text-sm'>{vote_average}/10</span>
                        </h5>
                        <h5 className='md:px-2 py-[2px] text-lg space-x-2 md:space-x-5'>
                            <span className='text-[#FF8000] mr-2 md:mr-5'>{status === "Released" ? "Released on " : "Upcoming"}</span>:
                            <span className='text-[#79D7BE] bg-zinc-800 px-2 py-1 md:text-[16px] h-fit text-sm'>{status === "Released" && release_date}</span>
                        </h5>
                    </div>

                    {/* Budget/ Revenue */}
                    <div className='flex gap-2 md:gap-10 flex-col md:flex-row'>
                        <h5 className='py-[2px] text-lg space-x-2 md:space-x-5'>
                            <span className='text-[#FF8000] mr-2 md:mr-5'>Budget</span>:
                            <span className='text-[#79D7BE] bg-zinc-800 px-2 py-1 md:text-[16px] h-fit text-sm'>{Math.floor(budget / 1000000)}+ M</span>
                        </h5>
                        <h5 className='py-[2px] text-lg space-x-2 md:space-x-5'>
                            <span className='text-[#FF8000] mr-2 md:mr-5'>Revenue</span>:
                            <span className='text-[#79D7BE] bg-zinc-800 px-2 py-1 md:text-[16px] h-fit text-sm'>
                                {Math.floor(revenue / 1000000)}+ M</span>
                        </h5>
                    </div>

                    {/** Genres */}
                    <div className='flex gap-3 md:gap-10 flex-wrap'>
                        {genres.map((item) => (
                            <h2 className='bg-[#E1FFBB] text-[#074799] font-bold px-2 py-[2px] text-lg cursor-pointer hover:text-[#175799] hover:bg-[#E1F1B1]' key={item?.id}># {item?.name}</h2>
                        ))}
                    </div>
                    {/** Tagline */}
                    {tagline && <div className='flex gap-10 py-5 md:py-0'>
                        <h5 className='py-[2px] text-lg space-x-5'>
                            <span className='text-[#FF8000] mr-5'>Tagline</span>:
                            <span className='text-[#79D7BE] bg-zinc-800 px-2 py-1 md:text-[16px] h-fit text-sm'>{tagline}</span>
                        </h5>
                    </div>}

                    {/** overview/play */}
                    <p className='text-justify mt-5'>{overview}</p>
                    <button className='px-2 md:px-4 py-1 md-py-2 bg-purple-500 text-lg md:text-xl font-semibold rounded-lg hover:bg-purple-400'>
                        <a href={homepage}>Play</a>
                    </button>
                </div>
            </article>
            {/* <MovieImageSlider movieId={id} /> */}
            <Cast movieId={id} />
            <MovieProductionsCompanies
                production_companies={production_companies}
                production_countries={production_countries} />
            <div className='w-full md:w-11/12 mx-auto px-5 md:px-10 py-5'>
                <h3 className='w-11/12 mx-auto text-2xl py-5 pt-10'>Trailer</h3>
                <VideoBackground movieId={id} isMoviePage={true} />
            </div>

        </div>
    );
}
export default MoviePage;
