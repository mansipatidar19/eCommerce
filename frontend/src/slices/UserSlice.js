import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData", // Name of the slice
  initialState: {
    user: JSON.parse(sessionStorage.getItem("user")) || "",
  },
  reducers: {
    setUser(state, action) {
      // Reducer function to set the user data
      state.user = action.payload; // Update user data in the state
      sessionStorage.setItem("user", JSON.stringify(action.payload)); // Store user data in sessionStorage
    },
    clearUser(state) {
      // Reducer function to clear the user data
      state.user = null; // Clear user data in the state
      sessionStorage.removeItem("user"); // Remove user data from sessionStorage
    },
  },
});

export const { setUser, clearUser } = userDataSlice.actions; // Exporting action creators

export const selectUser = (state) => state.userData.user; // Selector function to retrieve user data from the state

export default userDataSlice.reducer; // Exporting the reducer function
