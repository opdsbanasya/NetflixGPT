import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId, isMoviePage }) => {

    useMovieTrailer(movieId, isMoviePage);

    const trailerVideo = useSelector(store => isMoviePage ? store.trailer?.movieTrailerVideo : store.trailer?.sliderTrailer)
    return (
        <div className={`${isMoviePage ? "w-full h-full":"w-screen h-screen"}  overflow-hidden`}>
            <iframe
            className={`w-full h-full scale-125 ${isMoviePage && "aspect-video object-cover scale-90"}`}
            src={isMoviePage ? "https://www.youtube.com/embed/" + trailerVideo?.key : 
                "https://www.youtube.com/embed/" + trailerVideo?.key + "?autoplay=1&mute=1&cc_load_policy=3"
            }
            title="YouTube video player"
            allow="encrypted-media; gyroscope; web-share" 
            ></iframe>
        </div>
    );
}

export default VideoBackground;
// src={"https://www.youtube.com/embed/" + trailerVideo?.key}