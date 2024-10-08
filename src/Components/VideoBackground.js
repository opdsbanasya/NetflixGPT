import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {

    useTrailerVideo(movieId);

    const trailerVideo = useSelector(store => store.movie?.trailerVideo)


    return (
        <div>
            <iframe 
            width="560" 
            height="315" 
            src={"https://www.youtube.com/embed/" + trailerVideo?.key}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            ></iframe>
        </div>
    );
}

export default VideoBackground;
