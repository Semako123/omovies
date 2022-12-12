import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlicer";
import genreSlicer from "./genreSlicer";

const store = configureStore({
  reducer: {
    data: dataReducer,
    genre: genreSlicer,
  },
});

export default store;
