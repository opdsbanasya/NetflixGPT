import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {

    useTrailerVideo(movieId);

    const trailerVideo = useSelector(store => store.movie?.trailerVideo)


    return (
        <div className="w-screen h-screen overflow-hidden">
            <iframe
            className="w-full h-full scale-125"
            src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?autoplay=1&mute=1"}
            title="YouTube video player"
            allow="encrypted-media; gyroscope; web-share" 
            ></iframe>
        </div>
    );
}

export default VideoBackground;
// src={"https://www.youtube.com/embed/" + trailerVideo?.key}