"use client";
import { useDispatch } from "react-redux";
import { fetchFromTMDB } from "../utils/tmdb";
import { addPopularMovies } from "../store/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getPopularMovies = async () => {
            try {
                const json = await fetchFromTMDB('/movie/popular?page=1');
                if (json?.results) {
                    dispatch(addPopularMovies(json.results));
                }
            } catch (error) {
                console.error("Failed to fetch Popular movies:", error);
            }
        }
        getPopularMovies();
    }, [dispatch]);
}

export default usePopularMovies;
