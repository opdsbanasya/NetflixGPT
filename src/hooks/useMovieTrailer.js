import { useDispatch } from "react-redux";
import { addMovieTrailerVideo, addTrailerVideo } from "../store/trailerSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";


const useMovieTrailer = (movieId, isMoviePage) => {
    const dispatch = useDispatch();

    const getMovieVideo = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US", API_OPTIONS)
        const json = await data.json()
        // console.log(json.results);

        const trailerVideos = json.results.filter(movie => movie.type === "Trailer");
        const trailer = trailerVideos.length > 0 ? trailerVideos[0] : json.results[0];
        // console.log(trailer);

        dispatch(isMoviePage ? addMovieTrailerVideo(trailer) : addTrailerVideo(trailer));

    }

    useEffect(() => {
        getMovieVideo();
    }, [])
}

export default useMovieTrailer;
