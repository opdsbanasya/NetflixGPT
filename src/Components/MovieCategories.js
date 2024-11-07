import { useSelector } from "react-redux";
import MovieCards from "./MoviesCards";

const MovieCategories = () => {
    const movie = useSelector(store => store.movie);

    return (
        <div className="px-20 py-5 bg-black text-white">
            <MovieCards title={"Now Playing Movies"} nowPlayingMovies={movie?.nowPlayingMovies} />
            <MovieCards title={"Top Rated"} nowPlayingMovies={movie?.topRatedMovies} />
            <MovieCards title={"Popular Movies"} nowPlayingMovies={movie?.popularMovies} />
            <MovieCards title={"Upcoming Movies"} nowPlayingMovies={movie?.upcomingMovies} />
        </div>
    );
}

export default MovieCategories;
