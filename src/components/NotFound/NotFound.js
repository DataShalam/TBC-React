import Link from "next/link";
import "./NotFound.css";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1>Error 404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/home">Go back home</Link>
    </div>
  );
}
