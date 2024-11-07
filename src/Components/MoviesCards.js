import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const MoviesCards = ({ nowPlayingMovies }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold py-4">Now Playing Movies</h2>
            <div className="flex overflow-x-scroll">
                <div className="flex gap-8">
                    {nowPlayingMovies && nowPlayingMovies.length > 0 ? (
                        nowPlayingMovies.map(elem => {
                            return <MovieCard key={elem.id} movie={elem} />
                        })
                    ) : (
                        <p>No movies available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MoviesCards;