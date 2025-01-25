
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Browse = () => {

    
    
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    // const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies);
    // console.log(nowPlayingMovies);


    return (
        <div className="relative overflow-x-hidden">
            <Header /> 
            <Outlet />
            <Footer />
        </div>
    );
}

export default Browse;
