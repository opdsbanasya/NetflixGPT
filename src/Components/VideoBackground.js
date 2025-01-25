import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId, isMoviePage }) => {

    useMovieTrailer(movieId, isMoviePage);

    const trailerVideo = useSelector(store => isMoviePage ? store.trailer?.movieTrailerVideo : store.trailer?.sliderTrailer)
    return (
        <section className={`${isMoviePage ? "w-full h-full" : "w-full h-[55%] md:h-full pt-28 md:pt-48 lg:pt-0"} bg-black`}>
            <div className={`${isMoviePage ? "w-full h-full" : "w-full h-[55%] lg:h-full"}`}>
                <iframe
                    className={`w-full h-full ${isMoviePage ? "aspect-video object-cover scale-90": "scale-150 md:scale-[2.9] lg:scale-125"}`}
                    src={isMoviePage ? "https://www.youtube.com/embed/" + trailerVideo?.key :
                        "https://www.youtube.com/embed/" + trailerVideo?.key + "?autoplay=1&mute=1&disablekb=1&cc_load_policy=3"
                    }
                    title="YouTube video player"
                    allow="encrypted-media; gyroscope; web-share"
                ></iframe>
            </div>
        </section>
    );
}

export default VideoBackground;