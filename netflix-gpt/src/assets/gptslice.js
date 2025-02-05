import { createSlice } from "@reduxjs/toolkit";
const gptslice=createSlice({
    name:'gpt',
    initialState:{
        showGptsearch:false,
        MoviesRes:null,
        tmdbMovies:null
    },
    reducers:{
toggleGptSearchView:(state,action)=>{
    state.showGptsearch=!state.showGptsearch;
},
addGptmovies:(state,action)=>{
    const{tmdbMovies,MoviesRes}=action.payload;
    state.MoviesRes=MoviesRes;
    state.tmdbMovies=tmdbMovies;
}
    },
  

});
export const {toggleGptSearchView,addGptmovies}=gptslice.actions;
export default gptslice.reducer;