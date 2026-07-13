import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PrivateProductCard } from "@/components/private/private-product-card";
import { privateProducts } from "@/data/mock-private-products";

export const metadata: Metadata = {
  title: "Bermejo — Private Access",
  description: "Descuentos exclusivos, precios únicos, piezas limitadas.",
};

export default function PrivatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1800px] px-6 pt-6 pb-10 text-center md:px-10">
          <p className="text-xs font-semibold tracking-[0.25em] text-brand uppercase">
            Private Access
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink uppercase md:text-3xl">
            Founders Collection
          </h1>
          <p className="mx-auto mt-3 max-w-md text-xs font-semibold tracking-[0.05em] text-ink/70 uppercase">
            Descuentos exclusivos. Precios únicos. Piezas limitadas.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1800px] px-6 pb-14 md:px-10">
          <div className="grid grid-cols-1 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 md:grid-cols-3">
            {privateProducts.map((product) => (
              <PrivateProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
