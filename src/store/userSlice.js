import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "Authentication",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload; // Since initial state is null, we can return the payload as the full state
        },
        removeUser: (state, action) => {
            return null;
        },
    }
})

export const { addUser, removeUser } = userSlice.actions; 

export default userSlice.reducer;