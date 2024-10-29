import React from "react";
import styles from "./AddProduct.css";
import { useState } from "react";

export default function AddProduct({ products, setProducts, search, order }) {
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const productToAdd = {
      id: new Date().getTime(), // Unique ID for the new product
      title: newProduct.title,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      brand: newProduct.brand,
    };

    const updatedProducts = [productToAdd, ...products];
    setProducts(updatedProducts);

    // Update localStorage with the new product
    localStorage.setItem(
      `products_${search}_${order}`,
      JSON.stringify(updatedProducts)
    );

    // Reset form and close the modal
    setNewProduct({ title: "", description: "", price: "", brand: "" });
    setShowForm(false);
  };

  return (
    <>
      <div className="add-button-div">
        <button className="add-button" onClick={() => setShowForm(true)}>
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="overlay">
          <form className="form-modal" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Product Brand"
              value={newProduct.brand}
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
            <button type="submit">Add Product</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}
