import { useSelector } from "react-redux";
import TitleOfMainMovie from "./TitleOfMainMovie";
import VideoBackground from "./VideoBackground";

const TrailerContainer = () => {

    const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies);
    if (!nowPlayingMovies) return;

    const movieIndex = Math.floor(Math.random() * 20);

    const mainMovie = nowPlayingMovies[movieIndex];
    if(!mainMovie) return;

    console.log(mainMovie);
    
    const { title, overview, id } = mainMovie;

    return (
        <div className="relative -z-10 overflow-x-hidden">
            <TitleOfMainMovie title={title} overview={overview} />
            <VideoBackground movieId={id} isMoviePage={false} />
        </div>
    );
}

export default TrailerContainer;
