import { notFound } from "next/navigation";

import "./ProductPage.css";
import NotFoundPage from "../../NotFound/NotFound.js";

export default async function ProductDetail({ params }) {
  const { productID } = params;

  const res = await fetch(`https://dummyjson.com/products/${productID}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const product = await res.json();

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="single-product">
      {product?.length === 0 ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="single-product-info">
            <h1 className="single-product-title">{product.title}</h1>
            <p className="single-product-description">{product.description}</p>
            <p className="single-product-price">Price: ${product.price}</p>

            <p className="single-product-category">
              Category: {product.category}
            </p>
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
        </>
      )}
    </div>
  );
}
