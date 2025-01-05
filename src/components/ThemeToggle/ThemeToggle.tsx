"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="text-xl font-bold cursor-pointer text-light dark:text-dark">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center bg-none border-none cursor-pointer"
        aria-expanded={isDropdownOpen}
        aria-haspopup="listbox"
        aria-controls="theme-options"
      >
        <span className="text-xl px-2">
          {themes.find((t) => t.value === currentTheme)?.label}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className={`fill-current ${
            currentTheme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <path d="M10.1025513,12.7783485 L16.8106554,6.0794438 C17.0871744,5.80330401 17.5303978,5.80851813 17.8006227,6.09108986 C18.0708475,6.37366159 18.0657451,6.82658676 17.7892261,7.10272655 L10.5858152,14.2962587 C10.3114043,14.5702933 9.87226896,14.5675493 9.60115804,14.2901058 L2.2046872,6.72087106 C1.93149355,6.44129625 1.93181183,5.98834118 2.20539811,5.7091676 C2.47898439,5.42999401 2.92223711,5.43031926 3.19543076,5.70989407 L10.1025513,12.7783485 Z" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="theme-options"
          ref={dropdownRef}
          className="absolute mt-2 bg-white shadow-lg dark:bg-gray-700 rounded-md"
        >
          {themes.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setIsDropdownOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 ${
                currentTheme === value ? "font-semibold" : "font-normal"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
