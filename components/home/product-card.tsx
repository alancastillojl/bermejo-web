"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/mock-products";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col bg-card">
      <Link
        href={`/product/${product.id}`}
        className="relative aspect-square w-full overflow-hidden bg-white"
      >
        {product.image ? (
          <>
            <Image
              src={product.image}
              alt={`${product.name} ${product.color}`}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className={`object-contain p-6 transition-opacity duration-300 ${
                product.hoverImage ? "group-hover:opacity-0" : ""
              }`}
            />
            {product.hoverImage && (
              <Image
                src={product.hoverImage}
                alt={`${product.name} ${product.color} back`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-contain p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          // TODO: reemplazar con foto real del producto cuando esté disponible.
          <div
            className="h-full w-full"
            style={{ backgroundColor: product.placeholderColor }}
            aria-hidden
          />
        )}
      </Link>
      <Link
        href={`/product/${product.id}`}
        className="flex items-center justify-between border-t border-ink/10 px-4 py-3"
      >
        <p className="text-[11px] font-semibold tracking-[0.1em] text-ink uppercase">
          {product.name}
          <br />
          <span className="text-ink/50">{product.color}</span>
        </p>
        <p className="text-[11px] font-semibold tracking-[0.1em] text-ink">
          ${product.price}
        </p>
      </Link>
      <Button
        nativeButton
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            color: product.color,
            size: product.size,
            price: product.price,
            image: product.image,
            placeholderColor: product.placeholderColor,
          })
        }
        variant="ghost"
        className="w-full rounded-none border-t border-ink/10 text-[11px] font-semibold tracking-[0.15em] text-ink uppercase hover:bg-ink/5"
      >
        Add to Cart
      </Button>
    </div>
  );
}
