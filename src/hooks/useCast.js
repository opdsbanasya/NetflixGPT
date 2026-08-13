"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCasts } from "../store/movieDetailSlice";
import { API_OPTIONS } from "../utils/tmdb";

const useCast = (movieId) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCast = async () => {
            dispatch(addCasts(null)); // Clear stale state
            if (!movieId) return;
            const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/credits?language=en-US', API_OPTIONS);
            const json = await data.json();
            dispatch(addCasts(json));
        }

        getCast();

        return () => {
            dispatch(addCasts(null));
        }
    }, [movieId, dispatch])
}

export default useCast;



