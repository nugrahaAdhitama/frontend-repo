import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogoutState {
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: LogoutState = {
  status: "idle",
};

export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "loading";
    },
    logoutSuccess: (state) => {
      state.status = "succeeded";
    },
    logoutFailed: (state) => {
      state.status = "failed";
    },
  },
});

export const { logout, logoutSuccess, logoutFailed } = logoutSlice.actions;

export default logoutSlice.reducer;
