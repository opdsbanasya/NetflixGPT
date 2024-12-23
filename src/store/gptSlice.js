import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gptsearch",
    initialState: {
        showGPTButton: false,
        movieName: null,
        movieResult: null
    },
    reducers: {
        toggleGptSearch: (state, action) => {
            state.showGPTButton = !state.showGPTButton;
        },
        // there can be add multiple data in store by same reducer
        addGPTMovieResult: (state, action) => {
            const { movieName, movieResult } = action.payload;
            state.movieName = movieName;
            state.movieResult = movieResult;
        }
    }
})

export const { toggleGptSearch, addGPTMovieResult } = gptSlice.actions;

export default gptSlice.reducer;