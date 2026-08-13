"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovieDetails } from "../store/movieDetailSlice";
import { fetchFromTMDB } from "../utils/tmdb";

const useMovieDetails = (movieId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getMovieDetails = async () => {
            dispatch(addMovieDetails(null)); // Clear stale state
            if (!movieId) return;
            try {
                const json = await fetchFromTMDB(`/movie/${movieId}?language=en-US`);
                dispatch(addMovieDetails(json));
            } catch (error) {
                console.error("Failed to fetch Movie Details:", error);
            }
        }

        getMovieDetails();
    }, [movieId, dispatch]);
}

export default useMovieDetails;
