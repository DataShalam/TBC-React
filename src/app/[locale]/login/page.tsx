"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import PasswordInput from "../../../components/AuthorizationComponents/PasswordInput";
import { supabase } from "../supabase/supabase";
import { LogoGithub } from "react-ionicons";

export default function Login() {
  const locale = useLocale();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch(`/${locale}/api/auth/login`, {
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

  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/${locale}/api/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center h-full ">
      <div className="w-full max-w-md bg-light-card dark:bg-dark-card shadow-sm m-4 rounded-xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-light dark:text-dark mb-6">
          Log In
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
              className="w-full p-3 rounded-lg border border-light dark:border-dark bg-light-hover-whole dark:bg-dark-hover-whole text-light dark:text-dark focus:outline-none focus:ring-0"
              required
            />
          </div>

          <div className="flex flex-col space-y-3">
            <label
              htmlFor="password"
              className="font-medium text-gray-800 dark:text-gray-300"
            >
              Password
            </label>
            <PasswordInput />
          </div>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <a
              href="./signup"
              className="text-light dark:text-dark brightness-110 font-bold hover:underline focus:outline-none"
            >
              Sign Up
            </a>
          </div>
          <button
            onClick={handleGithubLogin}
            className="flex items-center justify-center text-base gap-2 w-full py-2 px-4 bg-light dark:bg-dark-heading text-light dark:text-dark rounded-md mt-4 hover:bg-opacity-50 dark:hover:bg-opacity-50 transition-colors"
          >
            Sign in with GitHub{" "}
            <LogoGithub color={"#00000"} height="30px" width="30px" />
          </button>
          <button
            className="w-full py-3 bg-customPurple font-semibold text-base rounded-lg text-light dark:text-dark focus:outline-none dark:bg-dark-navigation-border hover:bg-opacity-50 dark:hover:bg-opacity-50 transition-colors"
            type="submit"
          >
            Log In
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
