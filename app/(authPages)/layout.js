"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../globals.css";
import { sessionStatus } from "../components/utils/session.js";
import Header from "../components/Header/Header.jsx";
import { ThemeProvider } from "../lib/ThemeProvider.js";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkSession = async () => {
      const session = await sessionStatus();

      if (!session) {
        router.push("/signIn");
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.layoutContainer}>
      <ThemeProvider>
        <Header />
        {children}
      </ThemeProvider>
    </div>
  );
}
