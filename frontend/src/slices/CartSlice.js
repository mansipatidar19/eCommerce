import { createSlice } from "@reduxjs/toolkit";

// Function to load cart items from session storage
const loadCartItemsFromSessionStorage = () => {
  const cartItemsJson = sessionStorage.getItem("cartItems");
  return cartItemsJson ? JSON.parse(cartItemsJson) : [];
};

const initialState = {
  // Load initial cart items from session storage
  items: loadCartItemsFromSessionStorage(), 
};

const cartSlice = createSlice({ 
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === newItem.productId
      );
      if (existingItem) {
        // If item already exists in cart, increase quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // Otherwise, add new item to cart
        state.items.push(newItem);
      }
      // Save cart items to session storage after updating
      sessionStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItem(state, action) {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.productId !== idToRemove);
      // Save cart items to session storage after updating
      sessionStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    increaseQuantity(state, action) {
      const idToIncrease = action.payload;

      const itemToIncrease = state.items.find(
        (item) => item.productId === idToIncrease
      );

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        // Save cart items to session storage after updating
        sessionStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    decreaseQuantity(state, action) {
      const idToDecrease = action.payload;
      const itemToDecrease = state.items.find(
        (item) => item.productId === idToDecrease
      );
      if (itemToDecrease) {
        // Ensure quantity does not go below 1
        itemToDecrease.quantity = Math.max(itemToDecrease.quantity - 1, 1);
        // Save cart items to session storage after updating
        sessionStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    clearCart(state) {
      // Clear the cart items
      state.items = [];
      // Remove cart items from session storage
      sessionStorage.removeItem("cartItems");
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
