// Importing createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Creating a slice for authentication state management
const authSlice = createSlice({
  // Name of the slice
  name: "auth",
  initialState: {
    // Initial state with token retrieved from sessionStorage
    token: sessionStorage.getItem("token") || "",
  },
  reducers: {
    // Reducer function to set the authentication token
    setToken(state, action) {
      // Updating token in the state
      state.token = action.payload;
      // Storing token in sessionStorage
      sessionStorage.setItem("token", action.payload);
    },
    // Reducer function to clear the authentication token
    clearToken(state) {
      // Clearing token in the state
      state.token = "";
      // Removing token from sessionStorage
      sessionStorage.removeItem("token");
    },
  },
});

// Exporting action creators
export const { setToken, clearToken } = authSlice.actions;

// Selector function to retrieve token from the state
export const selectToken = (state) => state.auth.token;

// Exporting the reducer function
export default authSlice.reducer;
