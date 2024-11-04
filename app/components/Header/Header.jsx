import Link from "next/link";
import { signOut } from "../../lib/actions.js";
import ThemeToggle from "../ThemeToggle/ThemeToggle.jsx";

export default function Header() {
  const unorderedList = "flex items-center gap-5 ml-8 list-none";
  const unorderedListItem =
    "text-xl font-bold cursor-pointer text-light dark:text-dark hover:text-light-hover-whole hover:dark:text-dark-hover-whole transition";

  return (
    <header className="p-3 mb-16 text-center border-b-2 border-light-navigation-border dark:border-dark-navigation-border">
      <nav className="flex justify-between mx-10 my-0">
        <ul className={unorderedList}>
          <li className={`${unorderedListItem} uppercase`}>
            <Link href="/home">Home</Link>
          </li>
        </ul>

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

        <ul className={`${unorderedList} gap-5`}>
          <li className="text-xl font-bold cursor-pointer text-light dark:text-dark">
            <ThemeToggle />
          </li>
          <li className={unorderedListItem}>
            <Link href="/profile">
              <ion-icon name="accessibility-outline"></ion-icon>
            </Link>
          </li>
          <li className={unorderedListItem}>
            <ion-icon name="exit-outline" onClick={signOut}></ion-icon>
          </li>
        </ul>
      </nav>
    </header>
  );
}
