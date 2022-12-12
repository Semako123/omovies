import { createSlice } from "@reduxjs/toolkit";

const dataSlicer = createSlice({
  name: "data",
  initialState: {
    trendingM: [],
    trendingT: [],
    upcomingM: [],
    playingM: [],
    airingT: [],
    ratedM: [],
  },
  reducers: {
    updateTrendingM: (state, action) => {
      state.trendingM = action.payload;
    },

    updateTrendingT: (state, action) => {
      state.trendingT = action.payload;
    },

    updateUpcomingM: (state, action) => {
      state.upcomingM = action.payload;
    },
    updatePlayingM: (state, action) => {
      state.playingM = action.payload;
    },
    updateAiringT: (state, action) => {
      state.airingT = action.payload;
    },
    updateRatedM: (state, action) => {
      state.ratedM = action.payload;
    },
  },
});

export default dataSlicer.reducer;

export const dataActions = dataSlicer.actions;
