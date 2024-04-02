import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userAPI from "../APIs/UserAPI";
import { setToken } from "../slices/AuthSlice";
import { setUser } from "../slices/UserSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Function to handle user login
  const login = async () => {
    setLoading(true);
    try {
      const response = await userAPI.login(userData);
      dispatch(setUser(response.user));
      dispatch(setToken(response.token));
      toast(response.Message);
      setLoading(false);
      setTimeout(() => {
        // Navigation to allBooks page, after completion of toastify toast
        navigate("/allBooks");
      }, 1700);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast(error.response.data.Message);
    }
  };

  return (
    <div className="container">
      <div className="text-center">
        <h2 className="fw-bold my-4 d-inline-flex border-bottom border-secondary border-3 rounded px-3 pb-1">
          Log-in Form
        </h2>
      </div>
      <div className="mb-4">
        <label
          htmlFor="exampleFormControlInput"
          className="form-label text-secondary fw-semibold"
        >
          E-mail
        </label>
        <input
          type="email"
          className="form-control border-secondary"
          id="exampleFormControlInput"
          placeholder="admin@internshala.com"
          value={userData.email}
          onChange={(e) =>
            setUserData(() => ({
              ...userData,
              email: e.target.value,
            }))
          }
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label text-secondary fw-semibold"
        >
          Password
        </label>
        <input
          type="password"
          className="form-control border-secondary"
          id="exampleFormControlInput1"
          placeholder="123#Alphabet"
          value={userData.password}
          onChange={(e) =>
            setUserData(() => ({
              ...userData,
              password: e.target.value,
            }))
          }
        />
      </div>
      <button
        type="submit"
        className="mt-2 btn bg-secondary bg-opacity-10 border border-2 rounded border-secondary text-secondary fw-bold mb-3 w-100"
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
      >
        {/* Loading component to tell the user, API is calling here... (Please Wait) */}
        
        {loading ? (
          <span>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </span>
        ) : (
          "Log-In"
        )}
      </button>
    </div>
  );
}

export default Login;
