"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        margin: "50px auto",
        maxWidth: "400px",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#dc3545",
        }}
      >
        Not Found – 404!
      </h1>
      <p
        style={{
          fontSize: "18px",
          color: "#555",
          margin: "20px 0",
        }}
      >
        Sorry, the page you are looking for does not exist.
      </p>
      <p
        style={{
          fontSize: "16px",
          color: "#333",
        }}
      >
        You will be automatically redirected to the home page in 3 seconds.
      </p>
      <p
        style={{
          fontSize: "16px",
          color: "#333",
          marginTop: "10px",
        }}
      >
        If you don’t want to wait, click{" "}
        <Link
          href="/"
          style={{ color: "#007bff", textDecoration: "underline" }}
        >
          here
        </Link>
        .
      </p>
    </div>
  );
}
