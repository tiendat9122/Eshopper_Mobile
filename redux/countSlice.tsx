import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface CountState {
  value: number;
}

const initialState: CountState = {
  value: 0,
};

export const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    increse: (state) => {
      state.value += 1;
    }
  },
});

export const { increse } = countSlice.actions;

export const selectCount = (state: RootState) => state.count.value;

export default countSlice.reducer;
