"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  addCartLine,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine,
  type ShopifyCart,
} from "@/lib/shopify";

const CART_ID_KEY = "bermejo_cart_id";

export type CartItem = {
  lineId: string;
  variantId: string;
  name: string;
  handle: string;
  color: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
};

function cartToItems(cart: ShopifyCart): CartItem[] {
  return cart.lines.edges.map(({ node }) => {
    const options = node.merchandise.selectedOptions;
    const size = options.find((o) => /talla|size/i.test(o.name))?.value ?? "";
    const color = options.find((o) => /color/i.test(o.name))?.value ?? "";
    return {
      lineId: node.id,
      variantId: node.merchandise.id,
      name: node.merchandise.product.title,
      handle: node.merchandise.product.handle,
      color,
      size,
      price: Number(node.merchandise.price.amount),
      image: node.merchandise.product.featuredImage?.url ?? "",
      quantity: node.quantity,
    };
  });
}

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  checkoutUrl: string | null;
  openCart: () => void;
  closeCart: () => void;
  setOpen: (open: boolean) => void;
  addItem: (merchandiseId: string) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem(CART_ID_KEY);
    if (!storedId) return;
    getCart(storedId)
      .then((existing) => {
        if (existing) setCart(existing);
        else localStorage.removeItem(CART_ID_KEY);
      })
      .catch(() => localStorage.removeItem(CART_ID_KEY));
  }, []);

  async function ensureCart(): Promise<string> {
    if (cart) return cart.id;
    const stored = localStorage.getItem(CART_ID_KEY);
    if (stored) return stored;
    const newCart = await createCart();
    localStorage.setItem(CART_ID_KEY, newCart.id);
    setCart(newCart);
    return newCart.id;
  }

  async function addItem(merchandiseId: string) {
    setIsLoading(true);
    try {
      const cartId = await ensureCart();
      const updated = await addCartLine(cartId, merchandiseId, 1);
      setCart(updated);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeItem(lineId: string) {
    if (!cart) return;
    setIsLoading(true);
    try {
      const updated = await removeCartLine(cart.id, lineId);
      setCart(updated);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateQuantity(lineId: string, quantity: number) {
    if (!cart) return;
    if (quantity < 1) {
      await removeItem(lineId);
      return;
    }
    setIsLoading(true);
    try {
      const updated = await updateCartLine(cart.id, lineId, quantity);
      setCart(updated);
    } finally {
      setIsLoading(false);
    }
  }

  const items = useMemo(() => (cart ? cartToItems(cart) : []), [cart]);
  const itemCount = cart?.totalQuantity ?? 0;
  const subtotal = cart ? Number(cart.cost.subtotalAmount.amount) : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        isLoading,
        checkoutUrl: cart?.checkoutUrl ?? null,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        setOpen: setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
