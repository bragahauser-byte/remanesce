"use client";

import { useEffect, useRef, useState } from "react";

const format = new Intl.NumberFormat("pt-BR");

/** Conta até `value` quando entra na tela. Com movimento reduzido, mostra o número direto. */
export function CountUp({ value, duration = 1800, className }: { value: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (started.current) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (started.current) return;
        if (!entry.isIntersecting) {
          setShown(0);
          return;
        }
        started.current = true;
        observer.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setShown(Math.round(value * eased));
          if (p < 1) frame = requestAnimationFrame(tick);
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
  }, [value, duration]);

  return (
    <span ref={ref} className={className} aria-label={format.format(value)}>
      <span aria-hidden>{format.format(shown)}</span>
    </span>
  );
}
