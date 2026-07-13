"use client";

import type { ShopifyVariant } from "@/lib/shopify";

export function SizeSelector({
  variants,
  selectedVariantId,
  onSelect,
}: {
  variants: ShopifyVariant[];
  selectedVariantId: string | null;
  onSelect: (variantId: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.2em] text-ink uppercase">
        Size
      </p>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
        {variants.map((variant) => {
          const size =
            variant.selectedOptions.find((o) => /talla|size/i.test(o.name))
              ?.value ?? variant.title;
          const soldOut = !variant.availableForSale;
          const active = selectedVariantId === variant.id;
          return (
            <button
              key={variant.id}
              type="button"
              disabled={soldOut}
              onClick={() => onSelect(variant.id)}
              className={`relative border px-2 py-3 text-xs font-semibold tracking-[0.05em] uppercase transition-colors ${
                soldOut
                  ? "cursor-not-allowed border-ink/10 text-ink/30 line-through"
                  : active
                    ? "border-ink bg-ink text-background"
                    : "border-ink/20 text-ink hover:border-ink"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
