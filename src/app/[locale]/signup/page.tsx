"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import PasswordInput from "../../../components/AuthorizationComponents/PasswordInput";

export default function Signup() {
  const locale = useLocale();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch(`/${locale}/api/auth/signup`, {
      method: "POST",
      body: new URLSearchParams({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      setErrorMessage(result.error);
    } else {
      window.location.href = `/${locale}`;
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center min-h-[70%]">
      <div className="w-full max-w-md bg-light-card dark:bg-dark-card shadow-sm rounded-xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-light dark:text-dark mb-6">
          Sign up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-3">
            <label
              htmlFor="email"
              className="font-medium text-light dark:text-dark"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border border-light dark:border-dark bg-light-hover-whole dark:bg-dark-hover-whole focus:outline-none focus:ring-0"
              required
            />
          </div>

          <div className="flex flex-col space-y-3 mb-4">
            <label
              htmlFor="password"
              className=" font-medium text-gray-800 dark:text-gray-300"
            >
              Password
            </label>
            <PasswordInput />
          </div>

          <button
            className="w-full py-3 bg-customPurple font-semibold text-base rounded-lg  text-light dark:text-dark focus:outline-none dark:bg-dark-navigation-border hover:bg-opacity-50 dark:hover:bg-opacity-50 transition-colors"
            type="submit"
          >
            Sign Up
          </button>

          {errorMessage && (
            <div className="text-center text-red-500 mt-4">
              <strong>{errorMessage}</strong>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
