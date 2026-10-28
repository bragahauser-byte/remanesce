"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion, useReducedMotion } from "@/lib/hooks";

/** Frase de abertura gigante, no alto da página, que sobe ao entrar. */
export function PageIntro({ kicker, children }: { kicker: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || prefersReducedMotion() || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-intro]", { y: 64, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.1, delay: 0.1 });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <header ref={ref} className="grid-site pt-32 lg:pt-32">
      <p data-intro className="label col-span-6 mb-6 text-muted lg:col-span-14 lg:mb-8">
        {kicker}
      </p>
      <h1 data-intro className="headline col-span-6 font-normal tracking-[-0.045em] lg:col-span-11">
        {children}
      </h1>
    </header>
  );
}
