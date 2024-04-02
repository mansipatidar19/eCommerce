import React, { useState } from "react";
import { addProduct } from "../APIs/ProductsAPI";
import { toast } from "react-toastify";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
    image: null,
  });

  // getting token from the session storage of the browser
  const token = sessionStorage.getItem("token");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Function to handle submission of the newly added product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addProduct(formData, token);
      console.log(response);
      toast(response.Message);
      setFormData({
        title: "",
        description: "",
        quantity: "",
        price: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast(error.response.data.Message);
    }
  };

  return (
    <div>
      <h2 className="text-secondary pb-2 text-center">Add Product</h2>
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center flex-column"
      >
        <div className="mx-auto bg-secondary text-secondary bg-opacity-10 border border-secondary border-1 rounded px-5 py-3">
          <div className="my-3">
            <label className="text-secondary me-2">Title:</label>
            <input
              type="text"
              name="title"
              className="text-secondary"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-3">
            <label className="text-secondary me-2">Description:</label>
            <input
              type="text"
              name="description"
              className="text-secondary"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-3">
            <label className="text-secondary me-2">Quantity:</label>
            <input
              type="number"
              name="quantity"
              className="text-secondary"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-3">
            <label className="text-secondary me-2">Price:</label>
            <input
              type="number"
              name="price"
              className="text-secondary"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="my-3">
            <label className="text-secondary me-2">Image:</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              className="text-secondary"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="mb-3 d-flex flex-column mt-4">
            <button type="submit" className="btn btn-outline-secondary">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
