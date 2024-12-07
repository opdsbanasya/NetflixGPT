import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"gptsearch",
    initialState : {
        showGPTButton: false
    },
    reducers:{
        toggleGptSearch: (state, action) => {
            state.showGPTButton = !state.showGPTButton;
        }
    }
})

export const { toggleGptSearch } = gptSlice.actions;

export default gptSlice.reducer;