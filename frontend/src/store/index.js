import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth-slice";
import { postSlice } from "./post/post-slice";
import { userSlice } from "./user/user-slice";
import { utilSlice } from "./util/util-slice";
import { persistReducer, persistStore } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
};

const authPersist = persistReducer(persistConfig, authSlice.reducer);

const store = configureStore({
  reducer: {
    auth: authPersist,
    post: postSlice.reducer,
    user: userSlice.reducer,
    util: utilSlice.reducer,
  },
});

export const persistor = persistStore(store);
export default store;
