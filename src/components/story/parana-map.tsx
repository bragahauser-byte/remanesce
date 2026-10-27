import { plantingPoints } from "@/data/copy";

// Contorno simplificado do Paraná (lon, lat), sentido horário a partir de Foz do Iguaçu.
const border: [number, number][] = [
  [-54.6, -25.55], [-54.45, -25.0], [-54.25, -24.35], [-54.3, -24.05], [-53.9, -23.9], [-53.6, -23.4], [-53.1, -22.9],
  [-52.6, -22.6], [-52.0, -22.55], [-51.4, -22.65], [-50.9, -22.8], [-50.3, -22.95], [-49.9, -22.9], [-49.6, -23.1],
  [-49.3, -23.6], [-49.2, -24.0], [-49.0, -24.4], [-48.6, -24.6], [-48.4, -24.9], [-48.2, -25.2], [-48.1, -25.5],
  [-48.4, -25.95], [-48.6, -26.0], [-49.2, -26.0], [-49.6, -26.2], [-50.2, -26.1], [-50.9, -26.3], [-51.3, -26.6],
  [-51.7, -26.7], [-52.2, -26.4], [-52.8, -26.3], [-53.4, -26.2], [-53.7, -26.0], [-54.1, -25.7],
];

const W = 620;
const H = 410;
const px = (lon: number) => (lon + 54.8) * 90;
const py = (lat: number) => (-22.3 - lat) * 90;
const path = `M${border.map(([lon, lat]) => `${px(lon).toFixed(1)} ${py(lat).toFixed(1)}`).join("L")}Z`;

const number = new Intl.NumberFormat("pt-BR");

/** Mapa do Paraná com os pontos de plantio (fictícios). Passe o mouse ou foque para ver cada um. */
export function ParanaMap({ highlight }: { highlight?: string }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id="mapa-sarja" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(63)">
            <path d="M0 0v5" stroke="currentColor" strokeOpacity=".12" />
          </pattern>
        </defs>
        <path d={path} fill="url(#mapa-sarja)" stroke="currentColor" strokeOpacity=".7" strokeWidth="1.2" strokeLinejoin="round" />
        <path d={path} fill="none" stroke="var(--cobre)" strokeWidth="1" strokeDasharray="6 4" transform="translate(4 4)" opacity=".6" />
      </svg>
      <ul>
        {plantingPoints.map((p) => {
          const on = highlight === p.city;
          return (
            <li key={p.city} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(px(p.lon) / W) * 100}%`, top: `${(py(p.lat) / H) * 100}%` }}>
              <button
                type="button"
                className="relative grid size-8 place-items-center"
                aria-label={`${p.city}: ${number.format(p.trees)} mudas plantadas`}
              >
                <span className={`absolute size-8 rounded-full bg-cobre/25 ${on ? "animate-ping" : "scale-0 group-hover:scale-100"} transition-transform motion-reduce:animate-none`} />
                <svg viewBox="0 0 10 20" className="relative h-4 w-2" aria-hidden>
                  <path d="M5 0 10 10 5 20 0 10z" fill={on ? "var(--pinhao-vivo)" : "var(--pinhao)"} />
                </svg>
              </button>
              <span
                className={`label pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap bg-linho px-2.5 py-1.5 text-indigo shadow-sm transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 ${on ? "opacity-100" : "opacity-0"}`}
              >
                {p.city} · {number.format(p.trees)} mudas
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
