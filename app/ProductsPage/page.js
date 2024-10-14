"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import "./ProductsPage.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  async function fetchData(sortBy = "", order = "asc") {
    setLoading(true);

    let url = `https://dummyjson.com/products`;
    if (sortBy) {
      // falsy value
      url += `?sortBy=${sortBy}&order=${order}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setProducts(data.products);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleSortChange(e) {
    const selectedSortBy = e.target.value;
    let sortByField = "";
    let sortOrder = "";

    switch (selectedSortBy) {
      case "price-asc":
        sortByField = "price";
        sortOrder = "asc";
        break;
      case "price-desc":
        sortByField = "price";
        sortOrder = "desc";
        break;
      case "title-asc":
        sortByField = "title";
        sortOrder = "asc";
        break;
      case "title-desc":
        sortByField = "title";
        sortOrder = "desc";
        break;
      default:
        sortByField = "";
        sortOrder = "asc";
        break;
    }

    setSortBy(sortByField);
    setOrder(sortOrder);

    fetchData(sortByField, sortOrder);
  }

  return (
    <div className="productContainer">
      <h1 className="postHeader">Products</h1>

      <div className="sort-container">
        <select className="sortingButtons" onChange={handleSortChange}>
          <option value="">(Select Sorting Option)</option>
          <option value="price-asc">Sort by Price &uarr;</option>
          <option value="title-asc">Sort by Name &uarr;</option>
          <option value="price-desc">Sort by Price &darr;</option>
          <option value="title-desc">Sort by Name &darr;</option>
        </select>
      </div>

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
