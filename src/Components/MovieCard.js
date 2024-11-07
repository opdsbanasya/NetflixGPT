
const MovieCards = ({ movie }) => {
    console.log(movie);
    return (
        <div className="w-64 h-96 shadow-sm rounded-lg cursor-pointer overflow-hidden">
            <img className="w-full h-full object-cover rounded-lg object-center hover:scale-105 transition-all ease-in-out" src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + movie?.poster_path} alt={movie?.original_title
            } />
        </div>
    );
}

export default MovieCards;
