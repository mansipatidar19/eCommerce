import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../APIs/ProductsAPI";
import { selectToken } from "../slices/AuthSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  const [admin, setAdmin] = useState(false);
  const styleImage = {
    height: "55%",
    width: "100%", 
  };

  const token = useSelector(selectToken);

  // Function to delete product for admin
  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id, token);
      console.log(response);
      toast(response.Message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Getting the user and checking if its admin or not
  useEffect(() => {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      if (user.isAdmin === true) {
        setAdmin(true);
      }
    }
  }, []);

  return (
    <>
      <div className="col-12 col-md-6 col-lg-3 text-center mb-3 px-5 py-3">
        <div className="card mx-auto border-0">
          <img
            src={product.image}
            className="card-img-top mx-auto rounded-5 shadow"
            alt={product.name}
            style={styleImage}
          />
          <div className="card-body">
            <h5 className="card-title text-info fw-semibold">
              {product.title}
            </h5>
            <h6 className="card-text">Price: ₹{product.price}</h6>
            {/* Redirecting to product details component */}
            <Link
              to={`/productDetails/${product._id}`}
              className="btn bg-info text-info bg-opacity-10 border border-info border-1 rounded mx-2"
            >
              <i className="fa-solid fa-cart-plus me-2"></i>
              More...
            </Link>
            {/* Conditional rendering for admin */}
            {admin && (
              <>
                <Link
                  to={`/editProduct/${product._id}`}
                  className="btn btn-info me-2 mt-lg-2"
                >
                  <i className="fa-solid fa-user-pen fa-md me-1"></i>
                </Link>
                <Link
                  to="/allBooks"
                  className="btn btn-info mt-lg-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteProduct(product._id);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
