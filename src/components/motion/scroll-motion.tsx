"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { prefersReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);

/*
 * Movimento por rolagem das páginas editoriais (look, Sobre nós, Contato). Os elementos
 * só declaram o efeito por atributo; este componente, montado uma vez na página, liga
 * tudo e desfaz ao sair. Com movimento reduzido nada é animado.
 *
 *   data-reveal="image"  moldura que se abre de baixo para cima, a foto assenta (1.18 → 1)
 *   data-reveal="up"     bloco que sobe 48 px e aparece
 *   data-parallax="0.12" desloca na vertical enquanto atravessa a tela (fração da altura)
 *   data-zoom            foto em tela cheia que se aproxima devagar (1.16 → 1, scrub)
 *   data-words           texto que acende palavra por palavra (use <Words>)
 */
export function ScrollMotion() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.getElementById("conteudo");
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal='image']").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
        if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.1);
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='up']").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const k = parseFloat(el.dataset.parallax || "0.1");
        gsap.fromTo(
          el,
          { yPercent: -k * 100 },
          { yPercent: k * 100, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.16 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom 60%", scrub: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        const words = el.querySelectorAll("[data-word]");
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 55%", scrub: 0.6 } },
        );
      });
    }, root);

    // Fontes e imagens mudam as alturas depois do primeiro cálculo.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}

/** Texto dividido em palavras para o efeito data-words (sem quebrar a leitura). */
export function Words({ text, className, as: Tag = "p" }: { text: string; className?: string; as?: "p" | "h2" | "blockquote" | "span" }) {
  return (
    <Tag data-words className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-word className="inline">
          {w}
          {" "}
        </span>
      ))}
    </Tag>
  );
}
