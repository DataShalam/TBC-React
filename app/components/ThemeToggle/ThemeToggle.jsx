"use client";

import React, { useContext } from "react";
import { ThemeContext } from "../../lib/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);

  const handleChange = (e) => {
    toggleTheme(e.target.value);
  };

  return (
    <div className="p-2 mt-4">
      <label htmlFor="theme-select" className="mr-2 text-lg font-semibold">
        Theme:
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleChange}
        className="p-2 rounded bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
