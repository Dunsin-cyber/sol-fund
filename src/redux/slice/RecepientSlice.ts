import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RecipientT } from "../types";

// Define the initial state using that type
const initialState: RecipientT = {
  name: "",
  amountDonated: 0,
  amountRequired: 0,
  description: "",
  publicKey: "",
  donationComplete: false,
};

export const RecipientSlice = createSlice({
  name: "recipient",
  initialState,
  reducers: {
    addRecipient: (state, { payload }: PayloadAction<RecipientT>) => {
      state.name = payload.name;
      state.amountDonated = payload.amountDonated;
      state.amountRequired = payload.amountRequired;
      state.description = payload.description;
      state.publicKey = payload.publicKey;
      state.donationComplete = payload.donationComplete;
    },
    clearRecipient: () => {
      return initialState;
    },
  },
});

export const { clearRecipient, addRecipient } = RecipientSlice.actions;

export default RecipientSlice.reducer;
