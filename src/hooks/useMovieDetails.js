"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovieDetails } from "../store/movieDetailSlice";
import { API_OPTIONS } from "../utils/tmdb";

const useMovieDetails = (movieId) => {

    const dispatch = useDispatch();

    const getMovieDetails = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '?language=en-US', API_OPTIONS)

        const json = await data.json();

        dispatch(addMovieDetails(json))

    }

    useEffect(() => {
        getMovieDetails()
    }, [])
}

export default useMovieDetails;
