import { createSlice } from "@reduxjs/toolkit";
const gptslice=createSlice({
    name:'gpt',
    initialState:{
        showGptsearch:false,
    },
    reducers:{
toggleGptSearchView:(state,action)=>{
    state.showGptsearch=!state.showGptsearch;
},
    }

});
export const {toggleGptSearchView}=gptslice.actions;
export default gptslice.reducer;