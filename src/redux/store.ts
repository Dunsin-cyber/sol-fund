import { configureStore } from "@reduxjs/toolkit";
import recipient from "./slice/RecepientSlice";

export const store = configureStore({
  reducer: {
    recipient,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
