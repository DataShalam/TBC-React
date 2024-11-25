"use client";

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

    router.push(`/productsPage?${newParams.toString()}`);
  }, [debouncedSearch, router]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-xl border-none cursor-pointer outline-none rounded-xl py-3 px-5 bg-light-heading dark:bg-dark-heading text-light dark:text-dark hover:bg-light-hover hover:dark:bg-dark-hover transition active:bg-light-hover active:dark:bg-dark-hover focus:bg-light-hover focus:dark:bg-dark-hover placeholder:text-light placeholder:dark:text-dark"
      />
    </div>
  );
}
