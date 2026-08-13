"use client";
import { useDispatch } from "react-redux";
import { addMovieTrailerVideo, addTrailerVideo } from "../store/trailerSlice";
import { useEffect } from "react";
import { fetchFromTMDB } from "../utils/tmdb";

const useMovieTrailer = (movieId, isMoviePage) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getMovieVideo = async () => {
            dispatch(isMoviePage ? addMovieTrailerVideo(null) : addTrailerVideo(null)); // Clear stale state
            if (!movieId) return;
            
            try {
                const json = await fetchFromTMDB(`/movie/${movieId}/videos?language=en-US`);
                const trailerVideos = json?.results?.filter(movie => movie.type === "Trailer") || [];
                const trailer = trailerVideos.length > 0 ? trailerVideos[0] : (json?.results?.[0] || null);

                dispatch(isMoviePage ? addMovieTrailerVideo(trailer) : addTrailerVideo(trailer));
            } catch (error) {
                console.error("Failed to fetch Movie Trailer:", error);
            }
        }

        getMovieVideo();

        return () => {
            dispatch(isMoviePage ? addMovieTrailerVideo(null) : addTrailerVideo(null));
        }
    }, [movieId, isMoviePage, dispatch]);
}

export default useMovieTrailer;
