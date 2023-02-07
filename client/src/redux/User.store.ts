import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces/User";

export type UserInitialState = {
    user: User;
    isLogged: boolean;
} 

const store = createSlice({
    name: 'user',
    initialState: {
        user: {} as User,
        isLogged: false
    },
    reducers: {
        setUser: (state: UserInitialState, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isLogged = true;
        }
    }
});

export const { setUser } = store.actions;
export default store;