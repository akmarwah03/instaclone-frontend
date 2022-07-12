import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  },
  reducers: {
    loginViaToken(state, action) {
      state.isAuth = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.authLoading = false;
    },
    logout(state, action) {
      state.isAuth = false;
      state.token = null;
    },
    startAuth(state, action) {
      state.authLoading = true;
    },
    stopAuth(state, action) {
      state.authLoading = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
