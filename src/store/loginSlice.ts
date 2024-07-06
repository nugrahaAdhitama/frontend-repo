import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  isLoggedIn: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
