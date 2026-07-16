"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DISPLAY_MS = 1300;
const FADE_MS = 250;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), DISPLAY_MS);
    const hideTimer = setTimeout(() => setVisible(false), DISPLAY_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-cream transition-opacity duration-[250ms] ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src="/images/logo-b.png"
        alt="Bermejo"
        width={40}
        height={40}
        priority
        className="h-10 w-auto"
      />
    </div>
  );
}
