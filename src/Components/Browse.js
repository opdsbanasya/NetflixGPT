
import { useSelector } from "react-redux";
import useMovies from "../hooks/useMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import MovieCategories from "./MovieCategories";

const Browse = () => {

    useMovies();

    // const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies);
    // console.log(nowPlayingMovies);
    

    return (
        <div>
            <Header />
            <MainContainer />
            <MovieCategories />
        </div>
    );
}

export default Browse;
