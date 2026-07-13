import { featuredDrop, type Product } from "@/data/mock-products";
import { privateProducts, type PrivateProduct } from "@/data/mock-private-products";

export type AnyProduct =
  | ({ kind: "regular" } & Product)
  | ({ kind: "private" } & PrivateProduct);

export function getProductById(id: string): AnyProduct | undefined {
  const regular = featuredDrop.find((p) => p.id === id);
  if (regular) return { kind: "regular", ...regular };

  const priv = privateProducts.find((p) => p.id === id);
  if (priv) return { kind: "private", ...priv };

  return undefined;
}
