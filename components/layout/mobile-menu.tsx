"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { label: "Collections", href: "#featured-drop" },
  { label: "Shop", href: "#featured-drop" },
  { label: "About", href: "#community" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
        className="text-ink"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full z-40 flex flex-col gap-6 border-t border-ink/10 bg-background px-6 py-8 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openCart();
            }}
            className="text-left uppercase hover:opacity-70"
          >
            Bag ({itemCount})
          </button>
        </nav>
      )}
    </div>
  );
}
