"use client";

import { useCart } from "@/lib/cart-context";

export function CartNavLink() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="uppercase hover:opacity-70"
    >
      Bag ({itemCount})
    </button>
  );
}
