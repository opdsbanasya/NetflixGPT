import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import movieDetailReducer from "./movieDetailSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
        gptsearch: gptReducer,
        moviedetail: movieDetailReducer
    }
});

export default appStore;