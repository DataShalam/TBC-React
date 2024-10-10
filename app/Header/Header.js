import "./Header.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link href="/">Blogs</Link>
          </li>
          <li>
            <Link href="/users">Users</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
