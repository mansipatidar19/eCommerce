import React, { useState } from "react";
import userAPI from "../APIs/UserAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Function to get the register the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await userAPI.register(formData);
      setFormData({ name: "", email: "", password: "", address: "" });
      toast(data.Message);
      // Navigating the user after 1.5 sec to login 
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 1800);
    } catch (error) {
      console.error("Registration failed:", error);
      toast(error.response.data.Message);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="container">
      {/* Registration form */}
      <div className="text-center">
        <h2 className="fw-bold my-4 d-inline-flex border-bottom border-info border-3 rounded px-3 pb-1">
          Registration Form
        </h2>
      </div>
      <div className="mb-4">
        {/* Input field for first name */}
        <label htmlFor="name" className="form-label text-info fw-semibold">
          Name
        </label>
        <input
          type="text"
          className="form-control border-info"
          id="name"
          placeholder="Sonam"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        {/* Input field for email */}
        <label
          htmlFor="Email"
          className="form-label text-info fw-semibold"
        >
          Email
        </label>
        <input
          type="email"
          className="form-control border-info"
          id="Email"
          placeholder="admin@internshala.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        {/* Input field for password */}
        <label
          htmlFor="Password"
          className="form-label text-info fw-semibold"
        >
          Password
        </label>
        <input
          type="password"
          className="form-control border-info"
          id="Password"
          placeholder="120#$Alphabets!"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        {/* Input field for last name */}
        <label
          htmlFor="lastName"
          className="form-label text-info fw-semibold"
        >
          Address
        </label>
        <input
          type="text"
          className="form-control border-info"
          id="lastName"
          placeholder="Neemuch, M.P."
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </div>
      {/* Button for registration */}
      <button
        type="submit"
        className="mt-2 btn bg-info bg-opacity-10 border border-2 rounded border-info text-info fw-bold mb-3 w-100"
        onClick={(e) => {
          handleSubmit(e); // Call register function on button click
        }}
      >
        {/* Conditional rendering of button text based on loading state */}
        {loading ? (
          <span>
            <span
              className="spinner-border spinner-border-sm me-2"
              aria-hidden="true"
            ></span>
            <span role="status">Loading...</span>
          </span>
        ) : (
          "Register"
        )}
      </button>
    </div>
  );
}

export default Register;
