import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../slices/users/usersSlices";
const store = configureStore({
  reducer: {
    users: useReducer
  },
});

export default store;
