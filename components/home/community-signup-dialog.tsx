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
  "h-12 rounded-none border-ink/20 bg-transparent text-sm font-normal tracking-normal text-ink shadow-none placeholder:text-ink/35 focus-visible:border-brand focus-visible:ring-0";

const rawFieldClassName =
  "h-12 w-full min-w-0 rounded-none border border-ink/20 bg-transparent px-3 py-1 text-sm font-normal tracking-normal text-ink outline-none focus-visible:border-brand";

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
          <DialogTitle>Private Community</DialogTitle>
          {!submitted && (
            <DialogDescription>
              Déjanos tus datos para acceder a la comunidad privada de Bermejo.
            </DialogDescription>
          )}
        </DialogHeader>

        {submitted ? (
          <p className="text-center text-sm leading-relaxed font-normal text-ink/60">
            Thank you for becoming part of Bermejo.
            <br />
            <br />
            Our community members receive access to exclusive pieces,
            priority access to pre-sales, events, and more.
            <br />
            <br />
            You will soon receive an email with more information about your
            membership.
            <br />
            <br />
            Thank you.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  className="shrink-0 text-ink/45 hover:text-brand"
                  aria-label="Cambiar red social"
                >
                  {platform}
                </button>
                <span className="shrink-0 text-ink/45">@</span>
                <input
                  required
                  autoFocus
                  placeholder="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full bg-transparent outline-none placeholder:text-ink/35"
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
              <p className="text-center text-xs font-normal text-destructive">
                No se pudo enviar. Intenta de nuevo.
              </p>
            )}

            <DialogFooter>
              <Button
                type="submit"
                nativeButton
                disabled={sending}
                className="h-12 w-full rounded-none bg-brand text-sm font-normal tracking-wide text-brand-foreground hover:bg-brand/90 disabled:opacity-50"
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
