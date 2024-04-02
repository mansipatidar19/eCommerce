import axios from "axios";

const API_URL = "https://ecommerce-server-paod.onrender.com/api/user";

const userAPI = {
 
  // API to register 
  register: async (userData) => {
    try {
      console.log(userData);
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // API for user login
  login: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // API to get user's profile  
  getProfile: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/myProfile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // API to update profile
  UpdateProfile: async (updatedData, token) => {
    try {
      const response = await axios.patch(
        `${API_URL}/updateProfile`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // API to order product
  OrderProduct: async (productId, quantity, paymentMethod, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/orderProduct/${productId}`,
        { quantity, paymentMethod },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // API to cancel order
  CancelOrder: async (orderId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/cancelOrder/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // API t ge all orders of user logged in
  GetMyOrders: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/myOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userAPI;
