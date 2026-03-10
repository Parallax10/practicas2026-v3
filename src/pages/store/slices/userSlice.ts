import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserState {
    nombre: string | null;
}

const initialState: UserState = {
    nombre: null,
};

export const userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
        state.nombre = action.payload;
    },

    logout: (state) => {
        state.nombre = null;
    },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;