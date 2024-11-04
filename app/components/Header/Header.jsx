import "./Header.css";
import Link from "next/link";
import { signOut } from "../../lib/actions.js";
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav-container">
        <ul className="nav-list">
          <li>
            <Link href="/home">Home</Link>
          </li>
        </ul>

        <ul className="nav-list">
          <li>
            <Link href="/postsPage">Posts</Link>
          </li>
          <li>
            <Link href="/productsPage">Products</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li></li>
        </ul>
        <ul className="nav-list profile-signout">
          <li>
            <ThemeToggle />
          </li>
          <li>
            <Link href="/profile">
              <ion-icon name="accessibility-outline"></ion-icon>
            </Link>
          </li>
          <li>
            <ion-icon name="exit-outline" onClick={signOut}></ion-icon>
          </li>
        </ul>
      </nav>
    </header>
  );
}
