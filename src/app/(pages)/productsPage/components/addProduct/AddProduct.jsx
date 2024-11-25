import React from "react";
import { useState } from "react";

export default function AddProduct({ products, setProducts, search, order }) {
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
  });
  const inputStyles =
    "p-4 text-base border border-white rounded-md w-full outline-none focus:border-light-hover-whole focus:dark:border";

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
      <div className="flex justify-center">
        <button
          className="text-xl cursor-pointer rounded-xl py-3 px-5 bg-light-heading dark:bg-dark-heading text-light dark:text-dark hover:bg-light-hover hover:dark:bg-dark-hover transition"
          onClick={() => setShowForm(true)}
        >
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-black bg-opacity-70">
          <form
            className="flex flex-col w-[90%] max-w-[400px] z-20 p-7 rounded-2xl gap-3 bg-light-card dark:bg-dark-card"
            onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className={inputStyles}
              required
            />
            <input
              type="text"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className={inputStyles}
              required
            />
            <input
              type="text"
              placeholder="Product Brand"
              value={newProduct.brand}
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
              className={inputStyles}
              required
            />
            <input
              type="number"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className={inputStyles}
              required
            />
            <button
              type="submit"
              className="py-2 text-base font-semibold border-none rounded-md cursor-pointer bg-light-heading dark:bg-dark-heading hover:bg-light-hover hover:dark:bg-dark-hover transition"
            >
              Add Product
            </button>
            <button
              type="button"
              className="py-2 text-base font-semibold border-none rounded-md cursor-pointer bg-red-600  hover:bg-red-800 transition"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}
