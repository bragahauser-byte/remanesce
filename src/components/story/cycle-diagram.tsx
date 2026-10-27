"use client";

import { Icon, type IconName } from "@/components/icons/icon";
import { useInView } from "./in-view";

const icons: IconName[] = ["agulha", "pinha", "pinhao", "broto", "araucaria"];
// O pólen não tem ícone próprio: usamos pontos.
const R = 150;

/** O ciclo da araucária como diagrama circular que se desenha ao entrar na tela. */
export function CycleDiagram({ steps }: { steps: readonly string[] }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.35);
  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[420px]" role="img" aria-label={`Ciclo da araucária: ${steps.join(", ")}, e de novo.`}>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="200" cy="200" r={R} fill="none" stroke="currentColor" strokeOpacity=".15" />
        <circle
          cx="200"
          cy="200"
          r={R}
          fill="none"
          stroke="var(--cobre)"
          strokeWidth="1.5"
          pathLength={1000}
          transform="rotate(-90 200 200)"
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: seen ? 0 : 1000,
            transition: "stroke-dashoffset 2.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <path d="M200 50l-6-6M200 50l-6 6" stroke="var(--cobre)" strokeWidth="1.5" transform="rotate(8 200 200)" />
        <text x="200" y="196" textAnchor="middle" className="fill-current font-serif text-[22px] italic">
          a vida
        </text>
        <text x="200" y="222" textAnchor="middle" className="fill-current font-serif text-[22px] italic">
          é cíclica
        </text>
      </svg>
      {steps.map((step, i) => {
        const a = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + (Math.cos(a) * R * 100) / 400;
        const y = 50 + (Math.sin(a) * R * 100) / 400;
        return (
          <div
            key={step}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 transition-[opacity,transform] duration-700 ease-remanesce"
            style={{ left: `${x}%`, top: `${y}%`, opacity: seen ? 1 : 0, transitionDelay: `${300 + i * 350}ms` }}
          >
            <span className="grid size-14 place-items-center rounded-full bg-[var(--page-bg)] ring-1 ring-current/20">
              {i === 0 ? (
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
                  {[
                    [8, 9],
                    [14, 7],
                    [12, 13],
                    [17, 14],
                    [7, 15],
                    [11, 18],
                  ].map(([cx, cy]) => (
                    <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="1.3" fill="var(--cobre)" />
                  ))}
                </svg>
              ) : (
                <Icon name={icons[i]} filled={i === 2} />
              )}
            </span>
            <span className="label">{step}</span>
          </div>
        );
      })}
    </div>
  );
}
