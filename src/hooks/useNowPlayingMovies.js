"use client";
import { useDispatch } from "react-redux";
import { fetchFromTMDB } from "../utils/tmdb";
import { addNowPlayingMovies } from "../store/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getNowPlayingMovies = async () => {
            try {
                const json = await fetchFromTMDB('/movie/now_playing?page=1');
                if (json?.results) {
                    dispatch(addNowPlayingMovies(json.results));
                }
            } catch (error) {
                console.error("Failed to fetch Now Playing movies:", error);
            }
        }
        getNowPlayingMovies();
    }, [dispatch]);
}

export default useNowPlayingMovies;
