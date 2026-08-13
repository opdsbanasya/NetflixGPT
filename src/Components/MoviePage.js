"use client";

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useMovieDetails from '../hooks/useMovieDetails';
import { useSelector } from 'react-redux';
import MovieProductionsCompanies from './MovieProductionsCompanies';
import VideoBackground from './VideoBackground';
import Cast from './Casts';
import { motion } from 'framer-motion';

const MoviePageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const state = searchParams.get('id');
    useMovieDetails(state);

    const { movieDetails } = useSelector(store => store?.moviedetail)
    if (!movieDetails || String(movieDetails.id) !== state) {
        return (
            <div className="w-full h-screen bg-[#050505] flex justify-center items-center">
                <div className="animate-pulse-slow text-white/50 text-xl font-light tracking-widest font-sora">Loading Details...</div>
            </div>
        );
    }

    const { 
        id, title, revenue, status, release_date, genres, overview, backdrop_path, poster_path, budget, homepage, 
        production_companies, production_countries, spoken_languages, vote_average, tagline 
    } = movieDetails;

    const handleBackButton = () => {
        router.back();
    }

    // Generate some fake AI insights based on genres
    const fakeInsights = genres ? genres.map(g => `Features strong elements of ${g.name.toLowerCase()}`) : ["Complex storytelling", "Highly rated by users"];

    return (
        <div className='w-full min-h-screen bg-[#050505] text-white overflow-x-hidden'>
            {/* Cinematic Hero Section */}
            <div className="relative w-full h-[60vh] md:h-[75vh]">
                <div className="absolute inset-0">
                    <img 
                        src={`https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`} 
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
                </div>

                <div className="absolute top-10 left-10 z-50">
                    <button 
                        className="glass-panel px-4 py-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-medium"
                        onClick={handleBackButton}
                    >
                        ← Back
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-24 z-10 flex flex-col md:flex-row gap-10 items-end">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 space-y-4"
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold drop-shadow-xl text-white tracking-tight leading-tight">
                            {title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-4 text-white/80 font-medium text-sm md:text-base">
                            <span className="flex items-center gap-1 text-yellow-400">⭐ {vote_average?.toFixed(1)}</span>
                            <span>•</span>
                            <span>{release_date?.split('-')[0]}</span>
                            <span>•</span>
                            <div className="flex gap-2">
                                {genres?.slice(0, 3).map(g => (
                                    <span key={g.id} className="bg-white/10 px-3 py-1 rounded-full text-xs">{g.name}</span>
                                ))}
                            </div>
                        </div>

                        {tagline && <p className="text-xl md:text-2xl font-light text-netflix-muted italic">"{tagline}"</p>}

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href={homepage} target="_blank" rel="noreferrer" className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-white/90 transition-colors shadow-lg hover:shadow-white/20">
                                ▶ Play Trailer
                            </a>
                            <button className="glass-panel px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
                                + Watchlist
                            </button>
                            <button className="bg-netflix-primary/20 text-netflix-primary border border-netflix-primary/50 px-8 py-3 rounded-xl font-medium hover:bg-netflix-primary/40 transition-colors flex items-center gap-2">
                                <span>✨</span> Ask AI About This
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-16">
                
                {/* Left Column (Story, Cast, Insights, Trailer) */}
                <div className="flex-1 space-y-16 overflow-hidden">
                    
                    <section className="space-y-4">
                        <h3 className="text-2xl font-sora font-bold">Story</h3>
                        <p className="text-lg text-white/70 leading-relaxed max-w-3xl">
                            {overview}
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h3 className="text-2xl font-sora font-bold">Cast</h3>
                        <div className="-mx-6 px-6">
                            <Cast movieId={id} />
                        </div>
                    </section>

                    <section className="glass-card p-8 rounded-2xl space-y-4 border border-netflix-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-netflix-primary/20 blur-[50px] -mr-10 -mt-10" />
                        <h3 className="text-xl font-sora font-bold text-netflix-primary flex items-center gap-2">
                            <span>✨</span> Why you might like this
                        </h3>
                        <ul className="space-y-3">
                            {fakeInsights.map((insight, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-white/80">
                                    <span className="text-netflix-primary mt-1">•</span>
                                    <span>{insight}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="space-y-6">
                        <h3 className="text-2xl font-sora font-bold">Trailer</h3>
                        <div className="rounded-2xl overflow-hidden glass-panel aspect-video">
                            <VideoBackground movieId={id} isMoviePage={true} />
                        </div>
                    </section>

                    <section>
                        <MovieProductionsCompanies
                            production_companies={production_companies}
                            production_countries={production_countries} />
                    </section>

                </div>

                {/* Right Column (Sticky Stats) */}
                <div className="lg:w-80 flex-shrink-0">
                    <div className="sticky top-32 glass-panel p-8 rounded-2xl space-y-8">
                        <div>
                            <h4 className="text-white/50 text-sm uppercase tracking-wider mb-2 font-semibold">Status</h4>
                            <p className="text-lg font-medium">{status}</p>
                        </div>
                        <div>
                            <h4 className="text-white/50 text-sm uppercase tracking-wider mb-2 font-semibold">Language</h4>
                            <p className="text-lg font-medium">
                                {spoken_languages?.map(l => l.english_name).join(", ")}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white/50 text-sm uppercase tracking-wider mb-2 font-semibold">Budget</h4>
                            <p className="text-lg font-medium">
                                {budget > 0 ? `$${(budget / 1000000).toFixed(1)}M` : "Unknown"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white/50 text-sm uppercase tracking-wider mb-2 font-semibold">Revenue</h4>
                            <p className="text-lg font-medium text-green-400">
                                {revenue > 0 ? `$${(revenue / 1000000).toFixed(1)}M` : "Unknown"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

const MoviePage = () => {
    return (
        <Suspense fallback={<div className="w-full h-screen bg-[#050505]"></div>}>
            <MoviePageContent />
        </Suspense>
    );
}

export default MoviePage;
