// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice";
import loginReducer from "./loginSlice";
import registerReducer from "./registerSlice";
import fetchUserDataReducer from "./fetchUserDataSlice";
import updateUserDataReducer from "./updateUserDataSlice";
import logoutReducer from "./logoutSlice";
import addNewUserReducer from "./addNewUserSlice"; // Add this line

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    register: registerReducer,
    fetchUserData: fetchUserDataReducer,
    updateUserData: updateUserDataReducer,
    logout: logoutReducer,
    addNewUser: addNewUserReducer, // Add this line
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
