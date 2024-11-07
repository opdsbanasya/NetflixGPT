import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import "../../style.css";

const MoviesCards = ({ title, nowPlayingMovies }) => {
    return (
        <div className="py-5">
            <h2 className="text-2xl font-bold py-5">{title}</h2>
            <div className="flex overflow-x-scroll scrollbar-hide">
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