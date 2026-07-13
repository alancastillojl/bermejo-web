"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductGallery({
  images,
  alt,
  placeholderColor,
}: {
  images: string[];
  alt: string;
  placeholderColor?: string;
}) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div
        className="aspect-square w-full"
        style={{ backgroundColor: placeholderColor }}
        aria-hidden
      />
    );
  }

  function goTo(next: number) {
    setIndex((next + images.length) % images.length);
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-white">
      <Image
        src={images[index]}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        priority
        className="object-contain p-10"
      />

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={() => goTo(index - 1)}
            className="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center border border-ink/20 bg-background/90 text-ink hover:bg-background"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Foto siguiente"
            onClick={() => goTo(index + 1)}
            className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center border border-ink/20 bg-background/90 text-ink hover:bg-background"
          >
            <ChevronRight className="size-4" />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver foto ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`size-1.5 rounded-full transition-colors ${
                  i === index ? "bg-ink" : "bg-ink/25"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
