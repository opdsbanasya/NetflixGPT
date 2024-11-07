
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import MovieCategories from "./MovieCategories";

const Browse = () => {

    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

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
