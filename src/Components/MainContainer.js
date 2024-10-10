import { useSelector } from "react-redux";
import TitleOfMainMovie from "./TitleOfMainMovie";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {

    const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies);
    if (!nowPlayingMovies) return;

    const mainMovie = nowPlayingMovies[3];
    if(!mainMovie) return;
    console.log(mainMovie);

    const { original_title, overview, id } = mainMovie;

    return (
        <div>
            <TitleOfMainMovie title={original_title} overview={overview} />
            <VideoBackground movieId={id} />
        </div>
    );
}

export default MainContainer;
