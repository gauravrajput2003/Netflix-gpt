import { createSlice } from "@reduxjs/toolkit";

const Movieslice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovie: null,
    trailerVideo:null
  },
  reducers: {
    addPlayingMovie: (state, action) => {
      state.nowPlayingMovie = action.payload;
    },
    addTrailervideo:(state,action)=>{
      state.trailerVideo=action.payload;
    }
  },
});

export const { addPlayingMovie,addTrailervideo } = Movieslice.actions;
export default Movieslice.reducer;