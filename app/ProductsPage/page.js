"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import "./ProductsPage.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      setTimeout(() => {
        setProducts(data.products);
        setLoading(false);
      }, 2000);
    }

    fetchData();
  }, []);

  return (
    <div className="productContainer">
      <h1 className="postHeader">Products</h1>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="products">
          {products.map((item) => (
            <div key={item.id} className="product">
              <Link className="productLink" href={`/ProductsPage/${item.id}`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h2 className="product-title">{item.title}</h2>
                  <p className="product-description">{item.description}</p>
                  <p className="product-price">${item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
