import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    FetchStart: (state) => {
      state.loading = true;
    },
    FetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    FetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    likes:(state,action)=>{
      if(!state.currentVideo.likes.includes(action.payload)){
        state.currentVideo.likes.push(action.payload)
        state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex(userId=>userId===action.payload),1)
      }
    },
    dislikes:(state,action)=>{
      if(!state.currentVideo.dislikes.includes(action.payload)){
        state.currentVideo.dislikes.push(action.payload)
        state.currentVideo.likes.splice(state.currentVideo.likes.findIndex(userId=>userId===action.payload),1)
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { LoginStart, FetchSuccess, LoginFailure,likes,dislikes} =
  videoSlice.actions;

export default videoSlice.reducer;
