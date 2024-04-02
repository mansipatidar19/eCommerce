// Imposrting neccessary components & required States
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProductList from "./components/ProductList";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import UserEditForm from "./components/UserEditForm";
import ProductEditForm from "./components/ProductEditForm";
import AddProduct from "./pages/AddProduct";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import Checkout from "./pages/CheckOut";
import MyOrders from "./pages/MyOrders";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";
import { useSelector } from "react-redux";
import { selectUser } from "./slices/UserSlice";

function App() {
  // Admin variable to set admin status
  const [admin, setAdmin] = useState(false);

  const user = useSelector(selectUser);
  // User to set user
  // const JSONuser = sessionStorage.getItem("user");
  // const user = JSON.parse(JSONuser);
  console.log(user);

  // Setting admin based on user data
  useEffect(() => {
    if (user) {
      setAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div className="App">
        {/* toastify-container */}
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
        <Header />
        <Routes>
          {/* Basic Routes */}
          <Route element={<Home />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<ProductList />} path="/allBooks" />
          <Route element={<Login />} path="/login" />
          <Route
            element={<ProductDetails />}
            path="/productDetails/:productId"
          />

          {/* Conditional routes based on user login */}
          {user && (
            <>
              <Route element={<Profile />} path="/userProfile" />
              <Route element={<Cart />} path="/cart" />
              <Route element={<Checkout />} path="/checkOut" />
              <Route element={<MyOrders />} path="/myOrders" />
            </>
          )}

          {/* Conditional routes for admin */}
          {admin && (
            <>
              <Route element={<AddProduct />} path="/addProduct" />
              <Route element={<UserEditForm />} path="/editUser/:userId" />
              <Route element={<ProductEditForm />} path="/editProduct/:id" />
              <Route element={<AdminPanel />} path="/adminPanel" />
            </>
          )}

          {/* If any other path is there */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
