import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    userList: [],
  },
  reducers: {
    setUserList(state, action) {
      state.userList = action.payload.userList;
    },
  },
});
