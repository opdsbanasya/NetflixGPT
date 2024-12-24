import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import "../../style.css";

const MoviesCards = ({ title, movies}) => {
    
    return (
        <div className="py-5">
            <h2 className="text-2xl font-bold py-5">{title} {movies && movies.length > 4 && <sup className="px-[6px] py-[1px] rounded-md bg-[#FF2929] text-xs tracking-wide text-white text-nowrap rotate-90">Scroll Horizontally</sup>}</h2>
            <div className="flex overflow-x-scroll scrollbar-hide relative">
                <div className="flex gap-8">
                    {movies && movies.length > 0 ? (
                        movies.map(elem => {
                            return <MovieCard key={elem.id} movie={elem}/>
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