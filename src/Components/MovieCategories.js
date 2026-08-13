"use client";
import { useSelector } from "react-redux";
import MovieCards from "./MoviesCards";

const MovieCategories = () => {
    const movie = useSelector(store => store.movie);

    return (
        <div className="px-5 md:px-20 py-10 bg-[#050505] text-white">
            <MovieCards title={"Trending AI Searches"} movies={movie?.nowPlayingMovies} />
            <MovieCards title={"Popular Tonight"} movies={movie?.popularMovies} />
            <MovieCards title={"Hidden Gems"} movies={movie?.topRatedMovies} />
            <MovieCards title={"Recently Recommended"} movies={movie?.upcomingMovies} />
        </div>
    );
}

export default MovieCategories;
