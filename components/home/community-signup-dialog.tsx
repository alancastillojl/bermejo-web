"use client";

import { useState } from "react";
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

const inputClassName =
  "rounded-none border-ink/30 bg-transparent text-xs font-semibold tracking-[0.05em] text-ink uppercase shadow-none placeholder:text-ink/40 focus-visible:border-brand focus-visible:ring-0";

export function CommunitySignupDialog({
  trigger,
}: {
  trigger: React.ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    social: "",
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  function resetAndClose(next: boolean) {
    setOpen(next);
    if (!next) {
      setSubmitted(false);
      setForm({ name: "", age: "", email: "", social: "" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xs font-semibold tracking-[0.2em] uppercase">
            Private Community
          </DialogTitle>
          {!submitted && (
            <DialogDescription>
              Déjanos tus datos para acceder a la comunidad privada de Bermejo.
            </DialogDescription>
          )}
        </DialogHeader>

        {submitted ? (
          <p className="text-xs leading-relaxed text-ink/70">
            Gracias por ser parte de nuestra comunidad de Bermejo. Siempre
            buscamos que más que una tienda en línea sea nuestro punto de
            conexión con personas que comparten los mismos valores. Espera
            más noticias pronto por medio de tu correo electrónico.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              required
              placeholder="Nombre"
              value={form.name}
              onChange={(event) =>
                setForm((f) => ({ ...f, name: event.target.value }))
              }
              className={inputClassName}
            />
            <Input
              required
              type="number"
              min={1}
              placeholder="Edad"
              value={form.age}
              onChange={(event) =>
                setForm((f) => ({ ...f, age: event.target.value }))
              }
              className={inputClassName}
            />
            <Input
              required
              type="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={(event) =>
                setForm((f) => ({ ...f, email: event.target.value }))
              }
              className={inputClassName}
            />
            <Input
              required
              placeholder="Tu red social principal"
              value={form.social}
              onChange={(event) =>
                setForm((f) => ({ ...f, social: event.target.value }))
              }
              className={inputClassName}
            />

            <DialogFooter className="mt-1">
              <Button
                type="submit"
                nativeButton
                className="w-full rounded-none bg-brand text-xs font-semibold tracking-[0.2em] text-brand-foreground uppercase hover:bg-brand/90"
              >
                Enviar
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
