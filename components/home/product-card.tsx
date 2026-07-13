"use client";

import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

function getColor(product: ShopifyProduct) {
  const variant = product.variants.edges[0]?.node;
  return variant?.selectedOptions.find((o) => /color/i.test(o.name))?.value ?? "";
}

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const { addItem, isLoading } = useCart();
  const color = getColor(product);
  const price = Number(product.priceRange.minVariantPrice.amount);
  const firstAvailable =
    product.variants.edges.find((e) => e.node.availableForSale)?.node ??
    product.variants.edges[0]?.node;
  const images = product.images.edges;
  const secondImage = images[1]?.node.url;

  return (
    <div className="group flex flex-col bg-card">
      <Link
        href={`/product/${product.handle}`}
        className="relative aspect-square w-full overflow-hidden bg-white"
      >
        {product.featuredImage ? (
          <>
            <Image
              src={product.featuredImage.url}
              alt={product.title}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className={`object-contain p-6 transition-opacity duration-300 ${
                secondImage ? "group-hover:opacity-0" : ""
              }`}
            />
            {secondImage && (
              <Image
                src={secondImage}
                alt={`${product.title} back`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-contain p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            )}
          </>
        ) : null}
      </Link>
      <Link
        href={`/product/${product.handle}`}
        className="flex items-center justify-between border-t border-ink/10 px-4 py-3"
      >
        <p className="text-[11px] font-semibold tracking-[0.1em] text-ink uppercase">
          {product.title}
          {color && (
            <>
              <br />
              <span className="text-ink/50">{color}</span>
            </>
          )}
        </p>
        <p className="text-[11px] font-semibold tracking-[0.1em] text-ink">
          ${price}
        </p>
      </Link>
      <Button
        nativeButton
        disabled={!firstAvailable || isLoading}
        onClick={() => firstAvailable && addItem(firstAvailable.id)}
        variant="ghost"
        className="w-full rounded-none border-t border-ink/10 text-[11px] font-semibold tracking-[0.15em] text-ink uppercase hover:bg-ink/5"
      >
        Add to Cart
      </Button>
    </div>
  );
}
