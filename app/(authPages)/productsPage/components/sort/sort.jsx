"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SortComponent() {
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const router = useRouter();

  function handleSortChange(e) {
    const selectedSortBy = e.target.value;
    let sortByField = "";
    let sortOrder = "";

    switch (selectedSortBy) {
      case "price-asc":
        sortByField = "price";
        sortOrder = "asc";
        break;
      case "price-desc":
        sortByField = "price";
        sortOrder = "desc";
        break;
      case "title-asc":
        sortByField = "title";
        sortOrder = "asc";
        break;
      case "title-desc":
        sortByField = "title";
        sortOrder = "desc";
        break;
      default:
        sortByField = "";
        sortOrder = "asc";
        break;
    }

    setSortBy(sortByField);
    setOrder(sortOrder);

    const newParams = new URLSearchParams(window.location.search);

    if (sortByField) {
      newParams.set("sortBy", sortByField);
      newParams.set("order", sortOrder);
    } else {
      newParams.delete("sortBy");
      newParams.delete("order");
    }

    const searchTerm = newParams.get("q");
    router.push(`/productsPage?${newParams.toString()}`);
  }

  return (
    <div className="sort-container">
      <select
        className="text-xl border-none cursor-pointer outline-none rounded-xl py-3 px-5 bg-light-heading dark:bg-dark-heading text-light dark:text-dark hover:bg-light-hover hover:dark:bg-dark-hover transition active:bg-light-hover active:dark:bg-dark-hover focus:bg-light-hover focus:dark:bg-dark-hover"
        onChange={handleSortChange}
      >
        <option value="">(Select Option)</option>
        <option value="price-asc">Sort by Price &uarr;</option>
        <option value="title-asc">Sort by Name &uarr;</option>
        <option value="price-desc">Sort by Price &darr;</option>
        <option value="title-desc">Sort by Name &darr;</option>
      </select>
    </div>
  );
}
