import { useSelector } from "react-redux";
import TitleOfMainMovie from "./TitleOfMainMovie";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {

    const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies);
    if (!nowPlayingMovies) return;

    const movieIndex = Math.floor(Math.random() * 20);

    const mainMovie = nowPlayingMovies[movieIndex];
    if(!mainMovie) return;
    console.log(mainMovie);

    const { original_title, overview, id } = mainMovie;

    return (
        <div className="relative -z-10 overflow-x-hidden">
            <TitleOfMainMovie title={original_title} overview={overview} />
            <VideoBackground movieId={id} />
        </div>
    );
}

export default MainContainer;
