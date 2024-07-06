// src/store/updateUserDataSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserData } from "../apis/updateUserData";

interface UpdateUserDataState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UpdateUserDataState = {
  status: "idle",
  error: null,
};

export const updateUserDataAsync = createAsyncThunk(
  "updateUserData/updateUserDataAsync",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await updateUserData(userData);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUserDataSlice = createSlice({
  name: "updateUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserDataAsync.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateUserDataAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default updateUserDataSlice.reducer;
