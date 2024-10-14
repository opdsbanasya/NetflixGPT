
const MovieCards = ({ movie }) => {
    return (
        <div className="w-[18%] shadow-sm rounded-lg overflow-hidden">
            <img className="w-full  object-cover object-center" src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + movie?.poster_path} />
        </div>
    );
}

export default MovieCards;
