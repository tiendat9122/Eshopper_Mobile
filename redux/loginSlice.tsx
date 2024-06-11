import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface LoginState {
  value: string;
}

const initialState: LoginState = {
  value: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    checkStorage: (state) => {},
    passLogin: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = "";
    },
  },
});

export const { checkStorage, passLogin, logout } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login.value;

export default loginSlice.reducer;
