import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
    currentUser : savedUser,
    loading:false,
    error:null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        accountStart : (state) => {
            state.loading = true,
            state.error = null
        },
        accountSuccess : (state, action) => {
            state.loading = false,
            state.currentUser = action.payload
        },
        accountFailure : (state, action) => {
            state.loading = false,
            state.error = action.payload.message
        },
        logout : (state) => {
            state.currentUser = null,
            state.loading = false,
            state.error = null,
            localStorage.removeItem("user"),
            localStorage.removeItem("token")
        }
    }
})

export const {accountStart, accountSuccess, accountFailure, logout} = userSlice.actions

export default userSlice.reducer;
