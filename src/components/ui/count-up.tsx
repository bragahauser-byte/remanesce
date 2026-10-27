"use client";

import { useEffect, useRef, useState } from "react";

const format = new Intl.NumberFormat("pt-BR");

/**
 * Conta até `value` quando entra na tela, uma vez. Depois disso (ou com movimento
 * reduzido) mostra o valor atual direto, inclusive quando ele muda.
 */
export function CountUp({ value, duration = 1800, className }: { value: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"idle" | "waiting" | "running" | "done">("idle");
  const [shown, setShown] = useState(0);
  const target = useRef(value);
  useEffect(() => {
    target.current = value;
  }, [value]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Com movimento reduzido fica em "idle", que já mostra o valor real.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setPhase((p) => (p === "idle" ? "waiting" : p));
          return;
        }
        observer.disconnect();
        setPhase("running");
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          setShown(Math.round(target.current * (1 - Math.pow(1 - p, 4))));
          if (p < 1) frame = requestAnimationFrame(tick);
          else setPhase("done");
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [duration]);

  // Antes do JS (e depois da animação) mostra o valor real; só zera enquanto espera entrar na tela.
  const display = phase === "waiting" ? 0 : phase === "running" ? shown : value;

  return (
    <span ref={ref} className={className} aria-label={format.format(value)}>
      <span aria-hidden>{format.format(display)}</span>
    </span>
  );
}
