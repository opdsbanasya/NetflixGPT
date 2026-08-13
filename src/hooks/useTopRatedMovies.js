"use client";
import { useDispatch } from "react-redux";
import { fetchFromTMDB } from "../utils/tmdb";
import { addTopRatedMovies } from "../store/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getTopRatedMovies = async () => {
            try {
                const json = await fetchFromTMDB('/movie/top_rated?page=1');
                if (json?.results) {
                    dispatch(addTopRatedMovies(json.results));
                }
            } catch (error) {
                console.error("Failed to fetch Top Rated movies:", error);
            }
        }
        getTopRatedMovies();
    }, [dispatch]);
}

export default useTopRatedMovies;
