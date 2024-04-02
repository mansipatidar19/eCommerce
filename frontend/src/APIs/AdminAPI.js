import axios from "axios"; // Importing axios for making HTTP requests

const API_URL = "https://ecommerce-server-paod.onrender.com/api/admin"; // Base URL for admin API

const adminAPI = {
  getUserById: async (userId, token) => {
    // Function to fetch user by ID
    try {
      const response = await axios.get(`${API_URL}/getUserById/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      return response.data;
    } catch (error) { 
      throw error;
    }
  },

  getAllUsers: async (token) => {
    // Function to fetch all users
    try {
      const response = await axios.get(`${API_URL}/getAllUsers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Returning user data from the response
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userId, userData, token) => {
    // Function to update user
    try {
      const response = await axios.patch(
        `${API_URL}/updateUser/${userId}`,
        userData,
        { headers: { Authorization: `Bearer ${token}` } } // Including authorization token in the request headers
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllOrders: async (token) => {
    // Function to fetch all orders
    try {
      const response = await axios.get(`${API_URL}/getAllOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateOrderStatus: async (orderId, updatedStatus, token) => {
    // Function to update order status
    try {
      const response = await axios.patch(
        `${API_URL}/updateOrderStatus/${orderId}`,
        { updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default adminAPI; // Exporting adminAPI object
