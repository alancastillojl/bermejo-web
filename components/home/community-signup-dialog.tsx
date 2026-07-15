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

const rawFieldClassName =
  "h-8 w-full min-w-0 rounded-none border border-ink/30 bg-transparent px-2.5 py-1 text-xs font-semibold tracking-[0.05em] text-ink uppercase outline-none focus-visible:border-brand";

const SOCIAL_PLATFORMS = ["Facebook", "Instagram", "LinkedIn", "X"];

export function CommunitySignupDialog({
  trigger,
}: {
  trigger: React.ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", email: "" });
  const [platform, setPlatform] = useState("");
  const [username, setUsername] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/private-community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          social: `${platform} @${username}`,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  function resetAndClose(next: boolean) {
    setOpen(next);
    if (!next) {
      setSubmitted(false);
      setError(false);
      setForm({ name: "", age: "", email: "" });
      setPlatform("");
      setUsername("");
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
              placeholder="Nombre y apellido"
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

            {platform ? (
              <div className={`flex items-center gap-2 ${rawFieldClassName}`}>
                <button
                  type="button"
                  onClick={() => {
                    setPlatform("");
                    setUsername("");
                  }}
                  className="shrink-0 text-ink/50 hover:text-brand"
                  aria-label="Cambiar red social"
                >
                  {platform}
                </button>
                <span className="shrink-0 text-ink/50">@</span>
                <input
                  required
                  autoFocus
                  placeholder="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full bg-transparent normal-case outline-none placeholder:text-ink/40"
                />
              </div>
            ) : (
              <select
                required
                defaultValue=""
                onChange={(event) => setPlatform(event.target.value)}
                className={rawFieldClassName}
              >
                <option value="" disabled>
                  Tu red social principal
                </option>
                {SOCIAL_PLATFORMS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {error && (
              <p className="text-xs font-semibold text-destructive uppercase">
                No se pudo enviar. Intenta de nuevo.
              </p>
            )}

            <DialogFooter className="mt-1">
              <Button
                type="submit"
                nativeButton
                disabled={sending}
                className="w-full rounded-none bg-brand text-xs font-semibold tracking-[0.2em] text-brand-foreground uppercase hover:bg-brand/90 disabled:opacity-50"
              >
                {sending ? "Enviando..." : "Enviar"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
