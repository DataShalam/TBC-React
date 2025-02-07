"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function EditProduct({
  productID,
  title,
  description,
  price,
  brand,
}: {
  productID: number;
  title: string;
  description: string;
  price: number;
  brand: string;
}) {
  const [showForm, setShowForm] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title: title,
    description: description,
    price: price,
    brand: brand,
  });
  const inputStyles =
    "p-4 text-base border border-white rounded-md w-full outline-none focus:border-light-hover-whole focus:dark:border text-light dark:text-dark";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClientComponentClient();

    try {
      const { data, error } = await supabase
        .from("Products")
        .update({
          Title: editedProduct.title,
          Description: editedProduct.description,
          Price: editedProduct.price,
          Brand: editedProduct.brand,
        })
        .eq("Id", productID)
        .select();

      if (error) throw error;

      setShowForm(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-start">
        <button
          className="border-none text-base py-2 px-4 rounded-md cursor-pointer bg-light-heading dark:bg-dark-heading hover:bg-light-hover-whole hover:dark:bg-dark-hover-whole transition"
          onClick={() => setShowForm((prev) => !prev)}
        >
          Edit Product
        </button>
      </div>
      {showForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-black bg-opacity-70">
          <form
            className="flex flex-col w-[90%] max-w-[400px] z-20 p-7 rounded-2xl gap-3 bg-light-card dark:bg-dark-card"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="title"
              placeholder="Product Name"
              value={editedProduct.title}
              onChange={handleInputChange}
              className={inputStyles}
              autoFocus
            />
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={editedProduct.description}
              onChange={handleInputChange}
              className={inputStyles}
            />
            <input
              type="text"
              name="brand"
              placeholder="Product Brand"
              value={editedProduct.brand}
              onChange={handleInputChange}
              className={inputStyles}
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={editedProduct.price}
              onChange={handleInputChange}
              className={inputStyles}
              min="0"
              step="0.01"
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
    </div>
  );
}
