import { createSlice } from "@reduxjs/toolkit";

const movieDetailSlice = createSlice({
    name: "movie-slice",
    initialState: {
        movieDetails: null,
        movieCast: null
    },
    reducers: {
        addMovieDetails: (state, action) => {
            state.movieDetails = action.payload;
        },
        addCasts: (state, action) => {
            state.movieCast = action.payload;
        }
    }
})

export const { addMovieDetails, addCasts } = movieDetailSlice.actions;

export default movieDetailSlice.reducer;