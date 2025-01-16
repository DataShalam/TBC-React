"use client";

import { useState } from "react";
import { EyeOutline, EyeOffOutline } from "react-ionicons";

export default function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <>
      <div className="relative">
        <label className="text-sm font-medium text-gray-700"></label>
        <div className="relative mt-1">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg border border-light dark:border-dark bg-light-hover-whole dark:bg-dark-hover-whole text-light dark:text-dark focus:outline-none focus:ring-0"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          >
            {showPassword ? (
              <EyeOffOutline color={"#00000"} height="20px" width="20px" />
            ) : (
              <EyeOutline color={"#00000"} height="20px" width="20px" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
