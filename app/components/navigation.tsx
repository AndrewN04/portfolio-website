import Link from "next/link";
import { LogoMark } from "./logo-mark";

export function Navigation() {
  return (
    <header className="site-nav">
      <div className="site-nav-row">
        <Link href="/" className="brand-mark" aria-label="a04.dev home">
          <LogoMark />
          <span>a04.dev</span>
        </Link>
      </div>
    </header>
  );
}
