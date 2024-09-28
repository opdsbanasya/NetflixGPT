
import useMovies from "../hooks/useMovies";
import Header from "./Header";

const Browse = () => {

    useMovies();

    return (
        <div>
            <Header />
        </div>
    );
}

export default Browse;
