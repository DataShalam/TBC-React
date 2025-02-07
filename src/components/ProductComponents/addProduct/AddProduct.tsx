"use client";

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AddProduct() {
  const inputStyles =
    "p-4 text-base border border-white rounded-md w-full outline-none focus:border-light-hover-whole focus:dark:border";
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({ title: "", price: "" });
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tagInput: "",
    tags: [],
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { title: "", price: "" };

    if (!newProduct.title.trim()) {
      newErrors.title = "Product Name is required!";
    }
    if (!newProduct.price || isNaN(Number(newProduct.price))) {
      newErrors.price = "Product Price is required!";
    }

    setErrors(newErrors);

    if (newErrors.title || newErrors.price) {
      return;
    }

    setLoading(true);

    // Prepare product data

    try {
      const response = await fetch(`api/auth/getUser`);
      const { userId } = await response.json();

      const productToAdd = {
        Title: newProduct.title,
        Description: newProduct.description,
        Price: Number(newProduct.price),
        Category: newProduct.category,
        Tags: newProduct.tags,
        Created_By: userId,
      };
      // Insert product into Supabase
      const { data, error } = await supabase
        .from("Products")
        .insert([productToAdd]);

      // if (error) throw error;
      // console.log("✅ Product added:", data);

      if (newProduct.images.length > 0) {
        const uploadedImages = await uploadImages(newProduct.images);
        console.log("🖼 Images uploaded:", uploadedImages);
      }

      // Reset form
      setNewProduct({
        title: "",
        description: "",
        price: "",
        category: "",
        tagInput: "",
        tags: [],
        images: [],
      });

      setShowForm(false);
    } catch (err) {
      console.error("❌ Error adding product:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Upload images to Supabase Storage
  const uploadImages = async (images) => {
    let uploadedUrls = [];
    for (let image of images) {
      const file = await fetch(image).then((res) => res.blob());
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}.jpg`;

      const { data, error } = await supabase.storage
        .from("TBCX_USAID")
        .upload(`public/${fileName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("❌ Image upload failed:", error.message);
      }
      //   const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public//${fileName}`;
      //   uploadedUrls.push(publicUrl);
      // }
    }

    return uploadedUrls;
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file as File));
    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  // Remove Image
  const handleRemoveImage = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-black bg-opacity-70 p-4">
          <form
            className="flex flex-col w-full max-w-lg z-20 p-7 rounded-2xl gap-3 bg-light-card dark:bg-dark-card"
            onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className={`${inputStyles} ${errors.title && "border-red-500"}`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}

            <input
              type="text"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className={inputStyles}
            />

            <input
              type="text"
              placeholder="Product Category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className={inputStyles}
            />

            <div>
              {/* Tags Input */}
              <div className="flex flex-wrap gap-2 items-center">
                {newProduct.tags?.map((tag, index) => (
                  <div
                    key={index}
                    className="text-light dark:text-white bg-gray-200 dark:bg-gray-700 text-sm px-2 py-1 rounded-md flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        setNewProduct({
                          ...newProduct,
                          tags: newProduct.tags.filter((t) => t !== tag),
                        })
                      }
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>

              {/* Tag Input Field */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Enter tag"
                  value={newProduct.tagInput || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, tagInput: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newProduct.tagInput?.trim()) {
                        setNewProduct({
                          ...newProduct,
                          tags: [
                            ...(newProduct.tags || []),
                            newProduct.tagInput.trim(),
                          ],
                          tagInput: "",
                        });
                      }
                    }
                  }}
                  className={`${inputStyles} flex-grow`}
                />
                <button
                  type="button"
                  className="bg-light-heading dark:bg-dark-heading hover:bg-light-hover hover:dark:bg-dark-hover transition-colors text-light dark:text-dark py-3 px-5 text-lg rounded-md"
                  onClick={() => {
                    if (newProduct.tagInput?.trim()) {
                      setNewProduct({
                        ...newProduct,
                        tags: [
                          ...(newProduct.tags || []),
                          newProduct.tagInput.trim(),
                        ],
                        tagInput: "",
                      });
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <input
              type="number"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className={inputStyles}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-light dark:text-dark">
                Upload Images:
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="p-2 text-base border border-white rounded-md w-full outline-none"
              />
            </div>

            {/* Image Previews */}
            <div className="flex flex-wrap gap-2 mt-2">
              {newProduct.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Uploaded Preview ${index}`}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="py-2 text-base font-semibold border-none rounded-md cursor-pointer bg-light-heading dark:bg-dark-heading hover:bg-light-hover hover:dark:bg-dark-hover transition-colors"
            >
              Add Product
            </button>
            <button
              type="button"
              className="py-2 text-base font-semibold border-none rounded-md cursor-pointer bg-red-600 hover:bg-red-800 transition"
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
