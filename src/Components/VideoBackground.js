import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {

    useMovieTrailer(movieId);

    const trailerVideo = useSelector(store => store.trailer?.sliderTrailer)


    return (
        <div className="w-screen h-screen overflow-hidden">
            <iframe
            className="w-full h-full scale-125"
            src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?autoplay=1&mute=1&cc_load_policy=3"}
            title="YouTube video player"
            allow="encrypted-media; gyroscope; web-share" 
            ></iframe>
        </div>
    );
}

export default VideoBackground;
// src={"https://www.youtube.com/embed/" + trailerVideo?.key}