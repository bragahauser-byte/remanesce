"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Título que entra linha a linha (máscara de baixo para cima) quando aparece na tela.
 * Sem JS ou com movimento reduzido, o texto já aparece pronto.
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        } else {
          setState((s) => (s === "static" ? "hidden" : s));
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <span
            className="block transition-transform duration-[900ms] ease-remanesce"
            style={{
              transform: state === "hidden" ? "translateY(105%)" : "none",
              transitionDelay: `${delay + i * 110}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Bloco que sobe e aparece ao entrar na tela. */
export function FadeIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        } else {
          setState((s) => (s === "static" ? "hidden" : s));
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[900ms] ease-remanesce ${className}`}
      style={{
        opacity: state === "hidden" ? 0 : 1,
        transform: state === "hidden" ? "translateY(28px)" : "none",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
