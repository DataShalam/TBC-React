"use client";

import "./search.css";
import { useDebounce } from "../../../hooks/debounce.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchComponent() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const router = useRouter();

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/ProductsPage?q=${debouncedSearch}`);
    } else {
      router.push(`/ProductsPage`);
    }
  }, [debouncedSearch, router]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
}
