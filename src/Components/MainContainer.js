import { useSelector } from "react-redux";

const MainContainer = () => {

    const nowPlayingMovies = useSelector(store => store.movie?.nowPlayingMovies);
    if(!nowPlayingMovies) return;

    const mainMovie = nowPlayingMovies[0];
    console.log(mainMovie);
    
    return (
        <div>
            
        </div>
    );
}

export default MainContainer;
