import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./jobSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
  reducer: {
    jobs: jobSlice,
    filter: filterSlice,
  },
});

export default store;
