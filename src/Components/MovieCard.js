import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {

    const navigate = useNavigate();

    const handleClickMoviePage = (elem) => {
        window.scrollTo({ top: 0});
        navigate("/browse/movie-info",{ state: elem?.id});
    }

    if (!movie?.poster_path) return null;

    return (
        <div
            onClick={() => handleClickMoviePage(movie)}
            className="w-44 md:w-64 h-72 md:h-96 shadow-sm rounded-lg cursor-pointer overflow-hidden">
            <img className="w-full h-full object-cover rounded-lg object-center hover:scale-105 transition-all ease-in-out"
                src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + movie?.poster_path}
                alt={movie?.original_title}
            />
        </div>
    );
}

export default MovieCard;
