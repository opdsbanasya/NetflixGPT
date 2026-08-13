"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const GPTMovieSuggestion = () => {
    const { movieName, movieResult } = useSelector(store => store.gptsearch);
    const router = useRouter();

    if (!movieName) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-10 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 mb-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
                <h3 className="text-2xl font-sora mb-2">No recommendations yet</h3>
                <p className="text-netflix-muted max-w-sm">Chat with MovieGPT on the left to discover your next favorite movie.</p>
            </div>
        );
    }

    return (
        <div className='w-full p-6 md:p-10 space-y-8 pb-32'>
            <div className="mb-4">
                <h2 className="text-2xl font-bold font-sora">Top Recommendations</h2>
            </div>
            
            <div className="flex flex-col gap-6">
                {movieName.map((aiMovie, index) => {
                    const tmdbResults = movieResult[index]?.results;
                    if (!tmdbResults || tmdbResults.length === 0) return null;
                    
                    const movie = tmdbResults[0]; // Take the best match from TMDB
                    if (!movie?.poster_path) return null;

                    return (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={index} 
                            className="glass-card p-4 flex flex-col sm:flex-row gap-6 items-start group hover:bg-white/5 transition-colors"
                        >
                            <div 
                                onClick={() => router.push("/browse/movie-info?id=" + movie.id)}
                                className="w-32 md:w-40 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl shadow-lg"
                            >
                                <img 
                                    src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} 
                                    alt={movie.title} 
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between items-start">
                                    <h3 
                                        onClick={() => router.push("/browse/movie-info?id=" + movie.id)}
                                        className="text-xl md:text-2xl font-bold cursor-pointer hover:text-netflix-primary transition-colors"
                                    >
                                        {movie.title}
                                    </h3>
                                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500/20 whitespace-nowrap">
                                        {aiMovie.match} Match
                                    </span>
                                </div>
                                
                                <div className="text-netflix-muted text-sm flex gap-4">
                                    <span>⭐ {movie.vote_average?.toFixed(1)}/10</span>
                                    <span>{movie.release_date?.split('-')[0]}</span>
                                </div>
                                
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <h4 className="text-xs text-netflix-primary font-bold uppercase tracking-wider mb-1">Why you might like this</h4>
                                    <p className="text-white/90 text-sm italic">"{aiMovie.reason}"</p>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button 
                                        onClick={() => router.push("/browse/movie-info?id=" + movie.id)}
                                        className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Details
                                    </button>
                                    <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                                        + Watchlist
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

export default GPTMovieSuggestion;
