import { createSlice } from "@reduxjs/toolkit";

const userSlilce = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return null;
        }
    }
});

export const {addUser, removeUser} = userSlilce.actions;

export default userSlilce.reducer;