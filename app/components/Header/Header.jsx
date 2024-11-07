"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx";

export default function Header() {
  const [authStatus, setAuthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const unorderedList = "flex items-center gap-5 ml-8 list-none";
  const unorderedListItem =
    "text-xl font-bold cursor-pointer text-light dark:text-dark hover:text-light-hover-whole hover:dark:text-dark-hover-whole transition";

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/session");
        if (response.ok) {
          const { authenticated } = await response.json();
          setAuthStatus(authenticated);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="p-3 mb-16 text-center border-b-2 border-light-navigation-border dark:border-dark-navigation-border">
      <nav className="flex justify-between mx-10 my-0">
        <ul className={unorderedList}>
          <li className={`${unorderedListItem} uppercase`}>
            <Link href="/home">Home</Link>
          </li>
        </ul>
        {authStatus && (
          <ul className={`${unorderedList} uppercase`}>
            <li className={unorderedListItem}>
              <Link href="/postsPage">Posts</Link>
            </li>
            <li className={unorderedListItem}>
              <Link href="/productsPage">Products</Link>
            </li>
            <li className={unorderedListItem}>
              <Link href="/contact">Contact</Link>
            </li>
            <li className={unorderedListItem}>
              <Link href="/about">About</Link>
            </li>
          </ul>
        )}
        <ul className={`${unorderedList} gap-5`}>
          <li className="text-xl font-bold cursor-pointer text-light dark:text-dark">
            <ThemeToggle />
          </li>
          {authStatus && (
            <li className={unorderedListItem}>
              <Link href="/profile">
                <ion-icon name="accessibility-outline"></ion-icon>
              </Link>
            </li>
          )}
          {authStatus ? (
            <li className={unorderedListItem}>
              <a href="/api/auth/logout">
                <ion-icon name="exit-outline"></ion-icon>
              </a>
            </li>
          ) : (
            <li className="text-xl font-bold cursor-pointer p-2 rounded-md text-light dark:text-dark bg-light-navigation-border dark:bg-dark-navigation-border hover:bg-opacity-50 hover:dark:bg-opacity-50 transition-colors">
              <a href="/api/auth/login">Sign in</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
