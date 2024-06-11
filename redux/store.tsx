import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import countReducer from "./countSlice";
import userReducer from "./userSlice";
import jwtReducer from "./jwtSlice";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    count: countReducer,
    user: userReducer,
    jwt: jwtReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
