import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./EditProduct.css";

export default function EditProduct({ productId }) {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
  });

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
      <div className="editBtnWrapper">
        <button
          className="editButton"
          onClick={() => (showForm ? setShowForm(false) : setShowForm(true))}
        >
          Edit Product
        </button>
      </div>

      {showForm && (
        <form className="form-modal overlay" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={editedProduct.title}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, title: e.target.value })
            }
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
            required
          />
          <input
            type="text"
            placeholder="Product Brand"
            value={editedProduct.brand}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, brand: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Product Price"
            value={editedProduct.price}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, price: e.target.value })
            }
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </>
  );
}
