"use client";

import "./search.css";
import { useDebounce } from "../../../../hooks/debounce.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchComponent() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const router = useRouter();

  useEffect(() => {
    const newParams = new URLSearchParams(window.location.search);

    if (debouncedSearch) {
      newParams.set("q", debouncedSearch);
    } else {
      newParams.delete("q");
    }

    const sortBy = newParams.get("sortBy");
    const order = newParams.get("order");

    router.push(`/ProductsPage?${newParams.toString()}`);
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
