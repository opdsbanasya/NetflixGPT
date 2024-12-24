
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Browse = () => {

    
    
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    // const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies);
    // console.log(nowPlayingMovies);


    return (
        <div className="relative">
            <Header /> 
            <Outlet />
        </div>
    );
}

export default Browse;
