import { createSlice } from "@reduxjs/toolkit";

const Movieslice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovie: null,
    topratedMovies: null,
    popularMovies: null,
    upcomingMovies: null,
    trailerVideo: null
  },
  reducers: {
    addPlayingMovie: (state, action) => {
      state.nowPlayingMovie = action.payload;
    },
    addTopratedMovies: (state, action) => {
      state.topratedMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailervideo: (state, action) => {
      state.trailerVideo = action.payload;
    }
  }
});

export const { addPlayingMovie, addTopratedMovies, addPopularMovies, addUpcomingMovies, addTrailervideo } = Movieslice.actions;
export default Movieslice.reducer;