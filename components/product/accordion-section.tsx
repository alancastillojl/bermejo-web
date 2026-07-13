"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-ink/15">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left text-xs font-semibold tracking-[0.15em] text-ink uppercase"
      >
        {title}
        {open ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
      </button>
      {open && (
        <div className="pb-4 text-xs leading-relaxed text-ink/70">
          {children}
        </div>
      )}
    </div>
  );
}
