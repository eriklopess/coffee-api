import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import user from "./User.store";
import cart from "./Cart.store";

const store = configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
