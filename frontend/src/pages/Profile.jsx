import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/UserSlice";
import { Link } from "react-router-dom";
import userAPI from "../APIs/UserAPI";
import { selectToken } from "../slices/AuthSlice";
import { toast } from "react-toastify";

function Profile() {

  // Getting user from session storage and parsing it to JS Object
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
  });

  // Modal handle changes
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Profile updation function
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const data = await userAPI.UpdateProfile(formData, token);
      dispatch(setUser(data.user));
      console.log(data.Message);
      toast(data.Message);
      setTimeout(()=>{
        handleCloseModal();
      },1000)
      // You may want to dispatch an action to update the user data in Redux store here
    } catch (error) {
      console.error("Error updating profile:", error);
      toast(error.response.data.Message);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div>
      {user && (
        <div className="ms-5">
          <div className="d-flex mb-3">
            <h2 className="text-secondary text-center">User Profile</h2>
            <Link
              className="mt-2 ms-3 text-secondary"
              onClick={handleShowModal}
            >
              <i className="fa-solid fa-user-pen fa-xl"></i>
            </Link>
          </div>
          <p>
            <span className="fw-bold text-secondary me-2">Name: </span>
            {user.name}
          </p>
          <p>
            <span className="fw-bold text-secondary me-2">Email:</span> {user.email}
          </p>
          <p>
            <span className="fw-bold text-secondary me-2">Address:</span>{" "}
            {user.address}
          </p>
        </div>
      )}
      {showModal && (
        <UpdateProfileModal
          formData={formData}
          handleCloseModal={handleCloseModal}
          handleFormChange={handleFormChange}
          handleUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
}

function UpdateProfileModal({
  formData,
  handleCloseModal,
  handleFormChange,
  handleUpdateProfile,
}) {
  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-3">
          <div className="modal-header bg-secondary bg-opacity-10">
            <h1 className="modal-title fs-5 text-secondary" id="updateProfileModalLabel">
              Update Profile
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="row g-3" onSubmit={handleUpdateProfile}>
              <div className="col-md-6">
                <label htmlFor="userName" className="form-label fw-medium text-secondary">
                  Name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="userEmail" className="form-label fw-medium text-secondary">
                  Email :
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="userAddress" className="form-label fw-medium text-secondary">
                  Address :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userAddress"
                  name="address"
                  placeholder="1234 Main St"
                  value={formData.address}
                  onChange={handleFormChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer border-0">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={handleUpdateProfile}
            >
              Update Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
