import Link from "next/link";
import { getCollectionProducts, FOUNDERS_COLLECTION_HANDLE } from "@/lib/shopify";
import { ProductCard } from "@/components/home/product-card";

export async function FeaturedDropGrid() {
  const products = await getCollectionProducts(FOUNDERS_COLLECTION_HANDLE);

  if (products.length === 0) return null;

  return (
    <section id="featured-drop" className="mx-auto w-full max-w-[1800px] px-6 py-14 md:px-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-ink uppercase">
          Founders Collection
        </h2>
        <Link
          href="#featured-drop"
          className="text-xs font-semibold tracking-[0.2em] text-brand uppercase hover:opacity-70"
        >
          View All &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
