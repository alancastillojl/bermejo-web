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
          <DialogTitle>Private Pass</DialogTitle>
          <DialogDescription>
            Ingresa tu código de acceso para entrar a la Founders Collection.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            autoFocus
            placeholder="Código de acceso"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setError(false);
            }}
            className="h-12 rounded-none border-ink/20 bg-transparent text-center text-sm font-normal tracking-wide text-ink shadow-none placeholder:text-ink/35 focus-visible:border-brand focus-visible:ring-0"
          />
          {error && (
            <p className="text-center text-xs font-normal text-destructive">
              Código inválido. Intenta de nuevo.
            </p>
          )}

          <DialogFooter>
            <Button
              type="submit"
              nativeButton
              className="h-12 w-full rounded-none bg-brand text-sm font-normal tracking-wide text-brand-foreground hover:bg-brand/90"
            >
              Entrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
