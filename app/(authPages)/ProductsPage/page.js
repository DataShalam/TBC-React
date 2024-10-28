import Link from "next/link";

import "./ProductsPage.css";

import SortComponent from "./components/sort/sort.jsx";
import SearchComponent from "./components/search/search.jsx";
import LoaderComponent from "./components/loader/laoder.jsx";

export default async function ProductsPage({ searchParams }) {
  const searchQuery = searchParams.q || "";
  const sortBy = searchParams.sortBy || "";
  const order = searchParams.order || "asc";

  let url = "https://dummyjson.com/products";
  if (!sortBy && searchQuery) {
    url = `https://dummyjson.com/products/search?q=${searchQuery}`;
  }
  if (sortBy && !searchQuery) {
    url += `?sortBy=${sortBy}&order=${order}`;
  }
  if (sortBy && searchQuery) {
    url = `https://dummyjson.com/products/search?q=${searchQuery}&sortBy=${sortBy}&order=${order}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  const products = data.products || [];

  return (
    <div className="productContainer">
      <h1 className="postHeader">Products</h1>
      <div className="product-filters">
        <SortComponent />
        <SearchComponent />
      </div>
      {products.length === 0 ? (
        <LoaderComponent />
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
