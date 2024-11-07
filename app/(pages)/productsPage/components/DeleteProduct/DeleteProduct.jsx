"use client";

import { useRouter } from "next/navigation";

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
    <button
      onClick={handleDelete}
      className="text-base py-2 px-3 cursor-pointer rounded-md bg-red-500 hover:bg-red-700  transition"
    >
      Delete Product
    </button>
  );
}
