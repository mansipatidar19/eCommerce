import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../slices/AuthSlice";
import { Link } from "react-router-dom";
import adminAPI from "../APIs/AdminAPI";
import { toast } from "react-toastify";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // token to pass it in the headers
  const token = useSelector(selectToken);

  // Function to fetch users and orders data
  const getData = async () => {
    try {
      const usersData = await adminAPI.getAllUsers(token);
      setUsers(usersData.Users);
      const ordersData = await adminAPI.getAllOrders(token);
      setOrders(ordersData.ordersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to update order status 
  const updateOrderStatus = async (orderId, updatedStatus) => {
    try {
      const response = await adminAPI.updateOrderStatus(
        orderId,
        updatedStatus,
        token
      );
      console.log(response.Message);
      toast(response.Message);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleStatusChange = async (orderId, e) => {
    const updatedStatus = e.target.value;
    await updateOrderStatus(orderId, updatedStatus);
    getData();
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className="text-info pb-2 mt-0 text-center">Admin Panel</h1>
      <h3 className="bg-info text-center text-info py-1 pb-2 bg-opacity-10 border-bottom border-1 border-info">
        All Users
      </h3>
      <div className="mx-5 my-3">
        <table className="table px-3 table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}.</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>
                    {/* Redirecting to the userEditForm */}
                    <Link
                      to={`/editUser/${user._id}`}
                      className="text-decoration-none text-info"
                    >
                      <i className="fa-solid fa-user-pen fa-lg"></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <h3 className="bg-info text-center text-info py-1 pb-2 bg-opacity-10 border-bottom border-1 border-info mt-5 mb-0">
        All Orders
      </h3>
      {orders.length > 0 ? (
        <div className="mx-5 my-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th>Ordered by</th>
                <th>Quantity</th>
                <th>Product Name</th>
                <th>Total Amount</th>
                <th>Mode Of Payment Method</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                // Iterating through the orders array to get evry order detail
                <tr key={index}>
                  <th scope="row">{index + 1}.</th>
                  <td>{order.user.name}</td>
                  <td>{order.products.quantity}</td>
                  <td>{order.products.product.title}</td>
                  <td>{order.totalamount}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e)}
                      className="form-select text-info form-select-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-white bg-info text-center mt-0 py-3">
          <h5>OOPS!</h5>
          <cite>No Orders Found</cite>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
