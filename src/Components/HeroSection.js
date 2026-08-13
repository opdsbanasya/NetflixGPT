"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const MOODS = [
    { icon: "🔥", label: "Mind Blowing" },
    { icon: "😂", label: "Comedy" },
    { icon: "😱", label: "Horror" },
    { icon: "❤️", label: "Romance" },
    { icon: "🚀", label: "Sci-Fi" },
    { icon: "🎭", label: "Drama" },
    { icon: "👨‍👩‍👧", label: "Family" },
    { icon: "🌙", label: "Late Night" }
];

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/gpt-search?q=${encodeURIComponent(query)}`);
        }
    };

    const handleMoodClick = (moodLabel) => {
        const newQuery = `${moodLabel} movies`;
        setQuery(newQuery);
        router.push(`/gpt-search?q=${encodeURIComponent(newQuery)}`);
    }

    return (
        <section className="w-full min-h-[75vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center relative overflow-hidden bg-[#050505]">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-netflix-primary/20 blur-[120px] rounded-full pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="z-10 w-full max-w-3xl space-y-10"
            >
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-sora font-bold tracking-tight text-white drop-shadow-lg leading-tight">
                        What should we watch tonight?
                    </h1>
                    <p className="text-lg md:text-xl text-netflix-muted font-light max-w-2xl mx-auto">
                        Describe your mood, favorite movies, actors, genres, or anything.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="relative w-full group max-w-2xl mx-auto">
                    <input 
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g. A mind-bending thriller under 2 hours..."
                        className="w-full glass-input px-8 py-5 pr-32 rounded-2xl text-lg md:text-xl shadow-2xl focus:shadow-netflix-primary/20"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-netflix-primary hover:bg-netflix-secondary text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-netflix-primary/30">
                        Ask AI
                    </button>
                </form>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4 max-w-4xl mx-auto">
                    {MOODS.map((mood, idx) => (
                        <motion.button 
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleMoodClick(mood.label)}
                            className="glass-panel px-4 py-2 rounded-full text-sm md:text-base hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                            <span>{mood.icon}</span>
                            <span className="text-white/90">{mood.label}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
