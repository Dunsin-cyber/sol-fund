import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TransactionT } from "../types";

// Define the initial state using that type
const initialState: TransactionT[] = [];

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, { payload }: PayloadAction<TransactionT>) => {
      state.push(payload);
    },
    clearTransactions: () => {
      return initialState;
    },
  },
});

export const { addTransaction, clearTransactions } = TransactionSlice.actions;

export default TransactionSlice.reducer;
