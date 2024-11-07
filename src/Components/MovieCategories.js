import { useSelector } from "react-redux";
import MovieCards from "./MoviesCards";

const MovieCategories = () => {
    const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies);
    console.log(nowPlayingMovies);

    return (
        <div className="px-20 py-5 bg-black text-white">
            <MovieCards nowPlayingMovies={nowPlayingMovies} />
        </div>
    );
}

export default MovieCategories;
