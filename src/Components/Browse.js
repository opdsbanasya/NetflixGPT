
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GPTSearch from "./GPTSearch";
import Header from "./Header";
import MainContainer from "./MainContainer";
import MovieCategories from "./MovieCategories";

const Browse = () => {

    const { showGPTButton } = useSelector(store => store.gptsearch);
    console.log(showGPTButton);

    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    // const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies);
    // console.log(nowPlayingMovies);


    return (
        <div className="relative">
            {showGPTButton ? 
            <section>
                <Header /> 
                <GPTSearch />
            </section> : 
            <section>
                <Header />
                <MainContainer />
                <MovieCategories />
            </section>}
        </div>
    );
}

export default Browse;
