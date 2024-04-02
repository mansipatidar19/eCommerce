import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDeatils, updateProduct } from "../APIs/ProductsAPI";
import { selectToken } from "../slices/AuthSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductEditForm = () => {
  // Getting the product id from the route
  const { id } = useParams();

  const token = useSelector(selectToken);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
  });

  // Handling the input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // on Submissin of product changed details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProduct(id, formData, token);
      // Toast message to confirm the product is edited successfully
      toast(response.Message);
    } catch (error) {
      console.log("Error updating product:", error.response.data);
      toast(error.response.data.Message);
    }
  };

  // Fetching the products and setting the previos details od the product
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productDetails = await fetchProductDeatils(id);
        const product = productDetails.Product;
        setFormData({
          title: product.title,
          description: product.description,
          quantity: product.quantity,
          price: product.price,
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  return (
    <div>
      <h2 className="text-secondary py-2 text-center">Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center flex-column"
      >
        <div className="mx-auto bg-secondary text-secondary bg-opacity-10 border border-secondary border-1 rounded px-5 py-3">
          <div className="my-3">
            <label className="me-3 text-secondary">Title:</label>
            <input
              type="text"
              className="text-secondary"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label className="me-3 text-secondary">Description:</label>
            <input
              type="text"
              className="text-secondary"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label className="me-3 text-secondary">Quantity:</label>
            <input
              type="number"
              className="text-secondary"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label className="me-3 text-secondary">Price:</label>
            <input
              type="number"
              className="text-secondary"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3 d-flex flex-column">
            <button type="submit" className="btn btn-outline-secondary">
              Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductEditForm;
