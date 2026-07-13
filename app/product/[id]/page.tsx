import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProductDetail } from "@/components/product/product-detail";
import { getProductByHandle } from "@/lib/shopify";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByHandle(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <ProductDetail product={product} />
      </main>
      <SiteFooter />
    </div>
  );
}
