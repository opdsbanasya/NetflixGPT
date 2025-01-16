import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import movieDetailReducer from "./movieDetailSlice";
import trailerReducer from "./trailerSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
        gptsearch: gptReducer,
        moviedetail: movieDetailReducer,
        trailer: trailerReducer
    }
});

export default appStore;