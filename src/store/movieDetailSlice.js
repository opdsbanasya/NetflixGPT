import { createSlice } from "@reduxjs/toolkit";

const movieDetailSlice = createSlice({
    name: "movie-slice",
    initialState: {
        movieDetails: null
    },
    reducers: {
        addMovieDetails: (state, action) => {
            state.movieDetails = action.payload;
        }
    }
})

export const { addMovieDetails } = movieDetailSlice.actions;

export default movieDetailSlice.reducer;