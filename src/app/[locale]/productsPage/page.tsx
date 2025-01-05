"use client";

import { useEffect, useState } from "react";

import SortComponent from "../../../components/ProductComponents/sort/sort";
import SearchComponent from "../../../components/ProductComponents/search/search";
import Product from "../../../components/ProductComponents/product/Product";
import AddProduct from "../../../components/ProductComponents/addProduct/AddProduct";

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
    <div className="flex flex-col items-center gap-6 mx-auto mt-0 mb-24">
      <h1 className="text-6xl mb-5 text-light dark:text-dark drop-shadow-[0_0_1rem_rgba(236,223,204,0.8)]">
        Products
      </h1>
      <div className="flex justify-between items-center w-[93rem] rounded-xl p-4 mb-4 bg-light-card dark:bg-dark-card">
        <SortComponent />
        <AddProduct
          products={products}
          setProducts={setProducts}
          search={search}
          order={order}
        />
        <SearchComponent />
      </div>

      <div className="grid grid-cols-3 gap-7 cursor-pointer">
        {products.length > 0 ? (
          products.map((item) => <Product item={item} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
