import { getAccessToken, removeAccessToken, setAccessToken } from "@/lib/token.service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    token: string | null;
}
const initialState: AuthState = {
    isAuthenticated: !!getAccessToken(),
    username: null,
    token: getAccessToken(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ token: string; username: string }>) {
            state.isAuthenticated = true;
            state.username = action.payload.username ?? null;
            state.token = action.payload.token ?? null;
            setAccessToken(action.payload.token);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.username = null;
            state.token = null;
            removeAccessToken();
        },
        setAuthenticated(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
    },
});
export const { login, logout, setAuthenticated } = authSlice.actions;
export default authSlice;