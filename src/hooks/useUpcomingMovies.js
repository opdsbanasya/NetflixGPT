"use client";
import { useDispatch } from "react-redux";
import { fetchFromTMDB } from "../utils/tmdb";
import { addUpcomingMovies } from "../store/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getUpcomingMovies = async () => {
            try {
                const json = await fetchFromTMDB('/movie/upcoming?page=1');
                if (json?.results) {
                    dispatch(addUpcomingMovies(json.results));
                }
            } catch (error) {
                console.error("Failed to fetch Upcoming movies:", error);
            }
        }
        getUpcomingMovies();
    }, [dispatch]);
}

export default useUpcomingMovies;
