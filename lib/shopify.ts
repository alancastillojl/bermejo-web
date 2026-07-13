const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = "2025-01";

export const FOUNDERS_COLLECTION_HANDLE = "frontpage";
export const PRIVATE_COLLECTION_HANDLE = "private-access";

async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}): Promise<T> {
  if (!domain || !token) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN o NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN en .env.local"
    );
  }

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: cache === "force-cache" ? { revalidate: 60 } : undefined,
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(", "));
  }

  return json.data as T;
}

// ---------- Tipos ----------

export type ShopifyImage = { url: string };

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string };
  compareAtPrice: { amount: string } | null;
  selectedOptions: { name: string; value: string }[];
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  priceRange: { minVariantPrice: { amount: string } };
  compareAtPriceRange: { minVariantPrice: { amount: string } };
  variants: { edges: { node: ShopifyVariant }[] };
  totalInventory: number | null;
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string; handle: string; featuredImage: ShopifyImage | null };
    selectedOptions: { name: string; value: string }[];
    price: { amount: string };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string } };
  lines: { edges: { node: CartLine }[] };
};

// ---------- Fragments ----------

const PRODUCT_FRAGMENT = `
  id
  handle
  title
  description
  featuredImage { url }
  images(first: 6) { edges { node { url } } }
  priceRange { minVariantPrice { amount } }
  compareAtPriceRange { minVariantPrice { amount } }
  totalInventory
  variants(first: 20) {
    edges {
      node {
        id
        title
        availableForSale
        price { amount }
        compareAtPrice { amount }
        selectedOptions { name value }
      }
    }
  }
`;

const CART_FRAGMENT = `
  id
  checkoutUrl
  totalQuantity
  cost { subtotalAmount { amount } }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount }
            selectedOptions { name value }
            product {
              title
              handle
              featuredImage { url }
            }
          }
        }
      }
    }
  }
`;

// ---------- Productos / Colecciones ----------

export async function getCollectionProducts(
  handle: string
): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    collectionByHandle: { products: { edges: { node: ShopifyProduct }[] } } | null;
  }>({
    query: `
      query CollectionProducts($handle: String!) {
        collectionByHandle(handle: $handle) {
          products(first: 20) {
            edges { node { ${PRODUCT_FRAGMENT} } }
          }
        }
      }
    `,
    variables: { handle },
  });

  return data.collectionByHandle?.products.edges.map((e) => e.node) ?? [];
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: `
      query Product($handle: String!) {
        product(handle: $handle) { ${PRODUCT_FRAGMENT} }
      }
    `,
    variables: { handle },
    cache: "no-store",
  });

  return data.product;
}

// ---------- Carrito ----------

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: `
      mutation CartCreate {
        cartCreate {
          cart { ${CART_FRAGMENT} }
        }
      }
    `,
    cache: "no-store",
  });

  return data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) { ${CART_FRAGMENT} }
      }
    `,
    variables: { cartId },
    cache: "no-store",
  });

  return data.cart;
}

export async function addCartLine(
  cartId: string,
  merchandiseId: string,
  quantity = 1
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: `
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${CART_FRAGMENT} }
        }
      }
    `,
    variables: {
      cartId,
      lines: [{ merchandiseId, quantity }],
    },
    cache: "no-store",
  });

  return data.cartLinesAdd.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: `
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${CART_FRAGMENT} }
        }
      }
    `,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
    cache: "no-store",
  });

  return data.cartLinesUpdate.cart;
}

export async function removeCartLine(
  cartId: string,
  lineId: string
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: `
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${CART_FRAGMENT} }
        }
      }
    `,
    variables: { cartId, lineIds: [lineId] },
    cache: "no-store",
  });

  return data.cartLinesRemove.cart;
}
