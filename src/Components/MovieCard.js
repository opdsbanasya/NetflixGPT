"use client";

import React, { useMemo } from 'react';
import { useRouter } from "next/navigation";

const MovieCard = ({ movie }) => {

    const router = useRouter();

    const handleClickMoviePage = (elem) => {
        window.scrollTo({ top: 0});
        router.push("/browse/movie-info?id=" + elem?.id);
    }

    if (!movie?.poster_path) return null;
    
    // Generate deterministic match percent based on movie ID to prevent flickering
    const matchPercent = useMemo(() => {
        if (!movie?.id) return 94;
        return 85 + (movie.id % 15);
    }, [movie?.id]);

    return (
        <div
            onClick={() => handleClickMoviePage(movie)}
            className="w-36 md:w-48 lg:w-56 flex-shrink-0 cursor-pointer group relative">
            <div className="w-full h-[216px] md:h-[288px] lg:h-[336px] overflow-hidden rounded-xl shadow-lg transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-netflix-primary/20 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border group-hover:border-netflix-primary/50">
                <img className="w-full h-full object-cover rounded-xl object-center"
                    src={"https://image.tmdb.org/t/p/w500/" + movie?.poster_path}
                    alt={movie?.original_title}
                />
                <div className="absolute top-3 left-3 bg-[#050505]/80 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-green-400 font-bold text-xs">{matchPercent}% Match</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
        </div>
    );
}

export default MovieCard;
