"use client";

import { useRouter } from "next/navigation";
import "./DeleteProduct.css";

export default function DeleteProduct({ productId }) {
  const router = useRouter();

  const handleDelete = () => {
    const storedProducts = JSON.parse(
      localStorage.getItem("products__default")
    );

    if (storedProducts) {
      const updatedProducts = storedProducts.filter(
        (product) => product.id !== parseInt(productId)
      );

      localStorage.setItem(
        "products__default",
        JSON.stringify(updatedProducts)
      );

      router.push("/productsPage");
    }
  };

  return (
    <button onClick={handleDelete} className="delete-product-button">
      Delete Product
    </button>
  );
}
