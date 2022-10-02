import { createSlice } from "@reduxjs/toolkit";

export const utilSlice = createSlice({
  name: "Utility",
  initialState: {
    success: null,
    errors: null,
    loading: false,
  },
  reducers: {
    setPostList(state, action) {
      state.postList = action.payload.postList;
    },
    sendRequest(state) {
      state.loading = true;
      state.errors = null;
      state.success = null;
    },
    finishRequest(state) {
      state.loading = false;
    },
    requestSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
    },
    catchError(state, action) {
      state.loading = false;
      state.errors = action.payload.error;
    },
  },
});
