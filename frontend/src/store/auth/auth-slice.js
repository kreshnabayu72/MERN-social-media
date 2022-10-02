import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "Auth",
  initialState: {
    loggedUser: {},
    isLoggedIn: false,
  },
  reducers: {
    setLoggedUser(state, action) {
      state.loggedUser = action.payload.loggedUser;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.loggedUser = {};
      state.isLoggedIn = false;
    },
  },
});
