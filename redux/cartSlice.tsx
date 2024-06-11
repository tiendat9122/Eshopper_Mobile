import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface Product {
  id: number;
  name: string;
  retail: number;
  picture: string;
  summary: string;
  hot: boolean;
  active: boolean;
}

interface Orders {
  id: number;
  totalPrice: number;
  transport: number;
  totalBill: number;
  state: boolean;
  address: string;
  phone_number: string;
  full_name: string;
}

export interface CartState {
  id: number;
  quantity: number;
  price: number;
  product: Product;
  orders: Orders;
}

let initialState: CartState = {
  id: 0,
  quantity: 0,
  price: 0,
  product: {
    id: 0,
    name: "",
    retail: 0,
    picture: "",
    summary: "",
    hot: false,
    active: false,
  },
  orders: {
    id: 0,
    totalPrice: 0,
    transport: 0,
    totalBill: 0,
    state: false,
    address: "",
    phone_number: "",
    full_name: "",
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
