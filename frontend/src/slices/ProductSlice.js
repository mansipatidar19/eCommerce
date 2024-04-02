// Importing createSlice and createAsyncThunk from Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Importing the function to fetch products
import { fetchProducts } from "../APIs/ProductsAPI";

// Define the initial state
const initialState = {
  // Array to store products
  products: [],
  // Boolean to indicate if products are currently being fetched
  loading: false,
  // Error message if fetching products fails
  error: null,
};

// Define thunk action to fetch products
export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  // Action type
  async () => {
    try {
      // Fetch products data
      const productsData = await fetchProducts();
      // Return products array
      return productsData.Products;
    } catch (error) {
      // Throw error if fetching products fails
      throw error;
    }
  }
);

// Create a slice for managing product state
const productSlice = createSlice({
  // Slice name
  name: "products",
  // Initial state
  initialState,
  // Reducers
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state while fetching products
      .addCase(fetchProductsAsync.pending, (state) => {
        // Set loading to true
        state.loading = true;
        // Clear any previous errors
        state.error = null;
      })
      // Fulfilled state after successfully fetching products
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        // Set loading to false
        state.loading = false;
        // Update products array with fetched data
        state.products = action.payload;
      })
      // Rejected state if fetching products fails
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        // Set loading to false
        state.loading = false;
        // Set error message
        state.error = action.error.message;
      });
  },
});

// Exporting the reducer function
export default productSlice.reducer;
