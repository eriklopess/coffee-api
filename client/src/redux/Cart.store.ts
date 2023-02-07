import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../interfaces/Product";

type ProductCart = Product & {
    quantity: number;
}

type CartInitialState = {
    cart: ProductCart[];
    total: number;
}

const store = createSlice({
    name: 'cart',
    initialState: {
        cart: [] as Product[],
        total: 0
    },
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const productInCart = state.cart.find((item) => item.id === product.id);
            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
            state.total += product.price;
        }
    }
});

export const { addToCart } = store.actions;
export default store;