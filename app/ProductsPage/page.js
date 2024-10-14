"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import "./ProductsPage.css";
import { useDebounce } from "../hooks/debounce";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1500);

  async function fetchData(sortBy = "", order = "asc", search = "") {
    setLoading(true);

    let url = `https://dummyjson.com/products`;

    if (search) {
      // If searching, update URL
      url = `https://dummyjson.com/products/search?q=${debouncedSearch}`;
    }

    if (sortBy && search) {
      // If searching and sorting append to url
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    if (sortBy && !search) {
      // Only append sorting params if not searching
      url = `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setProducts(data.products);
    setLoading(false);
  }

  useEffect(() => {
    fetchData(sortBy, order, debouncedSearch);
  }, [debouncedSearch]);

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

    fetchData(sortByField, sortOrder, search);
  }

  return (
    <div className="productContainer">
      <h1 className="postHeader">Products</h1>
      <div className="product-filters">
        <div className="sort-container">
          <select className="sortingButtons" onChange={handleSortChange}>
            <option value="">(Select Option)</option>
            <option value="price-asc">Sort by Price &uarr;</option>
            <option value="title-asc">Sort by Name &uarr;</option>
            <option value="price-desc">Sort by Price &darr;</option>
            <option value="title-desc">Sort by Name &darr;</option>
          </select>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="products">
          {products.length > 0 ? (
            products.map((item) => (
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
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
