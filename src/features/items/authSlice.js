// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    loginError: null,
  },
  reducers: {
    loginSuccess(state) {
      state.isAuthenticated = true;
      state.loginError = null;
    },
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.loginError = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.loginError = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
