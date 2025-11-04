import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slice/userSlice";
import postReducer from "./slice/postSlice"

const store = configureStore({
  reducer: {
    user: UserSlice,
    post: postReducer,
  },
});

export default store;
