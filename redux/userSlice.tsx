import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface Role {
  id: number;
  displayName: string;
  name: string;
}

export interface UserState {
  id: number;
  active: boolean;
  address: string;
  avatar: any;
  birth_day: any;
  email: string;
  full_name: string;
  password: string;
  phone_number: string;
  user_name: string;
  role: Role[];
}

export interface Test {
  value: number;
}

let initialState: UserState = {
  id: 0,
  active: false,
  address: "",
  avatar: "",
  birth_day: "",
  email: "",
  full_name: "",
  password: "",
  phone_number: "",
  user_name: "",
  role: [
    {
      id: 0,
      displayName: "",
      name: "",
    },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
      return state;
    },
    removeUser: (state) => {
      state = initialState
      return state;
    }
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
