"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCasts } from "../store/movieDetailSlice";
import { fetchFromTMDB } from "../utils/tmdb";

const useCast = (movieId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCast = async () => {
            dispatch(addCasts(null)); // Clear stale state
            if (!movieId) return;
            try {
                const json = await fetchFromTMDB(`/movie/${movieId}/credits?language=en-US`);
                dispatch(addCasts(json));
            } catch (error) {
                console.error("Failed to fetch Cast:", error);
            }
        }

        getCast();

        return () => {
            dispatch(addCasts(null));
        }
    }, [movieId, dispatch]);
}

export default useCast;
