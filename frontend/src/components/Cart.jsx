import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../slices/CartSlice";
import { fetchProductsAsync } from "../slices/ProductSlice";
import { Link } from "react-router-dom";

function Cart() {

  // Using dispatch for getting reducers fom store
  const dispatch = useDispatch();

  // UseState to set cart products
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const products = useSelector((state) => state.products.products);

  // Styling the image of the product
  const styleImage = {
    height: "240px",
    width: "170px",
  };

  // Getting the actual quantity so that the user cant increase the quantity from that one
  const getProductQuantity = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product ? product.quantity : 0;
  };

  // Function to get all the cart items
  const getCartItems = () => {
    const items = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(items);
  };

  // Function to remove any one item using id
  const handleRemoveItem = (productId) => {
    dispatch(removeItem(productId));
    getCartItems();
    window.location.reload();
    // Update the cartItems state to trigger re-render
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCartItems);
  };

  // Function to increase quantity of product
  const handleIncreaseQuantity = (productId) => {
    const productQuantity = getProductQuantity(productId);
    // Update the cartItems state to trigger re-render
    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === productId) {
        if (productQuantity <= item.quantity) {
          console.log(item.quantity);
          alert("No more quantity available");
          console.log(item);
          return item;
        } else {
          dispatch(increaseQuantity(productId));
          return { ...item, quantity: item.quantity + 1 };
        }
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Function to decrease quantity of product
  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
    // Update the cartItems state to trigger re-render
    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity: Math.max(item.quantity - 1, 1) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // useEffect to fetch products on render
  useEffect(() => {
    getCartItems();
    dispatch(fetchProductsAsync());
    // eslint-disable-next-line
  }, [dispatch]);

  // Filtering cart products from the all products
  useEffect(() => {
    if (cartItems.length > 0 && products.length > 0) {
      const filteredProducts = products.filter((product) =>
        cartItems.some((item) => item.productId === product._id)
      );
      setCartProducts(filteredProducts);
    }
  }, [cartItems, products]);

  return (
    <div className="container-fluid">
      <h2 className="bg-secondary text-secondary bg-opacity-10 border border-secondary border-1 rounded text-center py-1 pb-2 mx-5">
        Shopping Cart
      </h2>
      {/* If no products are there */}
      {cartProducts.length === 0 ? (
        <div className="d-flex justify-content-center mt-5">
          <cite className="text-secondary fw-medium fs-5">
            Your cart is empty!
          </cite>
        </div>
      ) : (
        <>
        {/* Iterating to the products array */}
          {cartProducts.map((item) => (
            <div className="row my-4" key={item._id}>
              <div className="col-md-3 col-12 mb-lg-0 mb-3 text-end">
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid rounded-5 ms-md-5 mx-auto shadow-lg"
                  style={styleImage}
                />
              </div>
              <div className="col-md-9 col-12 text-secondary">
                <h4 className="mb-2">{item.title}</h4>
                <p className="mb-2">Price: ₹{item.price}</p>
                <cite>~ {item.description}</cite>
                <div className="mt-3 d-flex align-items-center">
                  <button
                    className="btn bg-secondary text-secondary bg-opacity-10 border border-secondary border-1 rounded me-2"
                    onClick={() => handleDecreaseQuantity(item._id)}
                  >
                    -
                  </button>
                  <span className="display-6 fw-medium">
                    {cartItems.find(
                      (cartItem) => cartItem.productId === item._id
                    )?.quantity || 0}
                  </span>
                  <button
                    className="btn bg-secondary text-secondary bg-opacity-10 border border-secondary border-1 rounded mx-2"
                    onClick={() => handleIncreaseQuantity(item._id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-secondary mt-3 px-5"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {/* Redirecting to the checkout screen to place an order */}
          <div className="text-end me-5">
            <Link to="/checkOut">
              <button className="btn bg-secondary text-secondary bg-opacity-10 border border-secondary border-1 rounded fw-medium">
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
