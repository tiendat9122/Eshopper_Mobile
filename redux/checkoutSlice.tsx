import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface User {
  id: number;
  full_name: string;
  address: string;
  phone_number: string;
  email: string;
}

export interface CheckoutState {
  id: number;
  orderDate: string;
  totalPrice: number;
  transport: number;
  totalBill: number;
  state: boolean;
  note: string;
  address: string;
  phone_number: string;
  full_name: string;
  user: User;
}

let initialState: CheckoutState = {
  id: 0,
  orderDate: "",
  totalPrice: 0,
  transport: 0,
  totalBill: 0,
  state: false,
  note: "",
  address: "",
  phone_number: "",
  full_name: "",
  user: {
    id: 0,
    full_name: "",
    address: "",
    phone_number: "",
    email: "",
  },
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckout: (state, action: PayloadAction<CheckoutState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setCheckout } = checkoutSlice.actions;

export const selectCheckout = (state: RootState) => state.checkout;

export default checkoutSlice.reducer;
