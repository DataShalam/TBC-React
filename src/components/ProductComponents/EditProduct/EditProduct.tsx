import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProduct({ productId }) {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
  });
  const inputStyles =
    "p-4 text-base border border-white rounded-md w-full outline-none focus:border-light-hover-whole focus:dark:border text-black";

  // Function to fetch product from localStorage and update state
  const fetchProductData = () => {
    const storedData = JSON.parse(localStorage.getItem("products__default"));

    if (storedData && Array.isArray(storedData)) {
      const productToEdit = storedData.find(
        (product) => String(product.id) === String(productId)
      );

      if (productToEdit) {
        setEditedProduct({
          title: productToEdit.title,
          description: productToEdit.description,
          price: productToEdit.price,
          brand: productToEdit.brand,
        });
      }
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem("products__default"));

    if (storedData && Array.isArray(storedData)) {
      const productIndex = storedData.findIndex(
        // ar vparsavdi amas da sheiwira chemi nervebi
        (product) => String(product.id) === String(productId)
      );

      if (productIndex !== -1) {
        // Update the product details
        storedData[productIndex] = {
          ...storedData[productIndex],
          title: editedProduct.title,
          description: editedProduct.description,
          price: parseFloat(editedProduct.price),
          brand: editedProduct.brand,
        };

        localStorage.setItem("products__default", JSON.stringify(storedData));

        setShowForm(false);
        fetchProductData();
      }
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <button
          className="border-none text-base py-2 px-4 rounded-md cursor-pointer bg-light-heading dark:bg-dark-heading hover:bg-light-hover-whole hover:dark:bg-dark-hover-whole transition"
          onClick={() => (showForm ? setShowForm(false) : setShowForm(true))}
        >
          Edit Product
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
              value={editedProduct.title}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, title: e.target.value })
              }
              className={inputStyles}
              required
            />
            <input
              type="text"
              placeholder="Product Description"
              value={editedProduct.description}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
            <input
              type="text"
              placeholder="Product Brand"
              value={editedProduct.brand}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, brand: e.target.value })
              }
              className={inputStyles}
              required
            />
            <input
              type="number"
              placeholder="Product Price"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, price: e.target.value })
              }
              className={inputStyles}
              required
            />
            <button
              type="submit"
              className="border-none cursor-pointer text-base font-semibold py-3 w-full rounded-md bg-light-heading dark:bg-dark-heading text-light dark:text-dark hover:bg-light-hover hover:dark:bg-dark-hover transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="border-none cursor-pointer text-base font-semibold py-3 w-full rounded-md text-white bg-red-500 hover:bg-red-700"
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
