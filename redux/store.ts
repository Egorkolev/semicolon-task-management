import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;