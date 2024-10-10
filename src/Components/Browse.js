
import { useSelector } from "react-redux";
import useMovies from "../hooks/useMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";

const Browse = () => {

    useMovies();

    const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies);
    console.log(nowPlayingMovies);
    

    return (
        <div>
            <Header />
            <MainContainer />
        </div>
    );
}

export default Browse;
