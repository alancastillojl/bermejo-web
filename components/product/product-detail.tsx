"use client";

import { useState } from "react";
import type { AnyProduct } from "@/lib/products";
import { colorToHex } from "@/lib/color-swatch";
import { useCart } from "@/lib/cart-context";
import { SizeSelector } from "@/components/product/size-selector";
import { AccordionSection } from "@/components/product/accordion-section";
import { ProductGallery } from "@/components/product/product-gallery";

export function ProductDetail({ product }: { product: AnyProduct }) {
  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const isPrivate = product.kind === "private";
  const images = [
    product.image,
    "hoverImage" in product ? product.hoverImage : undefined,
  ].filter((src): src is string => Boolean(src));

  function handleAddToCart() {
    if (!selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      color: product.color,
      size: selectedSize,
      price: product.price,
      image: product.image,
      placeholderColor: product.placeholderColor,
    });
    openCart();
  }

  return (
    <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 gap-10 px-6 py-10 md:grid-cols-2 md:px-10 md:py-16">
      <ProductGallery
        images={images}
        alt={`${product.name} ${product.color}`}
        placeholderColor={product.placeholderColor}
      />

      <div className="flex flex-col">
        <h1 className="text-xl font-semibold tracking-tight text-ink uppercase md:text-2xl">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-3">
          {isPrivate && (
            <span className="text-sm font-semibold text-ink/40 line-through">
              ${product.originalPrice}
            </span>
          )}
          <span className="text-sm font-semibold text-ink">
            ${product.price}
          </span>
          <span className="mx-1 h-4 w-px bg-ink/20" aria-hidden />
          <span
            className="size-4 border border-ink/20"
            style={{
              backgroundColor: colorToHex(product.color, product.placeholderColor),
            }}
            aria-hidden
          />
          <span className="text-xs font-semibold tracking-[0.1em] text-ink/70 uppercase">
            {product.color}
          </span>
        </div>

        <div className="mt-6">
          <SizeSelector
            sizes={product.sizes}
            soldOutSizes={product.soldOutSizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />

          <button
            type="button"
            disabled={!selectedSize}
            onClick={handleAddToCart}
            className="mt-3 w-full bg-brand py-3 text-xs font-semibold tracking-[0.2em] text-brand-foreground uppercase transition-opacity hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add to Cart
          </button>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-ink/70">
          {product.description}
        </p>

        <div className="mt-8">
          <AccordionSection title="Description">
            {product.description}
          </AccordionSection>
          <AccordionSection title="Care and Maintenance">
            Lavar a mano o en ciclo delicado con agua fría. No usar blanqueador.
            Secar a la sombra. No planchar directamente sobre estampados o
            bordados.
          </AccordionSection>
          <AccordionSection title="Shipping / Returns">
            Envíos a todo México en 3-5 días hábiles. Cambios y devoluciones
            dentro de los primeros 15 días después de la entrega, en piezas
            sin uso y con etiquetas originales.
          </AccordionSection>
        </div>
      </div>
    </div>
  );
}
