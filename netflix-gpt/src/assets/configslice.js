import { createSlice } from "@reduxjs/toolkit";
import lang from "./LangaugeConstant";

const configslice = createSlice({
    name: 'config',
    initialState: {
      lang: 'en', // ✅ Ensure default language exists in lang object
    },
    reducers: {
      changeLangauge: (state, action) => {
        if (lang[action.payload]) { // ✅ Prevent invalid keys
          state.lang = action.payload;
        }
      },
    },
  });
  
export const {changeLangauge}=configslice.actions;
export default configslice.reducer;