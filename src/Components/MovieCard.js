import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {

    const navigate = useNavigate();

    const handleClickMoviePage = (elem) => {
        console.log(elem);
        navigate("movie-info");
    } 


    if(!movie?.poster_path) return null;
    
    return (
        <div 
        onClick={() => handleClickMoviePage(movie)}
        className="w-64 h-96 shadow-sm rounded-lg cursor-pointer overflow-hidden">
            <img className="w-full h-full object-cover rounded-lg object-center hover:scale-105 transition-all ease-in-out" 
                src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + movie?.poster_path} 
                alt={movie?.original_title}
            />
        </div>
    );
}

export default MovieCard;
