"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { transitionWords } from "@/data/copy";
import { stripBase } from "@/lib/paths";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const wordFor = (path: string) => {
  const key = Object.keys(transitionWords).find((k) => k !== "default" && (path === k || path.startsWith(`${k}/`)));
  return transitionWords[key ?? "default"];
};

/**
 * Transição de rota (A24): a tela vira papel, uma palavra de estado com spinner
 * ("Costurando ◌") aparece no topo e linhas horizontais se desenham de ponta a ponta.
 * A rota troca por baixo e tudo se desfaz. Com movimento reduzido, só um fade curto.
 * Links com data-no-transition (ou dentro de um container com ele) navegam direto.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  const busy = useRef(false);
  const [word, setWord] = useState(transitionWords.default);

  useEffect(() => {
    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!anchor || !anchor.href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (anchor.closest("[data-no-transition]")) return;
      const url = new URL(anchor.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return;
      const path = stripBase(url.pathname);
      // Produtos abrem como painel sobre a página atual.
      if (path.startsWith("/loja/")) return;
      const node = root.current;
      if (!node || busy.current) return;

      e.preventDefault();
      busy.current = true;
      pending.current = path;
      setWord(wordFor(path));
      node.style.visibility = "visible";

      const cover = node.animate([{ opacity: 0 }, { opacity: 1 }], { duration: reduced() ? 120 : 260, easing: EASE, fill: "forwards" });
      if (!reduced()) {
        node.querySelectorAll<HTMLElement>("[data-line]").forEach((line, i) =>
          line.animate([{ transform: "scaleX(0)", transformOrigin: "left" }, { transform: "scaleX(1)", transformOrigin: "left" }], {
            duration: 520,
            delay: 80 + i * 70,
            easing: EASE,
            fill: "forwards",
          }),
        );
      }
      cover.finished.then(() => {
        window.setTimeout(() => router.push(path + url.search + url.hash), reduced() ? 0 : 300);
        // Segurança: se a rota não trocar, desfaz mesmo assim.
        window.setTimeout(() => {
          if (busy.current) reveal();
        }, 3000);
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  function reveal() {
    const node = root.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      node.querySelectorAll<HTMLElement>("[data-line]").forEach((line, i) =>
        line.animate([{ transform: "scaleX(1)", transformOrigin: "right" }, { transform: "scaleX(0)", transformOrigin: "right" }], {
          duration: 480,
          delay: i * 60,
          easing: EASE,
          fill: "forwards",
        }),
      );
    }
    const anim = node.animate([{ opacity: 1 }, { opacity: 0 }], { duration: reduced ? 160 : 420, delay: reduced ? 0 : 260, easing: EASE, fill: "forwards" });
    anim.finished.then(() => {
      node.style.visibility = "hidden";
      busy.current = false;
      pending.current = null;
    });
  }

  useEffect(() => {
    if (busy.current && pending.current === pathname) {
      window.scrollTo({ top: 0 });
      requestAnimationFrame(reveal);
    }
  }, [pathname]);

  return (
    <div
      ref={root}
      aria-hidden
      className="no-print pointer-events-none fixed inset-0 z-[80] bg-papel text-tinta"
      style={{ visibility: "hidden", opacity: 0 }}
    >
      <span className="tex-grao absolute inset-0 opacity-[0.06] mix-blend-multiply" />
      <p className="label absolute inset-x-0 top-7 flex items-center justify-center gap-3">
        <span className="wordmark text-[13px] tracking-[0.16em]">Remanesce</span>
        <span className="text-cinza">·</span>
        <span>{word}</span>
        <span className="size-3 animate-spin rounded-full border border-tinta/25 border-t-tinta" />
      </p>
      {[24, 50, 76].map((top) => (
        <span key={top} data-line className="absolute inset-x-0 h-px bg-tinta/80" style={{ top: `${top}%`, transform: "scaleX(0)" }} />
      ))}
    </div>
  );
}
