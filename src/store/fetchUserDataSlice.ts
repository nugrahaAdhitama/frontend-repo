import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserData } from "../apis/fetchUser";
import Swal from "sweetalert2";

interface FetchUserDataState {
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FetchUserDataState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchUserDataAsync = createAsyncThunk(
  "fetchUserData/fetchUserDataAsync",
  async () => {
    const response = await fetchUserData();
    return response;
  }
);

const fetchUserDataSlice = createSlice({
  name: "fetchUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUserDataAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default fetchUserDataSlice.reducer;
