"use client";
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { llamaModel } from '../utils/llama';
import { fetchFromTMDB } from "../utils/tmdb";
import { addGPTMovieResult } from '../store/gptSlice';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
    "🎬 Nolan Movies",
    "😱 Horror Night",
    "😂 Comedy Weekend",
    "🍿 Family Movies",
    "🧠 Mind Bending"
];

const GPTSearchBar = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const searchInput = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', text: 'Hi! I am MovieGPT. Describe what you want to watch or pick a suggestion below.' }
    ]);

    const tmdbSearchData = async (movie) => {
        try {
            const json = await fetchFromTMDB("/search/movie?query=" + encodeURIComponent(movie) + "&include_adult=false&language=en-US&page=1");
            return json;
        } catch (error) {
            console.error("Failed to fetch search results from TMDB:", error);
            return null;
        }
    }

    const handleClickGPTSearch = useCallback(async (overrideQuery = null) => {
        const userQuery = overrideQuery || searchInput.current?.value;
        if (!userQuery) return;

        setChatHistory(prev => [...prev, { role: 'user', text: userQuery }]);
        setIsLoading(true);
        if (searchInput.current) searchInput.current.value = "";

        const prompt = `Act as a movie recommendation system and suggest some movies for the query: "${userQuery}". Give me exactly 5 movie names related to the query. Return the result strictly as a valid JSON array of objects, where each object has three keys: "title" (string, the exact movie name), "match" (string, a percentage like "95%"), and "reason" (string, a short one-sentence explanation of why it matches). For example: [{"title": "Sholay", "match": "98%", "reason": "Because it's a classic action movie."}]. Do not include any other text, explanation, or markdown formatting.`;
        
        try {
            const llamaResult = await llamaModel(prompt);
            let movieObjects = [];
            
            // Greedy match to capture the entire JSON array, ignoring any prepended text
            const match = llamaResult.match(/\[[\s\S]*\]/);
            if (!match) throw new Error("No JSON array found in response");
            
            movieObjects = JSON.parse(match[0]);
            
            const tmdbMovies = movieObjects.map(obj => tmdbSearchData(obj.title));
            const searchedMovies = await Promise.all(tmdbMovies);

            dispatch(addGPTMovieResult({ movieObjects: movieObjects, movieResult: searchedMovies }));
            setChatHistory(prev => [...prev, { role: 'ai', text: 'Here are my top recommendations for you!' }]);

        } catch (error) {
            console.error("Failed to fetch/parse JSON:", error);
            setChatHistory(prev => [...prev, { role: 'ai', text: 'Sorry, I had trouble finding recommendations for that. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        const query = searchParams.get('q');
        if (query && searchInput.current) {
            searchInput.current.value = query;
            handleClickGPTSearch(query);
        }
    }, [searchParams, handleClickGPTSearch]);

    return (
        <div className='w-full h-full flex flex-col p-6'>
            <div className="mb-6">
                <h2 className="text-3xl font-sora font-bold text-white mb-2">MovieGPT</h2>
                <p className="text-netflix-muted">Ask anything about movies.</p>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto mb-6 space-y-6 hide-scrollbar">
                {chatHistory.map((msg, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                            msg.role === 'user' 
                                ? 'bg-netflix-primary text-white rounded-br-none' 
                                : 'bg-[#1a1a1a] text-white/90 rounded-bl-none border border-white/5'
                        }`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
                
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-[#1a1a1a] rounded-2xl rounded-bl-none px-5 py-4 border border-white/5 flex items-center gap-2">
                            <div className="w-2 h-2 bg-netflix-primary rounded-full animate-bounce" style={{animationDelay: "0ms"}} />
                            <div className="w-2 h-2 bg-netflix-primary rounded-full animate-bounce" style={{animationDelay: "150ms"}} />
                            <div className="w-2 h-2 bg-netflix-primary rounded-full animate-bounce" style={{animationDelay: "300ms"}} />
                        </div>
                    </div>
                )}
            </div>

            {/* Suggestions & Input */}
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((sug, i) => (
                        <button 
                            key={i}
                            onClick={() => {
                                if (searchInput.current) searchInput.current.value = sug;
                            }}
                            className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-colors text-white/80 whitespace-nowrap"
                        >
                            {sug}
                        </button>
                    ))}
                </div>
                
                <form 
                    onSubmit={(e) => { e.preventDefault(); handleClickGPTSearch(); }}
                    className="relative w-full"
                >
                    <input
                        ref={searchInput}
                        type="text"
                        disabled={isLoading}
                        className="w-full glass-input px-5 py-4 rounded-xl pr-24"
                        placeholder="Type a message..."
                    />
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default GPTSearchBar;
