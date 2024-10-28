import "./Header.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/postsPage">Posts</Link>
          </li>
          <li>
            <Link href="/productsPage">Products</Link>
          </li>
          <li>
            <Link href="/contact">Products</Link>
          </li>
          <li>
            <Link href="/about">Products</Link>
          </li>
          <li>
            <Link href="/signIn">Sign In</Link>
          </li>
          <li>
            <Link href="/ProductsPage">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
