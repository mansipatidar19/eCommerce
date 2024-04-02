import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import authReducer from "./AuthSlice";
import userDataReducer from "./UserSlice";
import cartReducer from "./CartSlice";

const store = configureStore({
  reducer: {
    // Setting up product reducer
    products: productReducer,
    // Setting up authentication reducer
    auth: authReducer,
    // Setting up user data reducer
    userData: userDataReducer,
    // Setting up cart reducer
    cart: cartReducer,
  },
});

// Exporting the Redux store
export default store;
