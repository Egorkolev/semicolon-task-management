import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    fullName?: string;
    email?: string;
    userId?: string | number;
};

const initialState: UserState = {
    fullName: "",
    email: "",
    userId: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
        },
    },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;