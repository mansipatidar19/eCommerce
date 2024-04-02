import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../slices/AuthSlice";
import adminAPI from "../APIs/AdminAPI";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function UserEditForm() {
  // Getting the userId from the route
  const { userId } = useParams();

  // Token from the redux store
  const token = useSelector(selectToken);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    admin: false,
  });

  // Fetch user details based on userId
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await adminAPI.getUserById(userId, token);
        setFormData({
          name: response.name,
          email: response.email,
          address: response.address,
          admin: response.admin,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    // eslint-disable-next-line
  }, [token]);

  // FormChange to handle any change in the user data
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData =
      name === "admin"
        ? { ...formData, isAdmin: value === "true" }
        : { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  // UpdateUser API to handle user updation
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await adminAPI.updateUser(userId, formData, token);
      console.log(response);
      toast(response.Message);
    } catch (error) {
      toast(error.response.data.Message);
      console.error("Error updating user:", error.response.data);
    }
  };

  return (
    <div>
      <h2 className="text-info py-2 text-center">Edit User</h2>
      <form
        onSubmit={handleUpdateUser}
        className="mx-5 row bg-info px-3 py-4 bg-opacity-10 border border-1 border-info rounded"
      >
        <div className="col-6">
          <label htmlFor="userName" className="text-info me-3">
            Name :
          </label>
          <input
            type="text"
            id="userName"
            name="name"
            className="text-info fw-medium"
            value={formData.name}
            onChange={handleFormChange}
          />
        </div>

        <div className="col-6">
          <label htmlFor="userEmail" className="text-info me-3">
            Email :
          </label>
          <input
            type="email"
            id="userEmail"
            name="email"
            className="text-info fw-medium"
            value={formData.email}
            onChange={handleFormChange}
          />
        </div>

        <div className="row">
          <div className="col my-2">
            <label htmlFor="userAddress" className="text-info me-3">
              Address :
            </label>
            <input
              type="text"
              id="userAddress"
              name="address"
              className="text-info fw-medium"
              value={formData.address}
              onChange={handleFormChange}
            />
          </div>
          <div className="col my-2">
            <label htmlFor="isAdmin" className="text-info me-3">
              Admin :
            </label>
            <select
              id="isAdmin"
              name="admin"
              className="text-info fw-medium"
              value={formData.admin}
              onChange={handleFormChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-outline-info mt-2 fw-bold"
        >
          Update User
        </button>
      </form>
    </div>
  );
}

export default UserEditForm;
