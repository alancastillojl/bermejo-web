import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/constants";
import { CartNavLink } from "@/components/layout/cart-nav-link";

const NAV_LINKS = [
  { label: "Collections", href: "#featured-drop" },
  { label: "Shop", href: "#featured-drop" },
  { label: "About", href: "#community" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1800px] items-center justify-between px-6 py-8 md:px-10">
      <Link href="/" aria-label={siteConfig.name}>
        <Image
          src="/images/logo-oval.png"
          alt={siteConfig.name}
          width={140}
          height={79}
          className="h-9 w-auto"
        />
      </Link>

      <nav className="hidden items-center gap-8 text-xs font-semibold tracking-[0.2em] text-brand uppercase md:flex">
        {NAV_LINKS.map((link) => (
          <Link key={link.label} href={link.href} className="hover:opacity-70">
            {link.label}
          </Link>
        ))}
        <CartNavLink />
      </nav>
    </header>
  );
}
