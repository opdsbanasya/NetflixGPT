
const MovieCards = ({ movie }) => {
    console.log(movie);
    return (
        <div className="w-64 shadow-sm rounded-lg overflow-hidden">
            <img className="w-full object-cover object-center" src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + movie?.poster_path} alt={movie?.original_title
} />
        </div>
    );
}

export default MovieCards;
