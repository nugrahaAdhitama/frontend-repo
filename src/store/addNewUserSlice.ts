import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addNewUser } from "@/apis/AddNewUser";

interface AddNewUserState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AddNewUserState = {
  status: "idle",
  error: null,
};

export const addNewUserAsync = createAsyncThunk(
  "addNewUser/addNewUserAsync",
  async (user: any) => {
    const response = await addNewUser(user);
    return response;
  }
);

export const addNewUserSlice = createSlice({
  name: "addNewUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewUserAsync.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addNewUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default addNewUserSlice.reducer;
