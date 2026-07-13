"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PRIVATE_PASS_CODE } from "@/lib/constants";

export function PrivatePassDialog({
  trigger,
}: {
  trigger: React.ReactElement;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (code.trim().toUpperCase() === PRIVATE_PASS_CODE) {
      setOpen(false);
      setError(false);
      setCode("");
      router.push("/private");
    } else {
      setError(true);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setError(false);
          setCode("");
        }
      }}
    >
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xs font-semibold tracking-[0.2em] uppercase">
            Private Pass
          </DialogTitle>
          <DialogDescription>
            Ingresa tu código de acceso para entrar a la Founders Collection.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            autoFocus
            placeholder="Código de acceso"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setError(false);
            }}
            className="h-11 rounded-none border-ink/30 bg-transparent text-center text-xs font-semibold tracking-[0.2em] text-ink uppercase shadow-none placeholder:text-ink/40 focus-visible:border-brand focus-visible:ring-0"
          />
          {error && (
            <p className="text-xs font-semibold text-destructive uppercase">
              Código inválido. Intenta de nuevo.
            </p>
          )}

          <DialogFooter className="mt-1">
            <Button
              type="submit"
              nativeButton
              className="w-full rounded-none bg-brand text-xs font-semibold tracking-[0.2em] text-brand-foreground uppercase hover:bg-brand/90"
            >
              Entrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
