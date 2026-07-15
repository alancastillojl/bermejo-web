import Link from "next/link";
import { siteConfig, CONTACT_EMAIL } from "@/lib/constants";

const FOOTER_LINKS = ["FAQ", "Shipping", "Returns", "Terms", "Privacy"];

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1800px] border-t border-ink/15 px-6 py-8 md:px-10">
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
        <nav className="flex flex-wrap justify-center gap-6 text-[11px] font-semibold tracking-[0.15em] text-ink/70 uppercase md:justify-start">
          {FOOTER_LINKS.map((label) => (
            <Link key={label} href="#" className="hover:text-ink">
              {label}
            </Link>
          ))}
          <Link href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">
            Contact
          </Link>
        </nav>

        <Link
          href="https://instagram.com"
          aria-label="Instagram"
          className="text-ink/80 hover:text-brand justify-self-center"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4"
            aria-hidden
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </Link>

        <p className="text-center text-[11px] font-semibold tracking-[0.15em] text-ink/70 uppercase md:text-right">
          &copy; {siteConfig.name} 2026
          <br />
          Made for the few, not the many.
        </p>
      </div>
    </footer>
  );
}
