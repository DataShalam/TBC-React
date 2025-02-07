"use client";

import { useDebounce } from "../../../hooks/debounce";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function SearchComponent() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const newParams = new URLSearchParams(window.location.search);

    if (debouncedSearch) {
      newParams.set("title", debouncedSearch);
    } else {
      newParams.delete("title");
    }

    const sortBy = newParams.get("sortBy");
    const order = newParams.get("order");

    router.push(`/${locale}/productsPage?${newParams.toString()}`);
  }, [debouncedSearch, router]);

  return (
    <div className="search-container w-full max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full text-base md:text-xl border-none cursor-pointer outline-none rounded-xl py-2 md:py-3 px-4 md:px-5 bg-light-heading dark:bg-dark-heading text-light dark:text-dark hover:bg-light-hover hover:dark:bg-dark-hover transition active:bg-light-hover active:dark:bg-dark-hover focus:bg-light-hover focus:dark:bg-dark-hover placeholder:text-light placeholder:dark:text-dark"
      />
    </div>
  );
}
