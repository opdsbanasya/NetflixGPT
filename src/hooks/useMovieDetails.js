import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant"
import { useDispatch } from "react-redux";
import { addMovieDetails } from "../store/movieDetailSlice";

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