"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "next-intl";

export default function SortComponent() {
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const locale = useLocale();
  const router = useRouter();

  const sortOptions = {
    "price-asc": { field: "Price", order: "asc" },
    "price-desc": { field: "Price", order: "desc" },
    "title-asc": { field: "Title", order: "asc" },
    "title-desc": { field: "Title", order: "desc" },
  };

  function handleSortChange(e) {
    const selectedSort = e.target.value;
    const { field = "", order = "asc" } = sortOptions[selectedSort] || {};

    setSortBy(field);
    setOrder(order);

    const newParams = new URLSearchParams(window.location.search);

    if (field) {
      newParams.set("sortBy", field);
      newParams.set("order", order);
    } else {
      newParams.delete("sortBy");
      newParams.delete("order");
    }

    router.push(`/${locale}/productsPage?${newParams.toString()}`);
  }

  return (
    <div className="sort-container">
      <select
        className="text-xl border-none cursor-pointer outline-none rounded-xl py-3 px-5 bg-light-heading dark:bg-dark-heading text-light dark:text-dark hover:bg-light-hover hover:dark:bg-dark-hover transition active:bg-light-hover active:dark:bg-dark-hover focus:bg-light-hover focus:dark:bg-dark-hover"
        onChange={handleSortChange}
      >
        <option value="">(Select Option)</option>
        {Object.entries(sortOptions).map(([key, { field, order }]) => (
          <option key={key} value={key}>
            Sort by {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
            {order === "asc" ? "↑" : "↓"}
          </option>
        ))}
      </select>
    </div>
  );
}
