import type { ReactNode, SVGProps } from "react";

/*
 * Ícones da marca (item 12). 24×24, traço 1.25, cantos levemente arredondados, currentColor.
 * Mesmo vocabulário geométrico das escamas: pontas, losangos, curvas de bráctea.
 */

type Draw = (filled: boolean) => ReactNode;

const dash = { strokeDasharray: "3 2.2" };

export const icons = {
  // ----------------------------------------------------------- interface
  sacola: () => (
    <>
      <path d="M4.8 8.5h14.4l-1.1 12.3H5.9z" />
      <path d="M4.8 8.5 6 6.6h12l1.2 1.9" />
      <path d="M9.2 11.4V8.9c0-1.8 1.2-3.5 2.8-3.5s2.8 1.7 2.8 3.5v2.5" />
      <circle cx="9.2" cy="11.6" r=".45" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="11.6" r=".45" fill="currentColor" stroke="none" />
    </>
  ),
  pinhao: (filled) => (
    <>
      <path
        d="M12 2.8c2.7 2.9 4 6.4 3.8 10.4-.2 3.7-1.7 6.6-3.8 8-2.1-1.4-3.6-4.3-3.8-8C8 9.2 9.3 5.7 12 2.8z"
        fill={filled ? "var(--pinhao)" : "none"}
        stroke={filled ? "var(--pinhao)" : "currentColor"}
      />
      <path d="M10.2 6.6c1.2.7 2.4.7 3.6 0" stroke={filled ? "var(--linho)" : "currentColor"} />
    </>
  ),
  conta: () => (
    <>
      <circle cx="12" cy="8.2" r="3.6" />
      <path d="M4.8 20.2c.9-3.8 3.7-6 7.2-6s6.3 2.2 7.2 6" />
    </>
  ),
  busca: () => (
    <>
      <circle cx="10.6" cy="10.6" r="6.1" />
      <path d="m15.1 15.1 5.2 5.2" />
    </>
  ),
  menu: () => (
    <>
      <path d="M3 9h18" style={dash} />
      <path d="M3 15h18" style={dash} />
    </>
  ),
  fechar: () => (
    <>
      <path d="m5.5 5.5 13 13" />
      <path d="m18.5 5.5-13 13" />
    </>
  ),
  seta: () => (
    <>
      <path d="M1.5 12h21" />
      <path d="m17.5 7 5 5-5 5" />
    </>
  ),
  "seta-esquerda": () => (
    <>
      <path d="M22.5 12h-21" />
      <path d="m6.5 7-5 5 5 5" />
    </>
  ),
  "seta-baixo": () => <path d="m6 9.5 6 6 6-6" />,
  mais: () => (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  menos: () => <path d="M5 12h14" />,
  check: () => <path d="m4.5 12.5 4.6 4.6L19.5 6.7" />,
  copiar: () => (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="1" />
      <path d="M15.5 5.5V4.5h-11v11h1" />
    </>
  ),
  zoom: () => (
    <>
      <circle cx="10.6" cy="10.6" r="6.1" />
      <path d="m15.1 15.1 5.2 5.2M10.6 8v5.2M8 10.6h5.2" />
    </>
  ),

  // ------------------------------------------------------------ narrativa
  pinha: () => (
    <>
      <path d="M12 2.5c3.8 2.6 5.8 6.4 5.8 10.6 0 4.1-2.4 7.4-5.8 8.4-3.4-1-5.8-4.3-5.8-8.4 0-4.2 2-8 5.8-10.6z" />
      <path d="m8.4 8.6 3.6 2.3 3.6-2.3" />
      <path d="m7 12.6 5 3.1 5-3.1" />
      <path d="m8.2 16.8 3.8 2.4 3.8-2.4" />
      <path d="M12 6.2v4.7" />
    </>
  ),
  escama: () => (
    <>
      <path d="M5.5 5.2c2.2-1.6 10.8-1.6 13 0-.4 5.8-2.8 11-6.5 15.6C8.3 16.2 5.9 11 5.5 5.2z" />
      <path d="M12 6.4v10.2" style={{ strokeDasharray: "1.6 1.6" }} />
    </>
  ),
  araucaria: () => (
    <>
      <path d="M12 21.5V8.5" />
      <path d="M12 13.2c-2.8-.2-5.9-1.6-8.5-4.6" />
      <path d="M12 13.2c2.8-.2 5.9-1.6 8.5-4.6" />
      <path d="M12 10.2c-2-.3-4.3-1.3-6-3.5" />
      <path d="M12 10.2c2-.3 4.3-1.3 6-3.5" />
      <path d="M2.5 8.2c1.6-.5 3-.6 4.3-.2M21.5 8.2c-1.6-.5-3-.6-4.3-.2" />
      <path d="M5.2 6.2c1.5-.6 2.8-.7 4-.3M18.8 6.2c-1.5-.6-2.8-.7-4-.3" />
      <path d="M9.2 4.6c1.7-.5 3.9-.5 5.6 0" />
      <path d="M9 21.5h6" />
    </>
  ),
  gralha: () => (
    <>
      <path d="M2.8 17.2c2-.4 3.9-1.5 5.4-3.2 1.6-1.9 2.6-4.5 5.2-5.4 1.6-.5 3.2-.2 4.4.9l2.7.4-2.2 1.5c.1 2.8-1.2 5.3-3.6 6.8-2.3 1.4-5 1.6-7.6 1.1z" />
      <path d="m15.2 8.4.6-3.2 1.9 2.7" />
      <path d="M9.7 15c2 .1 4-.8 5.4-2.4" />
      <path d="M11.2 19.4v2.1M13.6 19.1v2.3" />
      <circle cx="17.1" cy="10" r=".55" fill="currentColor" stroke="none" />
    </>
  ),
  broto: () => (
    <>
      <path d="M12 21v-8.6" />
      <path d="M12 13.4c-3.7.1-6.1-2.3-6.2-6 3.6-.1 6.1 2.3 6.2 6z" />
      <path d="M12 11.2c.1-3.6 2.6-6 6.2-6-.1 3.6-2.5 6-6.2 6z" />
      <path d="M7 21h10" style={{ strokeDasharray: "2 1.6" }} />
    </>
  ),
  agulha: () => (
    <>
      <path d="m4 20 12.6-12.6" />
      <path d="M16.2 4.6c.8-.8 2.2-.8 3 0s.8 2.2 0 3l-1.4 1.4-3-3z" />
      <path d="M17.6 6.2 17 6.8" />
      <path d="M18.6 8.4c2.4 2.3.6 5.3-2.6 6.4-3.4 1.2-7.2 1.4-8.4 4.4" style={{ strokeDasharray: "2 1.6" }} />
    </>
  ),
  geracoes: () => (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 5.6c3.7-.1 6.6 2.7 6.5 6.3-.1 3.5-2.9 6.3-6.4 6.3-3.6 0-6.4-2.8-6.4-6.3.1-3.4 2.8-6.2 6.3-6.3z" />
      <circle cx="12.2" cy="12" r="2.6" />
    </>
  ),
  regador: () => (
    <>
      <path d="M5.5 10.5h8.5v8.2c0 .7-.5 1.3-1.2 1.3H6.7c-.7 0-1.2-.6-1.2-1.3z" />
      <path d="M14 13.5 19.4 8" />
      <path d="m18 6.6 2.8 2.8" />
      <path d="M5.5 12.8C3 12.8 2.4 9.4 4.6 8.4c1.6-.7 3.8-.3 4.4 2.1" />
      <path d="M21.5 11.5v.01M20.5 13.5v.01M22.5 13.8v.01" />
    </>
  ),
  "mapa-parana": () => (
    <>
      <path d="m2 15.2.6-3.2L4 7.6l2.6-.9 3-1.5 3.6-.4 3 .8 3 1.6 2.1 2.6 1.2 2.4-1.6 1.6-3 1.2-3.6 1.1-3.3.4-3-.9-2.8-.6z" />
      <circle cx="13.6" cy="11.2" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  etiqueta: () => (
    <>
      <path d="M3.2 12.4 11.6 4h8.4v8.4l-8.4 8.4z" />
      <circle cx="16.2" cy="7.8" r="1.4" />
      <path d="M7.6 12.4 11.6 16.4" style={{ strokeDasharray: "1.6 1.4" }} />
    </>
  ),
  qr: () => (
    <>
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx=".6" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx=".6" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx=".6" />
      <path d="M14 14h2.6v2.6H14zM18 18h2.5v2.5H18zM18 14h2.5M14 18.6v1.9h2" />
      <path d="M6.2 6.2h1.1v1.1H6.2zM16.7 6.2h1.1v1.1h-1.1zM6.2 16.7h1.1v1.1H6.2z" fill="currentColor" />
    </>
  ),
  losango: (filled) => (
    <path
      d="M12 2.5 17 12l-5 9.5L7 12z"
      fill={filled ? "var(--pinhao)" : "none"}
      stroke={filled ? "var(--pinhao)" : "currentColor"}
    />
  ),
  caixa: () => (
    <>
      <path d="M3.5 8.5 12 4l8.5 4.5v8L12 21l-8.5-4.5z" />
      <path d="M3.5 8.5 12 13l8.5-4.5M12 13v8" />
    </>
  ),
  calendario: () => (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 17h.01M12 17h.01" />
    </>
  ),
  caminhao: () => (
    <>
      <path d="M2.5 6.5h11v10h-11zM13.5 10h4.2l3 3.4v3.1h-7.2" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  pix: () => (
    <>
      <path d="m12 3 3.4 3.4M12 3 8.6 6.4M12 21l3.4-3.4M12 21l-3.4-3.4" />
      <path d="M6.4 8.6 3 12l3.4 3.4h1.7L12 11.5l3.9 3.9h1.7L21 12l-3.4-3.4h-1.7L12 12.5 8.1 8.6z" />
    </>
  ),
  cartao: () => (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="1.4" />
      <path d="M2.5 9.5h19M6 15h4" />
    </>
  ),
  cadeado: () => (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="1.2" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
      <path d="M12 14.4v2.4" />
    </>
  ),
  instagram: () => (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.6" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".5" fill="currentColor" stroke="none" />
    </>
  ),
} satisfies Record<string, Draw>;

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];

export const interfaceIcons: IconName[] = [
  "sacola",
  "pinhao",
  "conta",
  "busca",
  "menu",
  "fechar",
  "seta",
  "seta-esquerda",
  "seta-baixo",
  "mais",
  "menos",
  "check",
  "copiar",
  "zoom",
];

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
  filled?: boolean;
  /** Texto para leitores de tela. Sem ele, o ícone é decorativo. */
  label?: string;
  strokeWidth?: number;
};

export function Icon({ name, size = 24, filled = false, label, strokeWidth = 1.25, ...rest }: IconProps) {
  const draw: Draw = icons[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
      {...rest}
    >
      {draw(filled)}
    </svg>
  );
}
