"use client";
import "./sort.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

    // Update the URL without refreshing the page
    router.push(`/ProductsPage?${newParams.toString()}`);
  }

  return (
    <div className="sort-container">
      <select className="sortingButtons" onChange={handleSortChange}>
        <option value="">(Select Option)</option>
        <option value="price-asc">Sort by Price &uarr;</option>
        <option value="title-asc">Sort by Name &uarr;</option>
        <option value="price-desc">Sort by Price &darr;</option>
        <option value="title-desc">Sort by Name &darr;</option>
      </select>
    </div>
  );
}
