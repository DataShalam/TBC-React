import "./Header.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link href="/PostsPage">Posts</Link>
          </li>
          <li>
            <Link href="/ProductsPage">Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
