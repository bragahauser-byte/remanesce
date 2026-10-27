"use client";

import { Icon } from "@/components/icons/icon";
import { useInView } from "./in-view";

type Frame = { title: string; text: string };

/**
 * A lenda em três quadros. A gralha-azul atravessa a tela e enterra pinhões;
 * cada pinhão, ao entrar na tela, revela uma mancha vermelha que vira broto.
 */
export function Legend({ frames }: { frames: readonly Frame[] }) {
  const [skyRef, flying] = useInView<HTMLDivElement>(0.6);
  return (
    <div>
      <div ref={skyRef} aria-hidden className="relative h-28 overflow-hidden md:h-40">
        <div
          data-cursor="lenda"
          className="absolute top-1/2 text-gralha transition-transform ease-[cubic-bezier(0.45,0,0.2,1)] motion-reduce:left-1/2"
          style={{
            transform: flying ? "translate(calc(100vw + 120px), -30%) rotate(-4deg)" : "translate(-140px, 10%)",
            transitionDuration: "5200ms",
          }}
        >
          <Icon name="gralha" size={88} strokeWidth={0.9} />
        </div>
        <span className="stitch-x absolute inset-x-0 bottom-0 opacity-40" />
      </div>
      <ol className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
        {frames.map((f, i) => (
          <li key={f.title}>
            <Seed index={i} />
            <p className="label mt-8 text-linho/55">Quadro {i + 1}</p>
            <h3 className="serif mt-2 text-h3">{f.title}</h3>
            <p className="mt-4 text-linho/80">{f.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Seed({ index }: { index: number }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.8);
  const delay = 200 + index * 150;
  return (
    <div ref={ref} aria-hidden className="relative h-24 w-24">
      <svg viewBox="0 0 96 96" className="h-full w-full">
        <path d="M8 80h80" stroke="var(--cobre)" strokeDasharray="5 4" strokeOpacity=".7" />
        {/* mancha vermelha: o sangue escondido */}
        <ellipse
          cx="48"
          cy="80"
          rx="18"
          ry="5"
          fill="var(--pinhao)"
          style={{ transform: seen ? "scale(1)" : "scale(0)", transformOrigin: "48px 80px", transition: `transform 700ms var(--ease) ${delay}ms` }}
        />
        {/* pinhão enterrado */}
        <path
          d="M48 60c3.6 3.8 5.3 8.4 5 13.6-.3 4.8-2.2 8.6-5 10.4-2.8-1.8-4.7-5.6-5-10.4-.3-5.2 1.4-9.8 5-13.6z"
          fill="var(--pinhao-vivo)"
          style={{ opacity: seen ? 0 : 1, transform: seen ? "translateY(10px)" : "none", transition: `all 700ms var(--ease) ${delay}ms` }}
        />
        {/* broto */}
        <g
          stroke="var(--linho)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "scale(0.2)", transformOrigin: "48px 80px", transition: `all 900ms var(--ease) ${delay + 600}ms` }}
        >
          <path d="M48 80V50" />
          <path d="M48 62c-8 .2-13-4.7-13.2-12.6 7.6-.2 13 4.8 13.2 12.6z" />
          <path d="M48 56c.2-7.6 5.4-12.8 13-12.8-.2 7.6-5.3 12.6-13 12.8z" />
        </g>
      </svg>
    </div>
  );
}
