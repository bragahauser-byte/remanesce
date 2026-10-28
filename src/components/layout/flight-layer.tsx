"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useFlight } from "@/lib/store/flight";

/** A cópia da imagem que viaja do card até a página do look. */
export function FlightLayer() {
  const { flight, target, end } = useFlight();
  const ref = useRef<HTMLDivElement>(null);

  // Se a página nova não informar o destino (erro de rota), desiste sem travar a tela.
  useEffect(() => {
    if (!flight || target) return;
    const id = window.setTimeout(end, 2500);
    return () => window.clearTimeout(id);
  }, [flight, target, end]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !target) return;
    const tween = gsap.to(el, {
      left: target.x,
      top: target.y,
      width: target.w,
      height: target.h,
      duration: 1,
      ease: "expo.inOut",
      onComplete: end,
    });
    return () => void tween.kill();
  }, [target, end]);

  if (!flight) return null;
  const { from, src } = flight;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-[45] grid grid-cols-1 grid-rows-1 place-items-center overflow-hidden bg-panel"
      style={{ left: from.x, top: from.y, width: from.w, height: from.h }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-[92%] w-auto max-w-[92%] object-contain" />
    </div>
  );
}
