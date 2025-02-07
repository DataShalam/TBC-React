"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { AccessibilityOutline, ExitOutline, Menu, Close } from "react-ionicons";
import { useTranslations } from "next-intl";
import LanguageToggle from "../LanguageToggle/LanguageToggle";

export default function Header() {
  const [authStatus, setAuthStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("Header");

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
  }, [locale]);

  const handleLogout = async () => {
    const response = await fetch(`/${locale}/api/auth/logout`, {
      method: "POST",
    });
    const data = await response.json();

    if (!response.ok) {
      console.log("Logout failed. Error message:", data.message);
    } else {
      console.log("Logout successful:", data.message);
      window.location.href = `/${locale}/login`;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <header className="p-4 mb-16 text-center border-b-2 border-light-navigation-border dark:border-dark-navigation-border">
      <nav className="flex justify-between items-center mx-6">
        <div className="text-xl font-bold uppercase text-light dark:text-dark">
          <Link href={`/${locale}`}>{t("home")}</Link>
        </div>

        <button
          className="md:hidden text-light dark:text-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <Close color={"inherit"} height="36px" width="36px" />
          ) : (
            <Menu color={"inherit"} height="36px" width="36px" />
          )}
        </button>

        <ul className="hidden md:flex items-center gap-6 text-xl font-bold">
          {authStatus && (
            <>
              <li>
                <Link
                  href={`/${locale}/postsPage`}
                  className="hover:text-gray-600 dark:hover:text-gray-400"
                >
                  {t("posts")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/productsPage`}
                  className="hover:text-gray-600 dark:hover:text-gray-400"
                >
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="hover:text-gray-600 dark:hover:text-gray-400"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="hover:text-gray-600 dark:hover:text-gray-400"
                >
                  {t("about")}
                </Link>
              </li>
            </>
          )}
        </ul>

        <ul className="hidden md:flex items-center gap-5">
          <li>
            <LanguageToggle />
          </li>
          <li>
            <ThemeToggle />
          </li>
          {authStatus && (
            <li>
              <Link href={`/${locale}/profile`}>
                <AccessibilityOutline
                  color={"inherit"}
                  height="32px"
                  width="32px"
                />
              </Link>
            </li>
          )}
          {authStatus ? (
            <li>
              <div onClick={handleLogout} className="cursor-pointer">
                <ExitOutline color={"inherit"} height="32px" width="32px" />
              </div>
            </li>
          ) : (
            <li>
              <Link
                href={`/${locale}/login`}
                className="px-4 py-2 rounded-md bg-light-navigation-border dark:bg-dark-navigation-border hover:bg-opacity-50 dark:hover:bg-opacity-50 transition-colors"
              >
                {t("signIn")}
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center gap-4 text-xl font-bold text-light dark:text-dark">
          {authStatus && (
            <>
              <Link
                href={`/${locale}/postsPage`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("posts")}
              </Link>
              <Link
                href={`/${locale}/productsPage`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("products")}
              </Link>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("contact")}
              </Link>
              <Link
                href={`/${locale}/about`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("about")}
              </Link>
            </>
          )}
          <LanguageToggle />
          <ThemeToggle />
          {authStatus && (
            <Link
              href={`/${locale}/profile`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <AccessibilityOutline
                color={"inherit"}
                height="32px"
                width="32px"
              />
            </Link>
          )}
          {authStatus ? (
            <div onClick={handleLogout} className="cursor-pointer">
              <ExitOutline color={"inherit"} height="32px" width="32px" />
            </div>
          ) : (
            <Link
              href={`/${locale}/login`}
              className="px-4 py-2 rounded-md bg-light-navigation-border dark:bg-dark-navigation-border hover:bg-opacity-50 dark:hover:bg-opacity-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("signIn")}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
