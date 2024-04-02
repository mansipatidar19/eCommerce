import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductDeatils } from "../APIs/ProductsAPI";
import { useDispatch } from "react-redux";
import { addItem } from "../slices/CartSlice";

function ProductDetails() {
  // Getting productId from the URL(Route)
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = sessionStorage.getItem("user");

  const styleImage = {
    height: "240px",
    width: "170px",
  };

  // Adding item to cart using redux store
  const handleAddToCart = () => {
    dispatch(addItem({ productId, quantity: 1 }));
    navigate("/cart");
  };

  // Getting product details on render
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const data = await fetchProductDeatils(productId);
        setProduct(data.Product);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getProductDetails();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <div className="row container mt-4 mx-5">
        <div className="col-12 col-md-4 ms-4 ms-md-0 ps-md-5">
          <img
            src={product.image}
            alt={product.title}
            style={styleImage}
            className="rounded-5 ms-md-5 mx-auto shadow-lg"
          />
        </div>
        <div className="col-12 col-md-8 mt-md-3 ms-5 ms-md-0 ps-md-0 text-info">
          <h3 className="fw-bold">Title: {product.title}</h3>
          <h5 className="my-3">Cost: ₹{product.price}</h5>
          <cite>~ {product.description}</cite>
          <p className="mt-3">Quantity: {product.quantity}</p>
          {/* Conditional rendering: If user is logged-in then add to cat if not, then log-in */}
          {user ? (
            <>
              <button
                className="btn bg-info bg-opacity-10 border border-2 rounded border-info text-info mt-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn bg-info bg-opacity-10 border border-2 rounded border-info text-info mt-1">
                  Please Login, To Add To Cart
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
