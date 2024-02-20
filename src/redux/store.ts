import { configureStore } from "@reduxjs/toolkit";
import recipient from "./slice/RecepientSlice";
import campaign from "./slice/CampaignSlice";
import transction from "./slice/TransactionSlice";

export const store = configureStore({
  reducer: {
    recipient,
    campaign,
    transction,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
