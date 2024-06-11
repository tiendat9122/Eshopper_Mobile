import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface JwtState {
  token: string;
  refreshToken: string;
}

let initialState: JwtState = {
  token: "",
  refreshToken: "",
};

export const jwtSlice = createSlice({
  name: "jwt",
  initialState,
  reducers: {
    setJwt: (state, action: PayloadAction<JwtState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setJwt } = jwtSlice.actions;

export const selectJwt = (state: RootState) => state.jwt;

export default jwtSlice.reducer;
