"use client";

export function SizeSelector({
  sizes,
  soldOutSizes = [],
  selectedSize,
  onSelect,
}: {
  sizes: string[];
  soldOutSizes?: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.2em] text-ink uppercase">
        Size
      </p>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
        {sizes.map((size) => {
          const soldOut = soldOutSizes.includes(size);
          const active = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              disabled={soldOut}
              onClick={() => onSelect(size)}
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
