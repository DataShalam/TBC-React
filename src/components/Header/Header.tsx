"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { AccessibilityOutline, ExitOutline, Language } from "react-ionicons";
import { useTranslations } from "next-intl";
import LanguageToggle from "../LanguageToggle/LanguageToggle";

export default function Header() {
  const [authStatus, setAuthStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const t = useTranslations("Header");
  const unorderedList = "flex items-center gap-5 ml-8 list-none";
  const unorderedListItem =
    "text-xl font-bold cursor-pointer text-light dark:text-dark hover:text-light-hover-whole hover:dark:text-dark-hover-whole transition";

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`/${locale}/api/auth/status`);
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

  const handleLogout = async () => {
    const response = await fetch(`/${locale}/api/auth/logout`, {
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Logout failed. Error message:", data.message);
    } else {
      console.log("Logout successful:", data.message);
      // Redirect to the login page
      window.location.href = `/${locale}/login`;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="p-3 mb-16 text-center border-b-2 border-light-navigation-border dark:border-dark-navigation-border">
      <nav className="flex justify-between mx-10 my-0">
        <ul className={unorderedList}>
          <li className={`${unorderedListItem} uppercase`}>
            <Link href={`/${locale}`}>{t("home")}</Link>
          </li>
        </ul>
        {authStatus && (
          <ul className={`${unorderedList} uppercase`}>
            <li className={unorderedListItem}>
              <Link href={`/${locale}/postsPage`}>{t("posts")}</Link>
            </li>
            <li className={unorderedListItem}>
              <Link href={`/${locale}/productsPage`}>{t("products")}</Link>
            </li>
            <li className={unorderedListItem}>
              <Link href={`/${locale}/contact`}>{t("contact")}</Link>
            </li>
            <li className={unorderedListItem}>
              <Link href={`/${locale}/about`}>{t("about")}</Link>
            </li>
          </ul>
        )}
        <ul className={`${unorderedList} gap-5`}>
          <li className="text-xl font-bold cursor-pointer text-light dark:text-dark">
            <LanguageToggle />
          </li>
          <li className="text-xl font-bold cursor-pointer text-light dark:text-dark">
            <ThemeToggle />
          </li>
          {authStatus && (
            <li className={unorderedListItem}>
              <Link href={`/${locale}/profile`}>
                <AccessibilityOutline
                  color={"inherit"}
                  height="48px"
                  width="48px"
                />
              </Link>
            </li>
          )}
          {authStatus ? (
            <li className={unorderedListItem}>
              <div onClick={handleLogout}>
                <ExitOutline color={"inherit"} height="48px" width="48px" />
              </div>
            </li>
          ) : (
            <li className="text-xl font-bold cursor-pointer p-2 rounded-md text-light dark:text-dark bg-light-navigation-border dark:bg-dark-navigation-border hover:bg-opacity-50 hover:dark:bg-opacity-50 transition-colors">
              <a href={`${locale}/login`}>{t("signIn")}</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
