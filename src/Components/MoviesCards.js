"use client";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import "../../style.css";

const MoviesCards = ({ title, movies}) => {
    
    return (
        <div className="py-4 md:py-6">
            <h2 className="text-xl md:text-2xl font-semibold py-4 text-white/90">{title} {movies && movies.length > 4 && <sup className="px-[6px] py-[1px] rounded-md bg-white/10 border border-white/20 text-[10px] tracking-wide text-white/70 text-nowrap rotate-90 ml-2">Scroll Horizontally</sup>}</h2>
            <div className="flex overflow-x-scroll hide-scrollbar relative pb-4">
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
