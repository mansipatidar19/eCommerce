import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import userAPI from "../APIs/UserAPI";
import { useSelector } from "react-redux";
import { selectToken } from "../slices/AuthSlice";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector(selectToken);

  const styleImage = {
    height: "170px",
    width: "130px",
  };

  // Function to cancel order using orderID
  const handleCancelOrder = async (orderId) => {
    const response = await userAPI.CancelOrder(orderId, token);
    toast(response.Message);
    fetchOrders();
  };

  // Fetching all the orders of particular user
  const fetchOrders = async () => {
    try {
      const ordersData = await userAPI.GetMyOrders(token);
      setOrders(ordersData.myOrderData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [token]);

  return (
    <div>
      <h2 className="bg-secondary text-secondary bg-opacity-10 border border-secondary border-1 rounded text-center py-1 pb-2 mx-5">
        My Orders
      </h2>
      {/* If no orders then, telling the user no orders found */}
      {orders.length === 0 && (
        <>
          <h6 className="text-secondary bg-secondary bg-opacity-10 text-center">
            No Orders Available
          </h6>
        </>
      )}
      <div>
        {/* Iteration through all the orders */}
        {orders.map((order, index) => (
          <div key={order._id} className="row ms-2 mt-3">
            <h3 className="text-secondary bg-secondary bg-opacity-10 text-center">
              Order: {index + 1}
            </h3>
            <div className="col-md-4 col-12">
              <div className="d-flex flex-column justify-content-center">
                <img
                  src={order.products.product.image}
                  alt={order.products.product.title}
                  style={styleImage}
                  className="img-fluid rounded-5 ms-md-5 mx-auto shadow-lg"
                />
              </div>
            </div>
            <div className="col-md-4 col-12 d-flex flex-column justify-content-center">
              <p>
                <span className="fw-bold text-secondary">Status: </span>
                {order.status}
              </p>
              <p>
                <span className="fw-bold text-secondary">Total Amount:</span> ₹
                {order.totalamount}
              </p>
              <p>
                <span className="fw-bold text-secondary">Payment Method: </span>
                {order.paymentMethod}
              </p>
            </div>
            <div className="col-md-4 col-12 d-flex flex-column justify-content-center">
              <p>
                <span className="fw-bold text-secondary">Title: </span>
                {order.products.product.title}
              </p>
              <p>
                <span className="fw-bold text-secondary">Quantity: </span>
                {order.products.quantity}
              </p>
              <button className="btn btn-secondary me-md-5">
                {/* Cancelling the order using it's id */}
                <Link
                  onClick={() => {
                    handleCancelOrder(order._id);
                  }}
                  className="text-decoration-none text-white"
                >
                  Cancel Order
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
