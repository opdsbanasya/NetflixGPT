import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant"
import { useDispatch } from "react-redux";
import { addCasts } from "../store/movieDetailSlice";

const useCast = (movieId) => {

    const dispatch = useDispatch();

    const getCast = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/credits?language=en-US', API_OPTIONS);
        const json = await data.json();

        dispatch(addCasts(json ));
    }

    useEffect(() => {
        getCast();
    }, [])
}

export default useCast;



