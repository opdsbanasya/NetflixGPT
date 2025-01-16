import { createSlice } from "@reduxjs/toolkit";

const trailerSlice = createSlice({
    name: "trailer",
    initialState: {
        sliderTrailer: null,
        movieTrailerVideo: null
    },
    reducers: {
        addTrailerVideo: (state, action) => {
            state.sliderTrailer = action.payload;
        },
        addMovieTrailerVideo: (state, action) => {
            state.movieTrailerVideo = action.payload;
        }
    }
})

export const { addTrailerVideo, addMovieTrailerVideo } = trailerSlice.actions;

export default trailerSlice.reducer;