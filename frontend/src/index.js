import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css"; // Importing Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.js"; //Importing Bootstrap JS 
import "react-toastify/dist/ReactToastify.css"; // Importing react-toastify CSS
import { Provider } from "react-redux";// Importing Provider from react-redux for Redux store integration
import store from "./slices/store"; // Importing Redux store from slices directory

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Wrapping App in Provider
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
