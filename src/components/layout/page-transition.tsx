"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { BrandSymbol } from "@/components/brand/logo";
import { ScaleEdge } from "@/components/brand/textures";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const HIDDEN = "translateY(calc(-100% - 7vw))";

/**
 * Transição "escama": um painel índigo com borda de escamas desce cobrindo a tela,
 * a rota troca e o painel sobe de volta. Com movimento reduzido, vira um fade curto.
 * Links com data-no-transition (ou dentro de um container com ele) navegam direto.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  const busy = useRef(false);

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
      const node = panel.current;
      if (!node || busy.current) return;

      e.preventDefault();
      busy.current = true;
      const target = url.pathname + url.search + url.hash;
      pending.current = url.pathname;

      const cover = reduced()
        ? node.animate([{ opacity: 0, transform: "none" }, { opacity: 1, transform: "none" }], { duration: 160, fill: "forwards" })
        : node.animate([{ transform: HIDDEN }, { transform: "translateY(0)" }], { duration: 520, easing: EASE, fill: "forwards" });
      node.style.visibility = "visible";
      cover.finished.then(() => {
        router.push(target);
        // Segurança: se a rota não trocar, revela mesmo assim.
        window.setTimeout(() => {
          if (busy.current) reveal();
        }, 2500);
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  function reveal() {
    const node = panel.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const anim = reduced
      ? node.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "none" }], { duration: 200, fill: "forwards" })
      : node.animate([{ transform: "translateY(0)" }, { transform: HIDDEN }], { duration: 620, easing: EASE, delay: 80, fill: "forwards" });
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
      ref={panel}
      aria-hidden
      className="no-print pointer-events-none fixed inset-0 z-[80]"
      style={{ transform: HIDDEN, visibility: "hidden" }}
    >
      <div className="tex-sarja grid h-full place-items-center bg-indigo text-linho">
        <BrandSymbol size={64} />
      </div>
      <ScaleEdge count={14} className="absolute inset-x-0 top-full h-[7vw]" />
    </div>
  );
}
