import { useSelector } from "react-redux";
import MovieCards from "./MoviesCards";

const MovieCategories = () => {
    const movie = useSelector(store => store.movie);

    return (
        <div className="px-20 py-5 bg-black text-white">
            <MovieCards title={"Now Playing Movies"} movies={movie?.nowPlayingMovies} />
            <MovieCards title={"Top Rated"} movies={movie?.topRatedMovies} />
            <MovieCards title={"Popular Movies"} movies={movie?.popularMovies} />
            <MovieCards title={"Upcoming Movies"} movies={movie?.upcomingMovies} />
        </div>
    );
}

export default MovieCategories;
