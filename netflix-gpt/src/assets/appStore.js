import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./Movieslice";
 import gptReducer from "./gptslice";
 import configReducer from "./configslice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
     gpt:gptReducer,
     config:configReducer,
  },
});

export default appStore;