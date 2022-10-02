import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "Post",
  initialState: {
    postList: [],
  },
  reducers: {
    setPostList(state, action) {
      state.postList = action.payload.postList;
    },
  },
});
