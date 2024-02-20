import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CampaignT } from "../types";

// Define the initial state using that type
const initialState: CampaignT[] = [];

export const CampaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    addCampaign: (state, { payload }: PayloadAction<CampaignT>) => {
      state.push(payload);
    },
    clearCampaign: () => {
      return initialState;
    },
  },
});

export const { clearCampaign, addCampaign } = CampaignSlice.actions;

export default CampaignSlice.reducer;
