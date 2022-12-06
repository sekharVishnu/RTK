import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
// const initialState = [
//   { id: "0", name: "Vishnu Sekhar" },
//   { id: "1", name: "Aaron Mankhe" },
//   { id: "2", name: "Irene Adler" },
// ];
const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export const selectAllUsers = (state) => state.users;
export default userSlice.reducer;
