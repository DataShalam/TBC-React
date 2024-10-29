"use client";

import "./ProductsPage.css";
import { useEffect, useState } from "react";

import SortComponent from "./components/sort/sort.jsx";
import SearchComponent from "./components/search/search.jsx";
import Product from "../../components/product/Product.jsx";
import AddProduct from "./components/addProduct/AddProduct.jsx";

async function fetchProducts(search, order) {
  let res;

  if (!search && order && order !== "default") {
    res = await fetch(
      `https://dummyjson.com/products?sortBy=price&order=${order}`
    );
  } else if (search && order && order !== "default") {
    res = await fetch(
      `https://dummyjson.com/products/search?q=${search}&sortBy=price&order=${order}`
    );
  } else if (search) {
    res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
  } else {
    res = await fetch("https://dummyjson.com/products");
  }

  const data = await res.json();
  return data.products;
}

export default async function ProductsPage({ searchParams }) {
  const [products, setProducts] = useState([]);
  const search = searchParams?.search || "";
  const order = searchParams?.order || "default";

  useEffect(() => {
    async function getProducts() {
      // Check if products exist in localStorage for the current search and order
      const cachedProducts = localStorage.getItem(
        `products_${search}_${order}`
      );

      if (cachedProducts) {
        setProducts(JSON.parse(cachedProducts));
        // console.log(cachedProducts);

        console.log("Loaded from localStorage");
      } else {
        // Otherwise, fetch from the API and store in localStorage
        const fetchedProducts = await fetchProducts(search, order);
        setProducts(fetchedProducts);
        localStorage.setItem(
          `products_${search}_${order}`,
          JSON.stringify(fetchedProducts)
        );
        console.log("Fetched products from API and saved to localStorage");
      }
    }

    getProducts();
  }, [search, order]);

  return (
    <div className="productContainer">
      <h1 className="postHeader">Products</h1>
      <div className="product-filters">
        <SortComponent />
        <AddProduct
          products={products}
          setProducts={setProducts}
          search={search}
          order={order}
        />
        <SearchComponent />
      </div>

      <div className="products">
        {products.length > 0 ? (
          products.map((item) => <Product item={item} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
