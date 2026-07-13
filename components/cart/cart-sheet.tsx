"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export function CartSheet() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, subtotal } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full gap-0 border-l border-ink/15 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-ink/15 p-6">
          <SheetTitle className="text-center text-xs font-semibold tracking-[0.2em] text-ink uppercase">
            Shopping Bag
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="p-6 text-center text-xs font-semibold tracking-[0.1em] text-ink/50 uppercase">
              Tu bolsa está vacía.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-ink/10 p-6"
              >
                <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-card">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{ backgroundColor: item.placeholderColor }}
                      aria-hidden
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-xs font-semibold tracking-[0.1em] text-ink uppercase">
                    {item.name}
                  </p>
                  <p className="text-[11px] font-semibold tracking-[0.05em] text-ink/50 uppercase">
                    {item.color} / {item.size}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 border border-ink/20 px-2 py-1">
                      <button
                        type="button"
                        aria-label="Disminuir cantidad"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="text-ink/60 hover:text-ink"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-4 text-center text-xs font-semibold text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Aumentar cantidad"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="text-ink/60 hover:text-ink"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <p className="text-xs font-semibold text-ink">
                      ${item.price * item.quantity}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="self-start text-[11px] font-semibold tracking-[0.05em] text-brand uppercase hover:opacity-70"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink/15 p-6">
            <div className="mb-4 flex items-center justify-between text-xs font-semibold tracking-[0.1em] text-ink uppercase">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <Button
              nativeButton
              className="w-full rounded-none bg-ink text-xs font-semibold tracking-[0.2em] text-background uppercase hover:bg-ink/90"
            >
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
