"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import "./ProductPage.css";
import NotFoundPage from "../../NotFound/NotFound.js";

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productID } = params;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${productID}`);
        if (!res.ok) {
          return notFound();
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productID]);

  if (loading) return <div className="loading">Loading ...</div>;

  if (!product) return <NotFoundPage />;

  return (
    <div className="single-product">
      <div className="single-product-info">
        <h1 className="single-product-title">{product.title}</h1>
        <p className="single-product-description">{product.description}</p>
        <p className="single-product-price">Price: ${product.price}</p>

        <p className="single-product-category">Category: {product.category}</p>
        <div className="single-product-tags">
          Tags:{" "}
          {product.tags.map((tag) => (
            <span key={tag} className="product-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <img
        src={product.images[0]}
        alt={product.title}
        className="single-product-image"
      />
    </div>
  );
}