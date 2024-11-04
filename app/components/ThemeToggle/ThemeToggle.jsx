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
    <div className="flex items-center">
      <label htmlFor="theme-select" className="mr-2 text-xl font-semibold">
        Theme:
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleChange}
        className="p-2 rounded-md bg-light-navigation-border dark:bg-dark-navigation-border text-light dark:text-dark"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
}
