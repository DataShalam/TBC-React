"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function DeleteProduct({ productId }: { productId: number }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleDelete = async () => {
    if (!productId) {
      console.error("Error: Missing productId");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("Products")
        .delete()
        .eq("Id", productId);

      if (error) throw error;

      router.back();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex justify-start">
      <button
        onClick={handleDelete}
        className="border-none text-base py-2 px-4 rounded-md cursor-pointer bg-red-500 hover:bg-red-700 transition"
      >
        Delete Product
      </button>
    </div>
  );
}
