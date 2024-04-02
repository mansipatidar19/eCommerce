import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userAPI from "../APIs/UserAPI";
import { clearCart } from "../slices/CartSlice";
import { selectToken } from "../slices/AuthSlice";
import { toast } from "react-toastify";

function Checkout() {
  const dispatch = useDispatch();
  // Navigate to navugate the user 
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const token = useSelector(selectToken);

  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.items);

  // Calculating total amount 
  const totalAmount = useSelector((state) =>
    state.cart.items.reduce((total, item) => {
      const product = products.find((p) => p._id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0)
  );

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Function to place order
  const handlePlaceOrder = async () => {
    try {
      if (shippingAddress === "") {
        return toast("Please Enter Shipping Address!");
      }
      // Iterate through each item in the cart
      // Used for because handling await in map is not useful
      for (const item of cartItems) {
        // API call to place the order for the current item
        await userAPI.OrderProduct(
          item.productId,
          item.quantity, 
          paymentMethod,
          token
        );
      }

      // Clear the cart after placing all orders
      dispatch(clearCart());
      toast("Order placed Successfully!");
      setTimeout(() => {
        // Redirect to the orders page
        navigate("/myOrders");
      }, 1600);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container">
      <div className="mx-auto bg-secondary text-secondary bg-opacity-10 border border-secondary border-1 rounded px-5 py-3">
        <h2 className=" text-center text-secondary py-2 mb-4 border-bottom border-1 border-secondary ">
          Checkout
        </h2>
        <div className="mb-4">
          <h5>Shipping Address :</h5>
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter your shipping address"
            className="form-control text-secondary"
          />
        </div>
        <div className="mb-4">
          <h5>Payment Method :</h5>
          <select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="form-select text-secondary"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        <div className="mb-4">
          <h5>Order Summary :</h5>
          <p>Total Amount: ₹{totalAmount}</p>
        </div>
        <div className="mb-3 d-flex flex-column mt-4">
          <button
            className="btn btn-outline-secondary fw-medium"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
